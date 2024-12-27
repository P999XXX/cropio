import { useState } from "react";
import { TeamMember } from "@/types/team";
import { TeamTableHeader } from "./table/TeamTableHeader";
import { Grid3X3, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamCard } from "./card/TeamCard";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./badges/StatusBadge";
import { RoleBadge } from "./badges/RoleBadge";
import { paginateArray, getTotalPages } from "./utils/pagination";
import { TablePagination } from "./table/TablePagination";

interface TeamMembersTableProps {
  teamMembers: TeamMember[];
  isLoading: boolean;
}

const ITEMS_PER_PAGE = 10;

export const TeamMembersTable = ({ teamMembers, isLoading }: TeamMembersTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TeamMember;
    direction: "asc" | "desc";
  }>({ key: "created_at", direction: "desc" });

  const handleSort = (key: keyof TeamMember) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredMembers = teamMembers.filter((member) => {
    const searchableEmail = member.status === "accepted" 
      ? member.profile?.email 
      : member.email;
    
    const searchableName = member.status === "accepted"
      ? `${member.profile?.first_name || ''} ${member.profile?.last_name || ''}`
      : '';

    const matchesSearch =
      searchableEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchableName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = getTotalPages(sortedMembers.length, ITEMS_PER_PAGE);
  const paginatedMembers = paginateArray(sortedMembers, currentPage, ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const renderTableHeader = (
    label: string,
    key: keyof TeamMember,
    className?: string
  ) => (
    <TableHead
      className={cn(
        "cursor-pointer hover:text-primary transition-colors",
        className
      )}
      onClick={() => handleSort(key)}
    >
      <div className="flex items-center gap-2">
        {label}
        {sortConfig.key === key && (
          <span className="text-xs">
            {sortConfig.direction === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-2 team-members-table w-full">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between bg-card rounded-lg p-2 shadow-sm w-full">
        <TeamTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />
        
        {!isMobile && (
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="w-8 h-8"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="w-8 h-8"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {!isMobile && viewMode === "list" ? (
        <div className="rounded-lg border bg-card w-full">
          <Table>
            <TableHeader>
              <TableRow>
                {renderTableHeader("Member", "email")}
                {renderTableHeader("Role", "role")}
                {renderTableHeader("Status", "status")}
                {renderTableHeader("Joined", "created_at")}
                {renderTableHeader("Invited By", "invited_by", "text-right")}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex flex-col">
                      {member.status === "accepted" ? (
                        <>
                          <span className="font-medium">
                            {member.profile?.first_name} {member.profile?.last_name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {member.profile?.email}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-medium">Invited User</span>
                          <span className="text-sm text-muted-foreground">
                            {member.email}
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={member.role} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={member.status} />
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(member.created_at), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {member.inviter?.first_name} {member.inviter?.last_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {paginatedMembers.map((member) => (
            <TeamCard 
              key={member.id} 
              member={member} 
              viewMode={viewMode}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          ))}
        </div>
      )}

      {sortedMembers.length > ITEMS_PER_PAGE && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
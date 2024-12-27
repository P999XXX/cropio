import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { TeamMember } from "@/types/team";
import { TeamTableHeader } from "./table/TeamTableHeader";
import { TeamTableRow } from "./table/TeamTableRow";

interface TeamMembersTableProps {
  teamMembers: TeamMember[];
  isLoading: boolean;
}

export const TeamMembersTable = ({ teamMembers, isLoading }: TeamMembersTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
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

  const filteredAndSortedMembers = teamMembers
    .filter((member) => {
      const matchesSearch =
        member.profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${member.profile.first_name} ${member.profile.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === "all" || member.role === roleFilter;
      
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TeamTableHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("role")}
                  className="flex items-center gap-1"
                >
                  Role
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1"
                >
                  Status
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("created_at")}
                  className="flex items-center gap-1"
                >
                  Joined
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Invited By</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedMembers.map((member) => (
              <TeamTableRow key={member.id} member={member} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
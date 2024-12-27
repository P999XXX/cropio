import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Filter, 
  Search, 
  MoreVertical, 
  ArrowUpDown,
  UserX,
  UserCog
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { TeamMember } from "@/types/team";

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

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "administrator":
        return "default";
      case "editor":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "accepted":
        return "default";
      case "pending":
        return "secondary";
      default:
        return "destructive";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="administrator">Administrator</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="readonly">Read Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {member.profile.first_name} {member.profile.last_name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {member.profile.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(member.role)}>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(member.status)}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(member.created_at), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  {member.inviter.first_name} {member.inviter.last_name}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <UserCog className="h-4 w-4" />
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                        <UserX className="h-4 w-4" />
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
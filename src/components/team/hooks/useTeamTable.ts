import { useState } from "react";
import { TeamMember } from "@/types/team";
import { paginateArray, getTotalPages } from "../utils/pagination";

export const useTeamTable = (teamMembers: TeamMember[], itemsPerPage: number = 12) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
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

  const totalPages = getTotalPages(sortedMembers.length, itemsPerPage);
  const paginatedMembers = paginateArray(sortedMembers, currentPage, itemsPerPage);

  return {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    sortConfig,
    handleSort,
    paginatedMembers,
    totalPages,
  };
};
import { TeamMember } from "@/types/team";
import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../badges/StatusBadge";
import { RoleBadge } from "../badges/RoleBadge";
import { TeamTableHeaderRow } from "./TeamTableHeaderRow";
import { TeamMemberActions } from "./TeamMemberActions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState } from "react";

interface TeamTableProps {
  members: TeamMember[];
  sortConfig: {
    key: keyof TeamMember;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof TeamMember) => void;
}

const DEFAULT_SIZES = [30, 15, 15, 15, 15, 10];

export const TeamTable = ({ members, sortConfig, onSort }: TeamTableProps) => {
  const [sizes, setSizes] = useState(() => {
    const saved = localStorage.getItem('table-column-sizes');
    return saved ? JSON.parse(saved) : DEFAULT_SIZES;
  });

  useEffect(() => {
    localStorage.setItem('table-column-sizes', JSON.stringify(sizes));
  }, [sizes]);

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return '??';
    return `${(firstName?.[0] || '').toUpperCase()}${(lastName?.[0] || '').toUpperCase()}`;
  };

  return (
    <div className="rounded-lg border border-primary/20 bg-card w-full overflow-hidden team-table-container">
      <Table>
        <TableHeader>
          <TeamTableHeaderRow sortConfig={sortConfig} onSort={onSort} sizes={sizes} />
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} className="hover:bg-primary/5 border-primary/10">
              <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes) => setSizes(sizes)}
                className="w-full"
              >
                <ResizablePanel defaultSize={sizes[0]} minSize={20}>
                  <TableCell className="py-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 bg-primary/10">
                        <AvatarFallback className="text-[0.775rem] text-foreground">
                          {member.status === "accepted" 
                            ? getInitials(member.profile?.first_name, member.profile?.last_name)
                            : '??'
                          }
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        {member.status === "accepted" ? (
                          <>
                            <span className="font-medium text-foreground">
                              {member.profile?.first_name} {member.profile?.last_name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {member.profile?.email}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="font-semibold text-foreground">Invited User</span>
                            <span className="text-xs text-muted-foreground">
                              {member.email}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </ResizablePanel>
                <ResizablePanel defaultSize={sizes[1]} minSize={10}>
                  <TableCell className="py-2">
                    <RoleBadge role={member.role} />
                  </TableCell>
                </ResizablePanel>
                <ResizablePanel defaultSize={sizes[2]} minSize={10}>
                  <TableCell className="py-2">
                    <StatusBadge status={member.status} />
                  </TableCell>
                </ResizablePanel>
                <ResizablePanel defaultSize={sizes[3]} minSize={10}>
                  <TableCell className="py-2 text-[0.75rem] text-foreground">
                    {formatDistanceToNow(new Date(member.created_at), {
                      addSuffix: true,
                    })}
                  </TableCell>
                </ResizablePanel>
                <ResizablePanel defaultSize={sizes[4]} minSize={10}>
                  <TableCell className="py-2 text-[0.75rem] text-foreground">
                    {member.inviter?.first_name} {member.inviter?.last_name}
                  </TableCell>
                </ResizablePanel>
                <ResizablePanel defaultSize={sizes[5]} minSize={5}>
                  <TableCell className="py-2">
                    <TeamMemberActions />
                  </TableCell>
                </ResizablePanel>
              </ResizablePanelGroup>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
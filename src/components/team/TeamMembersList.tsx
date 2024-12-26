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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserMinus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TeamMembersListProps {
  members: any[];
  onRemoveMember: () => void;
}

const TeamMembersList = ({ members, onRemoveMember }: TeamMembersListProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleRemoveMember = async () => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', selectedMember.id);

      if (error) throw error;

      toast.success('Team member removed successfully');
      onRemoveMember();
    } catch (error: any) {
      console.error('Error removing team member:', error);
      toast.error(error.message);
    } finally {
      setShowConfirmDialog(false);
      setSelectedMember(null);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                {member.profile.first_name} {member.profile.last_name}
              </TableCell>
              <TableCell>{member.profile.email}</TableCell>
              <TableCell className="capitalize">{member.role}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedMember(member);
                    setShowConfirmDialog(true);
                  }}
                >
                  <UserMinus className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove team member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this team member? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveMember}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamMembersList;
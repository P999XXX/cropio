import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

interface UserProfileContentProps {
  profile: {
    first_name: string | null;
    last_name: string | null;
    email: string;
    company_name: string;
    role: string;
  } | null;
  onLogout: () => void;
}

export const UserProfileContent = ({ profile, onLogout }: UserProfileContentProps) => (
  <div className="flex flex-col space-y-4">
    <div className="flex items-start space-x-4">
      <Avatar className="h-10 w-10 bg-[#F1F0FB]">
        <AvatarFallback className="text-primary">
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-[16px] font-semibold leading-none">
          {profile?.first_name} {profile?.last_name}
        </h4>
        <p className="text-sm text-muted-foreground">
          {profile?.email}
        </p>
      </div>
    </div>
    <div className="border-t border-border pt-4 space-y-2">
      <div className="text-sm">
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Company</span>
          <span className="font-medium">{profile?.company_name}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Role</span>
          <span className="font-medium capitalize">{profile?.role}</span>
        </div>
      </div>
    </div>
    <div className="flex justify-end">
      <Button 
        variant="destructive" 
        size="sm"
        onClick={onLogout}
        className="w-[30px] text-xs h-[34px]"
      >
        <span className="flex-1">Sign out</span>
        <LogOut className="h-3 w-3 ml-1" />
      </Button>
    </div>
  </div>
);
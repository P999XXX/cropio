import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RoleFilter = ({ value, onChange, className }: RoleFilterProps) => {
  const roles = [
    { label: "All Roles", value: "all" },
    { label: "Administrator", value: "administrator" },
    { label: "Editor", value: "editor" },
    { label: "Readonly", value: "readonly" },
  ];

  const selectedRole = roles.find((role) => role.value === value) || roles[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-full lg:w-[180px] flex items-center justify-between text-[0.775rem]",
            className
          )}
        >
          {selectedRole.label}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.value}
            onClick={() => onChange(role.value)}
            className="text-[0.775rem]"
          >
            {role.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
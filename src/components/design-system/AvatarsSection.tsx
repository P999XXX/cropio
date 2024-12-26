import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AvatarsSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Avatars</h2>
      <div className="flex flex-wrap gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
};
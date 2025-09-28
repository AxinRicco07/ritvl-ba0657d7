import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { useState } from "react";

type MobileSearchProps = {
  ref: React.RefObject<HTMLInputElement>;
  searchTerm: string;
  onSearch: (term: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function MobileSearch({
  ref,
  searchTerm,
  onSearch,
  onSubmit,
}: MobileSearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-64 md:mr-8 p-2">
        <form
          onSubmit={(e) => {
            onSubmit(e);
            setIsOpen(false);
          }}
        >
          <Input
            ref={ref}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full"
          />
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

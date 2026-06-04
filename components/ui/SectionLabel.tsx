import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-[2px] w-10 bg-[var(--champagne)]" />
      <span className="text-label text-[var(--champagne)]">{children}</span>
    </div>
  );
}

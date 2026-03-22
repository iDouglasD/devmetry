import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center font-mono text-xs px-2 py-0.5 rounded",
	{
		variants: {
			variant: {
				green: "text-accent-green bg-accent-green/10",
				purple: "text-accent-purple bg-accent-purple/10",
				cyan: "text-accent-cyan bg-accent-cyan/10",
				muted: "text-text-secondary bg-bg-elevated",
			},
		},
		defaultVariants: {
			variant: "muted",
		},
	},
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
	VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<span className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };

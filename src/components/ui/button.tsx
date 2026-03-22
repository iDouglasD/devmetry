import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center font-mono font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
	{
		variants: {
			variant: {
				primary:
					"bg-linear-to-r from-accent-purple to-accent-cyan text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]",
				secondary:
					"border border-accent-purple text-accent-purple hover:bg-linear-to-r hover:from-accent-purple hover:to-accent-cyan hover:text-white",
				ghost:
					"text-text-secondary hover:text-text-primary hover:bg-bg-elevated",
			},
			size: {
				sm: "h-8 px-3 text-xs rounded-md",
				md: "h-10 px-5 text-sm rounded-lg",
				lg: "h-12 px-8 text-base rounded-lg",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size }), className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };

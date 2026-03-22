import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const CardRoot = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("rounded-lg border border-border bg-bg-surface", className)}
			{...props}
		/>
	),
);
CardRoot.displayName = "Card.Root";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("flex items-center gap-2 p-4", className)}
			{...props}
		/>
	),
);
CardHeader.displayName = "Card.Header";

const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("p-4 pt-0", className)} {...props} />
	),
);
CardBody.displayName = "Card.Body";

const Card = Object.assign(CardRoot, {
	Root: CardRoot,
	Header: CardHeader,
	Body: CardBody,
});

export { Card, CardBody, CardHeader, CardRoot };

"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  openId: string | null;
  toggle: (id: string) => void;
};

const AccordionContext = createContext<AccordionContextValue>({
  openId: null,
  toggle: () => {},
});

function AccordionRoot({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? null : id)),
    []
  );

  return (
    <AccordionContext.Provider value={{ openId, toggle }}>
      <div className={cn("divide-y divide-border", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

type ItemContextValue = {
  value: string;
  isOpen: boolean;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

const ItemContext = createContext<ItemContextValue>({
  value: "",
  isOpen: false,
  contentRef: { current: null },
});

function AccordionItem({
  children,
  value,
  className,
  ...props
}: AccordionItemProps) {
  const { openId } = useContext(AccordionContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const isOpen = openId === value;

  return (
    <ItemContext.Provider value={{ value, isOpen, contentRef }}>
      <div className={cn("py-4", className)} {...props}>
        {children}
      </div>
    </ItemContext.Provider>
  );
}

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  const { toggle } = useContext(AccordionContext);
  const { value, isOpen } = useContext(ItemContext);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center justify-between text-left font-mono text-text-primary cursor-pointer",
        className
      )}
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <span className="text-text-secondary ml-4 shrink-0">
        {isOpen ? "−" : "+"}
      </span>
    </button>
  );
});
AccordionTrigger.displayName = "Accordion.Trigger";

const AccordionContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("overflow-hidden h-0 opacity-0", className)}
      {...props}
    >
      <div className="pt-3">{children}</div>
    </div>
  );
});
AccordionContent.displayName = "Accordion.Content";

const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

export {
  Accordion,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};

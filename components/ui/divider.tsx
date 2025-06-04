"use client"
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dividerVariants = cva("bg-border shrink-0", {
  variants: {
    orientation: {
      horizontal: "w-full h-px my-2",
      vertical: "h-full w-px mx-2",
    },
    thickness: {
      default: "",
      sm: "h-0.5 w-0.5",
      lg: "h-1 w-1",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    thickness: "default",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation, thickness, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        {...(orientation ? { 'aria-orientation': orientation } : {})}
        className={cn(dividerVariants({ orientation, thickness }), className)}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };

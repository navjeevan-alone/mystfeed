import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define the variants using cva
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-red-700 text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define the type for the ButtonProps including the role prop
export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  role?: 'button' | 'p' | 'h1' | 'span';
}

// Create a mapping for the roles to their respective props
type RoleProps<T extends React.ElementType> = React.ComponentProps<T>;

// Extend ButtonProps to handle the various HTML element props based on role
type ExtendedButtonProps<T extends React.ElementType> = ButtonProps & RoleProps<T>;

// Create a forward ref component to handle the different roles
const Button = React.forwardRef<HTMLElement, ExtendedButtonProps<React.ElementType>>(
  ({ className, variant, size, asChild = false, role = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : role; // Determine the component to render based on role

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as any} // Cast ref to any to handle multiple element types
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
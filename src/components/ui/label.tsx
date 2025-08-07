import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-[#5774A8]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, children, ...props }, ref) => {
  // Check if the label contains an asterisk and style it
  const labelContent = typeof children === "string" ? children : "";
  const hasAsterisk = labelContent.includes("*");

  if (hasAsterisk) {
    const parts = labelContent.split("*");
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
      >
        {parts[0]}
        <span className="text-red-500">*</span>
        {parts[1]}
      </LabelPrimitive.Root>
    );
  }

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    >
      {children}
    </LabelPrimitive.Root>
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

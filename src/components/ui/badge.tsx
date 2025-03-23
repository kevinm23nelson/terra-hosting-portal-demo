// components/ui/badge.tsx
import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success"
}

function Badge({ 
  className, 
  variant = "default", 
  ...props 
}: BadgeProps) {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-red-100 text-red-800 hover:bg-red-200",
    outline: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}

export { Badge }
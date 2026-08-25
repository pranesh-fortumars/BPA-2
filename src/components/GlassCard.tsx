import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for combining tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'accent' | 'transparent';
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  variant = 'light',
  hoverEffect = true,
  className,
  ...props
}) => {
  const baseStyles = "relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300";
  
  const variants = {
    light: "bg-surface border-border shadow-sm",
    dark: "bg-surface border-border shadow-lg",
    accent: "bg-primary/5 border-primary/20 shadow-md",
    transparent: "bg-background/40 border-border/20"
  };

  const hoverStyles = hoverEffect ? "hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-violet-600/10" : "";

  return (
    <div 
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      {...props}
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Interior content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};



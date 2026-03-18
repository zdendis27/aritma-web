import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "heroPrimary" | "heroSecondary";
};

export default function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-full px-5 py-3 text-sm font-semibold transition",
        {
          "bg-primary text-white hover:bg-primaryDark": variant === "primary",
          "bg-white text-primary ring-1 ring-primary/20 hover:bg-primary/5": variant === "secondary",
          "bg-transparent text-primary hover:bg-primary/10": variant === "ghost",
          "bg-rose-600 text-white hover:bg-rose-700": variant === "danger",
          "bg-white text-primary ring-1 ring-white/70 hover:bg-slate-100 hover:text-primaryDark": variant === "heroPrimary",
          "bg-primaryDark text-white ring-1 ring-white/20 hover:bg-white hover:text-primaryDark": variant === "heroSecondary"
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

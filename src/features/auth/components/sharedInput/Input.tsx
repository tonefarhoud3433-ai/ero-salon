import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, type, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div>
      <label className="block mb-2 text-sm">{label}</label>

      <div className="relative">
        <input
          {...props}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-input
            border
            border-border
            pr-12
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-muted-foreground
            "
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

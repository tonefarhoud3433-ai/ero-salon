import type { ReactNode } from "react";

interface AuthFormProps {
  children: ReactNode;
  buttonText: string;
  icon?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  onSubmit: () => void;
}

export default function AuthForm({
  children,
  buttonText,
  icon,
  isLoading = false,
  isDisabled = false,
  onSubmit,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}

      <button
        type="submit"
        disabled={isLoading || isDisabled}
        className="
          w-full
          bg-black
          text-white
          py-3
          rounded-xl
          flex
          items-center
          justify-center
          gap-2
          cursor-pointer
          hover:opacity-80
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition-all
        "
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 w-full">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Please wait...</span>
          </div>
        ) : (
          <>
            {icon}
            <span>{buttonText}</span>
          </>
        )}
      </button>
    </form>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Mail } from "lucide-react";

import AuthCard from "../authCard/AuthCard";
import AuthForm from "../authForm/AuthForm";
import AuthHeader from "../authHeader/AuthHeader";
import Input from "../sharedInput/Input";
import FieldError from "../../../../shared/fieldError/FieldError";
import { useForgotPassword } from "../../authHooks/useForgotPassword";

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPassword() {
  const { sendReset } = useForgotPassword();

  const [cooldown, setCooldown] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordForm>({
    mode: "onChange",
  });

  const startCooldown = () => {
    setCooldown(true);
    setSeconds(60);

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmit = async (values: ForgotPasswordForm) => {
    if (cooldown) return;

    try {
      const { error } = await sendReset(values.email);

      if (error) {
        if (error.code === "over_email_send_rate_limit") {
          toast.error("Please wait a bit before requesting again.");
          startCooldown();
          return;
        }

        toast.error(error.message);
        return;
      }

      toast.success("Reset link sent to your email");

      startCooldown();
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <AuthCard>
      <AuthHeader subtitle="Enter your email to reset password" />

      <AuthForm
        buttonText={cooldown ? `Wait ${seconds}s` : "Send Reset Link"}
        icon={<Mail size={18} />}
        isLoading={isSubmitting}
        isDisabled={!isValid || cooldown}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          })}
        />

        <FieldError message={errors.email?.message} />
      </AuthForm>
    </AuthCard>
  );
}

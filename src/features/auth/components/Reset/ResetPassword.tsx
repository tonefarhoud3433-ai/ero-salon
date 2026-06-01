import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

import AuthCard from "../authCard/AuthCard";
import AuthForm from "../authForm/AuthForm";
import AuthHeader from "../authHeader/AuthHeader";
import Input from "../sharedInput/Input";
import FieldError from "../../../../shared/fieldError/FieldError";
import { useResetPassword } from "../../authHooks/useResetPassword copy";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const { reset } = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordForm>({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (values: ResetPasswordForm) => {
    try {
      const { error } = await reset(values.password);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password updated successfully");

      navigate("/login");
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <AuthCard>
      <AuthHeader subtitle="Enter your new password" />

      <AuthForm
        buttonText="Reset Password"
        icon={<KeyRound size={18} />}
        isLoading={isSubmitting}
        isDisabled={!isValid}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Password */}
        <Input
          label="New Password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter new password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Min 6 characters",
            },
          })}
        />
        <FieldError message={errors.password?.message} />

        {/* Confirm */}
        <Input
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        <FieldError message={errors.confirmPassword?.message} />
      </AuthForm>
    </AuthCard>
  );
}

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

import AuthCard from "../authCard/AuthCard";
import AuthForm from "../authForm/AuthForm";
import AuthHeader from "../authHeader/AuthHeader";
import Input from "../sharedInput/Input";
import FieldError from "../../../../shared/fieldError/FieldError";
import { useRegister } from "../../authHooks/useRegister";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { register: signUp } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormData>({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (values: RegisterFormData) => {
    try {
      const { error } = await signUp(values.email, values.password);

      if (error) {
        if (error.code === "over_email_send_rate_limit") {
          toast.error("Too many attempts. Please wait before trying again.");
          return;
        }

        const message =
          error.message === "User already registered"
            ? "Email already exists"
            : error.message;

        toast.error(message);
        return;
      }

      toast.success("Check your email to verify your account");
      navigate("/login");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthCard>
      <AuthHeader subtitle="Create your account" />

      <AuthForm
        buttonText="Create Account"
        icon={<LogIn size={18} />}
        isLoading={isSubmitting}
        isDisabled={!isValid}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email */}
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

        {/* Password */}
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <FieldError message={errors.password?.message} />

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        <FieldError message={errors.confirmPassword?.message} />
      </AuthForm>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>

        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign In
        </Link>
      </div>
    </AuthCard>
  );
}

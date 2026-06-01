import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthCard from "../authCard/AuthCard";
import AuthForm from "../authForm/AuthForm";
import AuthHeader from "../authHeader/AuthHeader";
import Input from "../sharedInput/Input";
import { LogIn } from "lucide-react";
import FieldError from "../../../../shared/fieldError/FieldError";
import { useLogin } from "../../authHooks/useLogin";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      const { data, error } = await login(values.email, values.password);

      if (error) {
        const message =
          error.message === "Invalid login credentials"
            ? "Invalid email or password"
            : error.message;

        toast.error(message);
        return;
      }

      toast.success("Logged in successfully");

      console.log("Logged In:", data);

      navigate("/dashboard");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthCard>
      <AuthHeader subtitle="Sign in to your account" />

      <AuthForm
        buttonText="Login"
        icon={<LogIn size={18} />}
        isLoading={isSubmitting}
        isDisabled={!isValid}
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

        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
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

        <div className="flex justify-end">
          <Link to="/forget" className="text-sm text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>
      </AuthForm>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>

        <Link
          to="/register"
          className="text-primary font-medium hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </AuthCard>
  );
}

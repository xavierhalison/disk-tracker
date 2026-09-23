import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../lib/api";
import { type LoginFormData, loginSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  return (
    <form
      onSubmit={handleSubmit((data: LoginFormData) => mutate(data))}
      className="bg-white flex flex-col items-center w-fit h-fit px-5 py-8 gap-4 rounded text-ink-black-900 shadow-xl shadow-black"
    >
      <h1 className="text-2xl font-bold">Login</h1>
      <label className="flex flex-col">
        <span className="text-sm font-bold">Email</span>
        <input
          className="border border-sunlit-clay-500 rounded px-3 py-2 w-72"
          type="text"
          {...register("email")}
        />
      </label>
      <label className="flex flex-col">
        <span className="text-sm font-bold">Password</span>
        <input
          className="border border-sunlit-clay-500 rounded px-3 py-2 w-72"
          type="password"
          {...register("password")}
        />
      </label>
      <button
        className="bg-sunlit-clay-500 text-white mt-5 px-3 py-2 font-bold rounded"
        type="submit"
        disabled={!isValid}
      >
        Login
      </button>
    </form>
  );
};

export default Login;

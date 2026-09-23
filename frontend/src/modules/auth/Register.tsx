import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser } from "../../lib/api";
import { type RegisterFormData, registerSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  return (
    <form
      onSubmit={handleSubmit((data: RegisterFormData) => mutate(data))}
      className="bg-white flex flex-col items-center w-fit h-fit px-5 py-8 gap-4 rounded text-ink-black-900 shadow-xl shadow-black"
    >
      <h1 className="text-2xl font-bold">Cadastro</h1>
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
      <label className="flex flex-col">
        <span className="text-sm font-bold">Confirm Password</span>
        <input
          className="border border-sunlit-clay-500 rounded px-3 py-2 w-72"
          type="password"
          {...register("confirmPassword")}
        />
      </label>
      <button
        className="bg-sunlit-clay-500 text-white mt-5 px-3 py-2 font-bold rounded"
        type="submit"
        disabled={!isValid}
      >
        Cadastrar
      </button>
    </form>
  );
};

export default Register;

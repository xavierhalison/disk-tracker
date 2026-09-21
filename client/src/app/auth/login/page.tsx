// import AuthForm from "../../../components/AuthForm";

import { login } from "../actions";

export default function LoginPage() {
  const inputClass =
    "w-full rounded-lg bg-ink-black-950 px-4 py-2 text-white outline-none placeholder:text-ink-black-300 focus:ring-2 focus:ring-sunlit-clay-500";

  return (
    <form
      action={login}
      className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-ink-black-800 p-8"
    >
      <h1 className="text-2xl font-bold">Entrar</h1>

      <label className="flex flex-col gap-1 text-sm font-bold">
        Email
        <input
          type="email"
          placeholder="you@example.com"
          className={inputClass}
          name="email"
          required
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-bold">
        Senha
        <input
          type="password"
          placeholder="••••••••"
          className={inputClass}
          name="password"
          required
        />
      </label>

      <button
        type="submit"
        className="rounded-lg bg-sunlit-clay-500 py-2 font-bold text-ink-black-950 hover:bg-sunlit-clay-400"
      >
        Entrar
      </button>
    </form>
  );
}

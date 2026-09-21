"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "../services/user";

type Props = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const isLogin = mode === "login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const body: Record<string, string> = { email, password };
    if (!isLogin) body.confirmPassword = confirmPassword;

    const res = await fetch(`${BASE_URL}/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.message ?? "Something went wrong.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  const inputClass =
    "w-full rounded-lg bg-ink-black-950 px-4 py-2 text-white outline-none placeholder:text-ink-black-300 focus:ring-2 focus:ring-sunlit-clay-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-ink-black-800 p-8"
    >
      <h1 className="text-2xl font-bold">
        {isLogin ? "Entrar" : "Criar conta"}
      </h1>

      <label className="flex flex-col gap-1 text-sm font-bold">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
          required
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-bold">
        Senha
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={inputClass}
          required
        />
      </label>

      {!isLogin && (
        <label className="flex flex-col gap-1 text-sm font-bold">
          Confirmar senha
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className={inputClass}
            required
          />
        </label>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        className="rounded-lg bg-sunlit-clay-500 py-2 font-bold text-ink-black-950 hover:bg-sunlit-clay-400"
      >
        {isLogin ? "Entrar" : "Criar conta"}
      </button>

      <p className="text-center text-sm">
        {isLogin ? (
          <>
            Não tem uma conta?{" "}
            <a
              href="/auth/register"
              className="font-bold text-sunlit-clay-500 hover:text-sunlit-clay-400"
            >
              Registrar
            </a>
          </>
        ) : (
          <>
            Já tem uma conta?{" "}
            <a
              href="/auth/login"
              className="font-bold text-sunlit-clay-500 hover:text-sunlit-clay-400"
            >
              Entrar
            </a>
          </>
        )}
      </p>
    </form>
  );
}

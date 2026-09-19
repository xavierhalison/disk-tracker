"use client";

import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex px-48 py-4 bg-ink-black-900 text-white">
      <h1 className="flex-1 text-xl font-bold">
        Disk <span className="text-sunlit-clay-500">Tracker</span>
      </h1>
      {pathname === "/auth/login" ? (
        <ul className="flex gap-5">
          <li className="hover:text-sunlit-clay-500">
            <a href="/auth/register">Cadastrar</a>
          </li>
        </ul>
      ) : pathname === "/auth/register" ? (
        <ul className="flex gap-5">
          <li className="hover:text-sunlit-clay-500">
            <a href="/auth/login">Entrar</a>
          </li>
        </ul>
      ) : (
        <ul className="flex gap-5">
          <li className="font-bold text-sunlit-clay-500 hover:text-sunlit-clay-500">
            <a href="/">Meus discos</a>
          </li>
          <li className="hover:text-sunlit-clay-500">
            <a href="/wishlist">Lista de desejos</a>
          </li>
          <li className="hover:text-sunlit-clay-500">
            Halison (Global State)
                {/*<a href="/wishlist">{user.email}</a>*/}
          </li>
        </ul>
      )}
    </nav>
  );
}

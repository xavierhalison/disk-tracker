import { Outlet, useLocation } from "react-router";

export const Layout = () => {
  const location = useLocation();

  return (
    <div className="bg-ink-black-900 min-h-screen flex flex-col">
      <header>
        <nav
          aria-label="Navegação principal"
          className="flex justify-between items-center bg-ink-black-800 px-10 py-8 shadow shadow-ink-black-950"
        >
          <h1 className="text-2xl font-bold">
            <a href="/" aria-label="Página inicial da empresa">
              <span className="text-ink-black-200">Disk</span>
              <span className="text-sunlit-clay-400">Tracker</span>
            </a>
          </h1>

          <ul>
            <li className="font-bold text-ink-black-200">
              {location.pathname === "/auth/register" && (
                <a href="/auth/login" aria-label="Fazer login na sua conta">
                  Entrar
                </a>
              )}
              {location.pathname === "/auth/login" && (
                <a href="/auth/register" aria-label="Fazer login na sua conta">
                  Cadastrar
                </a>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main id="main-content" className="h-full flex-1 flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

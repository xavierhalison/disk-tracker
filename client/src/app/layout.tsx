import "./layout.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen font-alata bg-ink-black-950 text-white">
          <nav className="flex px-48 py-4 bg-ink-black-900 text-white">
            <h1 className="flex-1 text-xl font-bold">
              Disk <span className="text-sunlit-clay-500">Tracker</span>
            </h1>
            <ul className="flex gap-5">
              <li className="font-bold text-sunlit-clay-500 hover:text-sunlit-clay-500">
                <a href="/">Meus discos</a>
              </li>
              <li className="hover:text-sunlit-clay-500">
                <a href="/wishlist">Lista de desejos</a>
              </li>
              <li className="hover:text-sunlit-clay-500">
                <a href="/wishlist">Halison</a>
              </li>
            </ul>
          </nav>
          <div className="px-48 py-4">
            <div className="bg-ink-black-900 rounded-2xl px-6 py-8 gap-5 grid grid-cols-4 h-full">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

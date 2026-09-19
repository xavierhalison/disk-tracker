import "./layout.css";
import NavBar from "../components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen font-alata bg-ink-black-950 text-white">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}

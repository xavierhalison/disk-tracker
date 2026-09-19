export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="col-span-4 flex items-center justify-center py-12">
      {children}
    </div>
  );
}
export default function HeaderlessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center pt-16">
      <main>{children}</main>
    </div>
  );
}

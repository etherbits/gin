export default function HeaderlessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center lg:pt-8">
      <main>{children}</main>
    </div>
  );
}

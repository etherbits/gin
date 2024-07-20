import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/primitive/card";

export function FormCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      className="mx-auto mb-8 mt-3 w-[min(90vw,400px)] border-none
        bg-charcoal-950 shadow-xl md:mt-6"
    >
      <CardHeader className="flex items-center gap-4 p-6">
        <CardTitle className="text-2xl text-charcoal-50">{title}</CardTitle>
        <CardDescription
          className="m-0 p-0 text-center text-lg text-charcoal-300"
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-stretch gap-8">
        {children}
      </CardContent>
    </Card>
  );
}

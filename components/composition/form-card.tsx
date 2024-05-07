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
    <Card className="w-[min(90vw,400px)] mb-8 mt-3 md:mt-6 border-none bg-charcoal-950 shadow-xl mx-auto">
      <CardHeader className="flex items-center gap-4 p-6">
        <CardTitle className="text-2xl text-charcoal-50">{title}</CardTitle>
        <CardDescription className="text-center m-0 p-0 text-lg text-charcoal-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-stretch gap-8">
        {children}
      </CardContent>
    </Card>
  );
}

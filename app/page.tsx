import { BulletCard } from "@/components/primitive/bullet-card";
import { Button } from "@/components/primitive/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex grow flex-col items-center p-6 pt-3">
      <Image
        src="/graphics/undraw_reading.svg"
        alt="reading"
        width={654}
        height={485}
        className="w-[94%] mb-10"
      />
      <h1 className="text-charcoal-100 font-meidum text-2xl mb-6">
        Welcome to <span className="text-gossamer-300 font-semibold">Gin!</span>
      </h1>
      <ul className="flex flex-col gap-4 mb-6">
        <BulletCard icon="Rocket">
          Master any subject with spaced repetition tailored to your pace
        </BulletCard>
        <BulletCard icon="PieChart">
          Master any subject with spaced repetition tailored to your pace
        </BulletCard>
        <BulletCard icon="BookCopy">
          Master any subject with spaced repetition tailored to your pace
        </BulletCard>
      </ul>
      <Link href="/sign-up" className="w-full">
        <Button className="w-full" size="lg">
          Get Started
        </Button>
      </Link>
    </main>
  );
}

import { BulletCard } from "@/components/primitive/bullet-card";
import { Button } from "@/components/primitive/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row lg:mt-20 items-center gap-6 lg:gap-12 xl:gap-24 mx-auto">
      <Image
        src="/graphics/undraw_reading.svg"
        alt="reading"
        width={981}
        height={727.5}
        className="w-[94%] max-w-[520px] lg:w-[50vw] lg:max-w-[981px] mb-10"
      />
      <div className="flex flex-col">
        <h1 className="text-charcoal-100 font-meidum text-2xl lg:text-4xl mb-6 lg:mb-8">
          Welcome to{" "}
          <span className="text-gossamer-300 font-semibold">Gin!</span>
        </h1>
        <ul className="flex flex-col gap-4 lg:gap-6 mb-6 lg:mb-8">
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
          <Button className="w-full">Get Started</Button>
        </Link>
      </div>
    </main>
  );
}

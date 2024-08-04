import { BulletCard } from "@/components/primitive/bullet-card";
import { Button } from "@/components/primitive/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="mx-auto flex flex-col items-center gap-6 lg:mt-20 lg:flex-row
        lg:gap-12 xl:gap-24"
    >
      <Image
        src="/graphics/undraw_reading.svg"
        alt="reading"
        width={981}
        height={727.5}
        className="mb-10 w-[94%] max-w-[520px] lg:w-[50vw] lg:max-w-[981px]"
      />
      <div className="flex flex-col">
        <h1
          className="font-meidum mb-6 text-2xl text-charcoal-100 lg:mb-8
            lg:text-4xl"
        >
          Welcome to{" "}
          <span className="font-semibold text-gossamer-300">Gin!</span>
        </h1>
        <ul className="mb-6 flex flex-col gap-4 lg:mb-8 lg:gap-6">
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

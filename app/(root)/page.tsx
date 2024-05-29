import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-end gap-8">
            <h1 className="h1-bold">
              Host, Connect, Fight: Your FGC events all in one place!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Sign up for events from your local game shop to global events
              online.
            </p>
            <Button size="lg" asChild className="w-full button sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[70vh]"
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
          />
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 id="events" className="h2-bold">Trusted by <br /> Thousands of Game Stores</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          Category Filter
        </div>
      </section>
    </>
  );
}

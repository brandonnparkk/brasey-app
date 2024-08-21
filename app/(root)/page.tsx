"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import useStore from '@/hooks/useStore'
import { useUser } from '@clerk/clerk-react';
import { getUserById } from '@/lib/actions/user.actions'

import { useEffect } from 'react';

export default function Home() {
  const { user, isLoaded } = useUser();
  const currentUser = useStore((state: any) => state.user);
  const updateUser = useStore((state: any) => state.updateUser);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const response = await getUserById(user.publicMetadata.userId as any);
        updateUser(response);
      }
    };

    if (isLoaded) {
      fetchUserData();
    }
  }, [user, isLoaded, updateUser]);


  return (
    <>
      <div>{ currentUser?.username }</div>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 2xl:gap-0">
          <div className="flex flex-col justify-end gap-8">
            <h1 className="h1-bold">
              We&apos;re Getting Married!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              We can&apos;t wait to celebrate with you! RSVP down below
            </p>
            <Button size="lg" asChild className="w-full button sm:w-fit">
              <Link href="/rsvp/create">RSVP</Link>
            </Button>
          </div>
          {/* <Image
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[70vh]"
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
          /> */}
        </div>
      </section>
    </>
  );
}

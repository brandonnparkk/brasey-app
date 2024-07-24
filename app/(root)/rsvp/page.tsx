"use client"

import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

import RSVPForm from "@/components/shared/RSVPForm"

const RSVP = () => {
  const { user, isLoaded } = useUser();
  const { userData, rsvpDetails, fetchUserData, fetchUserRsvpDetails } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.userId) {
      fetchUserData(user.publicMetadata.userId as string);
    }
  }, [user, isLoaded, fetchUserData]);

  useEffect(() => {
    if (userData?._id) {
      fetchUserRsvpDetails(userData._id);
    }
  }, [userData?._id, fetchUserRsvpDetails]);

  useEffect(() => {
    if (rsvpDetails?._id && isLoaded) {
      router.push(`/rsvp/${rsvpDetails._id}`);
    }
  }, [rsvpDetails, router, isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">RSVP Form</h3>
      </section>
      { rsvpDetails ?
      <div className="wrapper my-8">
        <RSVPForm
          userId={userData?._id}
          type={
            rsvpDetails ?
            'Update' : 'Create'
          } />
      </div>
      : <div>Update RSVP Form</div>}
    </>
  )
}

export default RSVP
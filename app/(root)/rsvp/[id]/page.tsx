"use client"
import React from 'react'
import { useEffect } from 'react';
import { SearchParamProps } from '@/types'
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

const RSVPDetails = ({ params: {id}}: SearchParamProps) => {
  const { rsvpDetails, fetchRsvpDetails } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchRsvpDetails(id);
    }
  }, [id, fetchRsvpDetails]);

  const handleUpdateBtnClick = () => {
    router.push(`/rsvp/update/${id}`);
  };

  return (
    <div>
      <h1>RSVP Detail Page</h1>
      <div>
        <div>Name: {rsvpDetails?.guest?.username}</div>
        <div>Attending?: {rsvpDetails?.isAttending ? 'YES' : 'NO'}</div>
        <div>Dinner Choice: {rsvpDetails?.dinnerChoice}</div>
        <div>Comments / Questions: {rsvpDetails?.commentsOrQuestions}</div>
      </div>
      <div>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpdateBtnClick}>Update RSVP</button>
      </div>
    </div>
  )
}

export default RSVPDetails
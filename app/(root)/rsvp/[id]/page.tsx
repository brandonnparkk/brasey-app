import React from 'react'
import { SearchParamProps } from '@/types'
import { getRsvpById } from '@/lib/actions/rsvp.actions'

const RSVPDetails = async ({ params: {id}}: SearchParamProps) => {
  const rsvpDetail = await getRsvpById(id);
  console.log('rsvp detail:', rsvpDetail);
  return (
    <div>
      <h1>RSVP Detail Page</h1>
      <div>
        <div>Name: {rsvpDetail?.guest?.username}</div>
        <div>Attending?: {rsvpDetail?.isAttending ? 'YES' : 'NO'}</div>
        <div>Dinner Choice: {rsvpDetail?.dinnerChoice}</div>
        <div>Comments / Questions: {rsvpDetail?.commentsOrQuestions}</div>
      </div>
    </div>
  )
}

export default RSVPDetails
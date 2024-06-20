"use client"

interface RSVPFormProps {
  userId: string,
  type: 'Create' | 'Update'
}

const RSVPForm = ({userId, type} : RSVPFormProps) => {
  return (
    <div>RSVP Form {type}</div>
  )
}

export default RSVPForm
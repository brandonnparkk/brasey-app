// import RSVPForm from "@/components/shared/RSVPForm"
import { SearchParamProps } from '@/types'
import { auth } from "@clerk/nextjs/server";

const UpdateRSVP = ({ params: {id}}: SearchParamProps) => {
  const sessionClaims = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">UPDATE YOUR RSVP</h3>
      </section>
      <div className="wrapper my-8">
        {/* <RSVPForm userId={userId} rsvpId={id} type="Update" /> */}
      </div>
    </>
  )
}

export default UpdateRSVP
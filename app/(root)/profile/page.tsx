"use client"
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useStore } from '@/store/useStore';

const Profile = () => {
  const { user, isLoaded } = useUser();
  const { userData, rsvpDetails, fetchUserData, fetchUserRsvpDetails } = useStore();

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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {userData ? (
        <div>
          <p>Name: {userData?.firstName} {userData?.lastName}</p>
          <p>Email: {userData?.email}</p>
          {/* Add more user data as needed */}
        </div>
      ) : (
        <p>No user data available</p>
      )}

      <div>
        <h2>Rsvp Details:</h2>
        <ul>
          <li>Name: {rsvpDetails?.guest?.username}</li>
          <li>Attending?: {rsvpDetails?.isAttending ? 'YES' : 'NO'}</li>
          <li>Dinner Choice: {rsvpDetails?.dinnerChoice}</li>
          <li>Comments / Questions: {rsvpDetails?.commentsOrQuestions}</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile
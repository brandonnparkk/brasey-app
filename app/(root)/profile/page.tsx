"use client"
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

import { getUserById } from '@/lib/actions/user.actions'
import { getRsvpByUser } from '@/lib/actions/rsvp.actions';

const Profile = () => {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState(null);
  const [rsvpDetails, setRsvpDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.publicMetadata?.userId) {
        try {
          const response = await getUserById(user.publicMetadata.userId);
          console.log("this is the response: ", response);
          setUserData(response);
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      }
    };

    if (isLoaded) {
      fetchUserData();
    }
  }, [user, isLoaded]);

  useEffect(() => {
    const fetchUserRsvpDetails = async () => {
      try {
        const details = await getRsvpByUser(userData?._id);
        console.log("this is the details: ", details);
        setRsvpDetails(details);
      } catch (err) {
        console.log("error: ", err);
      }
    }

    fetchUserRsvpDetails();
  }, [userData?._id]);

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
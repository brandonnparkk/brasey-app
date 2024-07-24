import create from 'zustand';
import { getUserById } from '@/lib/actions/user.actions';
import { getRsvpByUser, getRsvpById } from '@/lib/actions/rsvp.actions';

interface State {
  userData: any;
  setUserData: (userData: any) => void;
  rsvpDetails: any;
  setRsvpDetails: (rsvpDetails: any) => void;
  fetchRsvpDetails: (rsvpId: string) => Promise<void>;
  fetchUserData: (userId: string) => Promise<void>;
  fetchUserRsvpDetails: (userId: string) => Promise<void>;
}

export const useStore = create<State>((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData }),
  rsvpDetails: null,
  setRsvpDetails: (rsvpDetails) => set({ rsvpDetails }),
  fetchRsvpDetails: async (rsvpId: string) => {
    try {
      const rsvpDetails = await getRsvpById(rsvpId);
      set({ rsvpDetails: rsvpDetails });
    } catch (err) {
      console.error('Failed to fetch RSVP details', err);
    }
  },
  fetchUserData: async (userId: string) => {
    try {
      const response = await getUserById(userId);
      set({ userData: response });
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  },
  fetchUserRsvpDetails: async (userId: string) => {
    try {
      const details = await getRsvpByUser(userId);
      set({ rsvpDetails: details });
    } catch (err) {
      console.error('Failed to fetch RSVP details', err);
    }
  },
}));

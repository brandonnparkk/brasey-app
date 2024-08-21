import { create } from 'zustand'

const useStore = create((set) => ({
  user: undefined,
  updateUser: (userData: any) => set({ user: userData }),
  // increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears: number) => set({ bears: newBears }),
}));

export default useStore;
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Booking {
  doctorsId: number | null;
  specialties: number[];
  hospitals: number[];
  date: Date | null;
  stepStore: number;
  time: string | null;
  symptoms: string;

  isLoaded: boolean;

  clearBooking: () => void;
  setBooking: (data: {
    doctorsId?: number | null;
    specialties?: number[];
    hospitals?: number[];
    date?: Date | null;
    time?: string | null;
    stepStore?: number;
    symptoms?: string;
  }) => void;
  setLoaded: (value: boolean) => void;
}

const BookingStore = create(
  persist<Booking>(
    (set) => ({
      doctorsId: null,
      specialties: [],
      hospitals: [],
      date: null,
      time: "",
      symptoms: "",
      stepStore: 0,
      isLoaded: false,

      clearBooking: () =>
        set({
          doctorsId: null,
          specialties: [],
          hospitals: [],
          date: null,
          time: null,
          symptoms: "",
          stepStore:0,
          isLoaded: true, // Có thể để false nếu muốn load lại
        }),

      setBooking: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      setLoaded: (value) => set({ isLoaded: value }),
    }),
    {
      name: "booking-storage",
      onRehydrateStorage: () => (state) => {
        state?.setLoaded(true);
      },
    }
  )
);

export default BookingStore;

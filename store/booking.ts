import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Booking {
  doctorsId: number | null;
  specialties: number[];
  hospitals: number[];
  symptoms: string;

  clearBooking: () => void;
  setBooking: (data: {
    doctorsId?: number | null;
    specialties?: number[];
    hospitals?: number[];
    symptoms?: string;
  }) => void;
}

const BookingStore = create(
  persist<Booking>(
    (set) => ({
      doctorsId: null,
      specialties: [],
      hospitals: [],
      symptoms: "",

      clearBooking: () =>
        set({
          doctorsId: null,
          specialties: [],
          hospitals: [],
          symptoms: "",
        }),

      setBooking: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),
    }),
    {
      name: "booking-storage",
    }
  )
);

export default BookingStore;

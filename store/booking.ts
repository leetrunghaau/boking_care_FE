import { BookingInfo } from "@/types/booking";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface Booking {
  bookingInfo: BookingInfo;
  hasHydrated: boolean;
  clearBooking: () => void;
  setBooking: (data: Partial<BookingInfo>) => void;
}

const defaultBookingInfo: BookingInfo = {
  currStep: 0,
  symptoms: "",
  doctorId: null,
  date: null,
  time: null,
  name: "",
  phone: "",
  email: "",
  dob: new Date(),
  gender: "",
  address: "",
  allergies: "",
  medicalHistory: "",
};

export const useBookingStore = create<Booking>()(
  persist(
    (set, get) => ({
      bookingInfo: defaultBookingInfo,
      hasHydrated: false,

      clearBooking: () => {
        set({ bookingInfo: defaultBookingInfo });
      },

      setBooking: (data) => {
        console.warn("[store] setBooking called with data:", data);
        set((state) => {
          const updated = {
            ...state.bookingInfo,
            ...data,
          };
          console.log("[store] Updated bookingInfo:", updated);
          return {
            bookingInfo: updated,
          };
        });
      },
    }),
    {
      name: "booking-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export interface BookingInfo {
  currStep: number;
  symptoms: string;
  doctorId: number | null;
  date: Date | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
  dob: Date;
  gender: string;
  address: string;
  allergies: string;
  medicalHistory: string;
}
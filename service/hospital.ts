import http from '@/helper/axios';
import { HospitalShort } from '@/types/hospital';


export const HospitalSV = {
  getAll: async() => await http.get<HospitalShort[]>("/hospitals"),
};

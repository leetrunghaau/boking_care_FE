'use client'

import http from "@/helper/axios";
import { useEffect, useState } from "react";
import { Input } from '@/components/ui/input';
import { MapPin, Search, TestTubeDiagonal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { getIconByName } from "@/helper/icon-map";



interface Props {
  onSearch: (query: string) => void;
}

export default function DoctorSearchFilter({ onSearch }: Props) {
  const [search, setSearch] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const spts = await http.get<any[]>("/doctor-site/specialties");
        const ars = await http.get<any[]>("/doctor-site/address");
        setSpecialties(spts);
        setAddresses(ars);
      } catch (err) {
        console.error("Failed to fetch filters:", err);
      }
    };

    fetchFilters();
  }, []);

  const handleSearchClick = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (specialty) params.set("specialty", specialty);
    if (address) params.set("address", address);
    const query = params.toString() ? `?${params.toString()}` : "";
    console.log(query)
    onSearch(query);
  };

  return (
    <div className="container justify-center mx-auto w-11/12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Tìm kiếm bác sĩ</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tên bác sĩ, chuyên khoa..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger>
              <SelectValue placeholder="Chuyên khoa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex gap-3 items-center">
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-teal-50">
                    <TestTubeDiagonal className="w-5 h-5 text-teal-600" />
                  </div>
                  <p className=" text-slate-800">Tất cả chuyên khoa</p>
                </div>
              </SelectItem>
              {specialties.map((item) => {
                const Icon = getIconByName(item.icon)
                return (

                  <SelectItem key={item.slug} value={item.slug}>
                    <div className="flex gap-3 items-center">
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-teal-50">
                        <Icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <p className=" text-slate-800">{item.name}</p>
                    </div>
                  </SelectItem>
                )
              }
              )}
            </SelectContent>
          </Select>

          <Select value={address} onValueChange={setAddress} >
            <SelectTrigger>
              <div className="flex gap-3 items-center">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-teal-50">
                  <MapPin className="w-5 h-5 text-teal-600" />
                </div>
                <SelectValue placeholder="Địa điểm" />
              </div>

            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả địa điểm</SelectItem>
              {addresses.map((item: string, index: number) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={handleSearchClick}>Tìm kiếm</Button>
        </div>
      </div>
    </div>
  );
}

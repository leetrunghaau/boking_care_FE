'use client'

import http from "@/helper/axios";
import { useEffect, useState } from "react";
import { Input } from '@/components/ui/input';
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';


interface Specialty {
  slug: string;
  name: string;
}

interface Address {
  slug: string;
  name: string;
}
interface Props {
  onSearch: (query: string) => void;
}

export default function DoctorSearchFilter({ onSearch }: Props) {
  const [search, setSearch] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const specialties = await http.get<Specialty[]>("/doctor-site/specialties");
        const address = await http.get<Specialty[]>("/doctor-site/address");
        setSpecialties(specialties);
        setAddresses(address);
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
              <SelectItem value="all">Tất cả chuyên khoa</SelectItem>
              {specialties.map((item) => (
                <SelectItem key={item.slug} value={item.slug}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={address} onValueChange={setAddress}>
            <SelectTrigger>
              <SelectValue placeholder="Địa điểm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả địa điểm</SelectItem>
              {addresses.map((item) => (
                <SelectItem key={item.slug} value={item.slug}>
                  {item.name}
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

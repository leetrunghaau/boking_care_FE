"use client"

import { Card, CardContent } from "@/components/ui/card"
import http from "@/helper/axios"
import Image from "next/image"
import { useEffect, useState } from "react"



interface Pops {
  id: number
}

export default function DoctorList({ id }: Pops) {

  const [doctors, setDoctor] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get<any[]>(`/hospital/${id}/doctors`)
        console.log("bác sĩ tại bệnh viện", res)
        setDoctor(res)
      } catch (err) {
        console.error("Failed to load images:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {doctors.map((doc) => (
        <Card key={doc.id}>
          <div className="relative h-[200px] w-full">
            <Image
              src={doc.img ?? "/placeholder.svg"}
              alt={doc.user.name}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg">{doc.user.name}</h3>
            <p className="text-sm text-muted-foreground">{doc.specialty.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

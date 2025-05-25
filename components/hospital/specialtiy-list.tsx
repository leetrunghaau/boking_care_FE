"use client"

import http from "@/helper/axios"
import { useEffect, useState } from "react"


interface Pops {
  id: number
}


export default function SpecialtiyList({ id }: Pops) {
  const [specialties, setSpecialties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get<any[]>(`/hospital/${id}/specsialties`)
        setSpecialties(res)
      } catch (err) {
        console.error("Failed to load specsialties:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  if (loading) return <p className="text-center text-sm text-muted-foreground">Đang tải...</p>

  return (
    <div className="flex flex-wrap gap-3">
      {specialties.map((sp) => (
        <span key={sp.id} className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium">
          {sp.name}
        </span>
      ))}
    </div>
  )
}

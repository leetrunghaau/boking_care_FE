"use client"

import http from "@/helper/axios"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Img {
  id: number
  src: string
}

interface ImgListProps {
  slug: string
}

const mockImgs: Img[] = [
  { id: 1, src: "/placeholder.svg" },
  { id: 2, src: "/placeholder.svg" },
  { id: 3, src: "/placeholder.svg" },
  { id: 4, src: "/placeholder.svg" },
  { id: 5, src: "/placeholder.svg" },
  { id: 6, src: "/placeholder.svg" },
]
export default function ImgList({ slug }: ImgListProps) {
  const [imgs, setImgs] = useState<Img[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImgs = async () => {
      try {
        // const res = await http.get<Img[]>(`/hospital/${slug}/imgs`)
        setImgs(mockImgs)
      } catch (err) {
        console.error("Failed to load images:", err)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchImgs()
    }
  }, [slug])

  if (loading) return <p className="text-center text-sm text-muted-foreground">Đang tải hình ảnh...</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {imgs.length > 0 ? (
        imgs.map((img) => (
          <div key={img.id} className="rounded overflow-hidden shadow">
            <Image
              src={img.src}
              alt={`Gallery ${img.src}`}
              width={400}
              height={300}
              className="object-cover w-full h-auto"
            />
          </div>
        ))
      ) : (
        <p className="text-center col-span-full text-sm text-muted-foreground">Không có hình ảnh nào</p>
      )}
    </div>
  )
}

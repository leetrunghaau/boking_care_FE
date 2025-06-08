"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import http from "@/helper/axios"
import { handleApiSuccess, handleErorr } from "@/helper/toast-utils"

interface Facility {
    id: number
    name: string
    about: string
    address: string
    phone: string
    license: string
    image: string
    year: number //năm hoạt động
    mapEmbedUrl: string
    times: {
        dayOfWeek: number // 0 là chủ nhật, 1 là thứ 2, 2 là thứ 3,... 
        startTime: number // hh*60+mm
        endTime: number // hh*60+mm
    }[]
}


export default function EditHospitalBasicCard() {
    const params = useParams()
    const id = params?.id as string

    const [facility, setFacility] = useState<Facility | null>(null)

    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        //get defauld value
    }, [id])

    const handleImageUpload = async () => {
        if (!selectedImage) return

        try {
            setIsUploading(true)
            const rs = await http.postFile<any | null>(`/hospital/${id}/img-update`, selectedImage)
            if (rs) {
                setFacility({ ...facility, image: rs.data.url })
                handleApiSuccess()
            }
        } catch (error) {
            console.log(error)
            handleErorr()
        } finally {
            setIsUploading(false)
        }
    }

    const handleSave = async () => {
        try {
            const rs = await http.put<any | null>("/hospital/", facility)
            if (rs) {
                handleApiSuccess()
            }
        } catch (error) {
            console.log(error)
            handleErorr()
        } finally {
        }
    }

    return (
        <div>

        </div>
    )
}


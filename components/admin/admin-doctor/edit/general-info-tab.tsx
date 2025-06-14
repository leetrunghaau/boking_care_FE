"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Save,
  Loader2,
} from "lucide-react"
import { LanguagesCP } from "./general/languages"
import { SkillCP } from "./general/skills"
import { InfoCP } from './general/info';
import { WorkCP } from "./general/work"
import { CardLoading } from "@/components/ui/loading"
import http from "@/helper/axios"
import { useParams } from "next/navigation"
import { handleApiError, handleApiSuccess, handleErorr } from "@/helper/toast-utils"



export default function GeneralInfoTab() {
   const params = useParams()
    const id = params?.id as string
  
  const [formData, setFormData] = useState<any>({
    name: "",
    gender: "",
    phone: "",
    email: "",
    dob: "",
    about: "",
    img: "",
    hospitalId: null,
    specialtyId: null,
  })

  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const rs = await http.get<any>(`/admin-doctor/doctor/${id}/general-info`)
      if (rs){
        setFormData(rs.doctor)
        setLang(rs.langs)
        setSkills(rs.skills)
      }
    } catch (error) {
      console.error("Error loading data:", error)
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }



  const handleSave = async () => {
    setSaving(true)
    try {
      let doctorPut = formData
      let img = formData.img

      if (img instanceof File) {
        const { img: _, ...rest } = formData
        doctorPut = rest
      }

      const rs = await http.post<any>(`/admin-doctor/doctor/${id}/general-info`, {
        doctor: doctorPut,
        langs: lang,
        skills: skills
      })

      if (rs?.ok) {
        setFormData(rs.doctor)
        setLang(rs.langs)
        setSkills(rs.skills)
        handleApiSuccess("Đã cập nhật thông tin thành công!")
      }else{
        handleErorr(rs?.mess?? "Đã có lỗi xảy ra")
        setSaving(false)
        return
      }

      if (img instanceof File) {
        const imgRS = await http.postFile<string>(`/admin-doctor/doctor/${id}/general-info/img`, img)
        if (imgRS) {
          setFormData((prev: any) => ({ ...prev, img: imgRS }))
        }
      }

    } catch (error) {
      handleErorr("Đã xảy ra lỗi")
    } finally {
      setSaving(false)
    }
  }
  



  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          size="lg"
          className="bg-teal-600 hover:bg-teal-700 text-white right-0"
        >
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Đang lưu..." : "Lưu thông tin"}
        </Button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {loading ? <CardLoading /> :
            <InfoCP
              form={formData}
              onChange={handleInputChange}
            />
          }
          {loading ? <CardLoading /> :
            <WorkCP
              form={formData}
              onChange={handleInputChange}
            />
          }
        </div>
        <div className="space-y-6">
          {loading ? <CardLoading /> :
            <SkillCP
              skills={skills}
              onChange={setSkills}
            />
          }
          {
            loading ? <CardLoading /> :
              <LanguagesCP
                lang={lang}
                onChange={setLang}
              />
          }

        </div>
      </div>
    </div>
  )
}

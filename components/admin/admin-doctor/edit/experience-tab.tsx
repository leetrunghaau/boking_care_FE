"use client"

import { useState } from "react"

interface ExperienceTabProps {
  experiences: any[]
  education: any[]
  doctorId: number
  onUpdate: (data: { experiences?: any[]; education?: any[] }) => void
  onNotification: (type: "success" | "error", message: string) => void
}

export default function ExperienceTab({ 
  experiences, 
  education, 
  doctorId, 
  onUpdate, 
  onNotification 
}: ExperienceTabProps) {
  const [experiencesList, setExperiencesList] = useState<any[]>(experiences)
  const [educationList, setEducationList] = useState<any[]>(education)
  
  const [experienceDialog, setExperienceDialog] = useState({ open: false, data: null as any | null })
  const [educationDialog, setEducationDialog] = useState({ open: false, data: null as any | null })
  
  const [newExperience, setNewExperience] = useState<Omit<any, "id">>({
    position: "",
    organization: "",
    startYear: new Date().getFullYear(),
    endYear: null,
  })
  const [newEducation, setNewEducation] = useState<Omit<any, "id">>({
    degree: "",
    school: "",
    year: new Date().getFullYear(),
  })
  
  const [saving, setSaving] = useState(false)
  const [activeSubTab, setActiveSubTab] = useState("experience")

  // Experience handlers
  const handleAddExperience = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      // In a real app, you would call your API here
      // const response = await fetch(`/api/doctors/${doctorId}/experiences`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newExperience)
      // });
      // const data = await response.json();
      
      // Create new experience with generated ID
      const newId = Math.max(0, ...experiencesList.map((e) => e.id)) + 1
      const experienceToAdd = { id: newId, ...newExperience }
      
      // Update local state
      const updatedExperiences = [...experiencesList, experienceToAdd]
      setExperiencesList(updatedExperiences)
      
      // Update parent state
      onUpdate({ experiences: updatedExperiences })
      onNotification("success", "Đã thêm kinh nghiệm làm việc mới thành công")
      
      // Reset form and close dialog
      setExperienceDialog({ open: false, data: null })
      setNewExperience({
        position: "",
        organization: "",
        startYear: new Date().getFullYear(),
        endYear: null,
      })
    } catch (error) {
      onNotification("error", "Không thể thêm kinh nghiệm làm việc. Vui lòng thử lại sau.")
    } finally {
      setSaving(false)
    }
  }

  const handleEditExperience = async () => {
    if (!experienceDialog.data) return
    
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      // In a real app, you would call your API here
      // const response = await fetch(`/api/doctors/${doctorId}/experiences/${experienceDialog.data.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(experienceDialog.data)
      // });
      
      // Update local state
      const updatedExperiences = experiencesList.map((exp) =>
        exp.id === experienceDialog.data.id ? { ...experienceDialog.data } : exp
      )
      setExperiencesList(updatedExperiences)
      
      // Update parent state
      onUpdate({ experiences: updatedExperiences })
      onNotification("success", "Đã cập nhật kinh nghiệm làm việc thành công")
      
      // Close dialog
      setExperienceDialog({ open: false, data: null })
    } catch (error) {
      onNotification("error", "Không thể cập nhật kinh nghiệm làm việc. Vui lòng thử lại sau.")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteExperience = async (id: number) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      // In a real app, you would call your API here
      // await fetch(`/api/doctors/${doctorId}/experiences/${id}`, {
      //   method: 'DELETE'
      // });
      
      // Update local state
      const updatedExperiences = experiencesList.filter((exp) => exp.id !== id)
      setExperiencesList(updatedExperiences)
      
      // Update parent state
      onUpdate({ experiences: updatedExperiences })
      onNotification("success", "Đã xóa kinh nghiệm làm việc thành công")
    } catch (error) {
      onNotification("error", "Không thể xóa kinh nghiệm làm việc. Vui lòng thử lại sau.")
    }
  }

  const handleAddEducation = async () => {
    setSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      
     
      const newId = Math.max(0, ...educationList.map((e) => e.id)) + 1
      const educationToAdd = { id: newId, ...newEducation }
      
      const updatedEducation = [...educationList, educationToAdd]
      setEducationList(updatedEducation)
      
      // Update parent state
      onUpdate({ education: updatedEducation })
      onNotification("success", "Đã thêm học vấn mới thành công")
      
      // Reset form and close dialog
      setEducationDialog({ open: false, data: null })
      setNewEducation({
        degree: "",
        school: "",
        year: new Date().getFullYear(),
      })
    } catch (error) {
      onNotification("error", "Không thể thêm học vấn. Vui lòng thử lại sau.")
    } finally {
      setSaving(false)
    }
  }

  const handleEditEducation = async () => {
    if (!educationDialog.data) return
    
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      // In a real app, you would call your API here
      // const response = await fetch(`/api/doctors/${doctorId}/education/${educationDialog.data.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(educationDialog.data)
      // });
      
      // Update local state
      const updatedEducation = educationList.map((edu) =>
        edu.id === educationDialog.data.id ? { ...educationDialog.data } : edu
      )
      setEducationList(updatedEducation)
      
      // Update parent state
      onUpdate({ education: updatedEducation })
      onNotification("success", "Đã cập nhật học vấn thành công")
      
      // Close dialog
      setEducationDialog({ open: false, data: null })
    } catch (error) {
      onNotification("error", "Không thể cập nhật học vấn. Vui lòng thử lại sau.")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteEducation = async (id: number) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, you would call your API here
      // await fetch(`/api/doctors/${doctorId}/education/${id}`, {
      //   method: 'DELETE'
      // });

      // Update local state
      const updatedEducation = educationList.filter((edu) => edu.id !== id)
      setEducationList(updatedEducation)

      // Update parent state
      onUpdate({ education: updatedEducation })
      onNotification("success", "Đã xóa học vấn thành công")
    } catch (error) {
      onNotification("error", "Không thể xóa học vấn. Vui lòng thử lại sau.")
    }
  }

  // UI Placeholder (tùy bạn muốn render theo kiểu nào, đây chỉ là khung logic)

  return (
    <div>
      <div className="mb-4">
        <button
          className={`mr-2 ${activeSubTab === "experience" ? "font-bold underline" : ""}`}
          onClick={() => setActiveSubTab("experience")}
        >
          Kinh nghiệm
        </button>
        <button
          className={activeSubTab === "education" ? "font-bold underline" : ""}
          onClick={() => setActiveSubTab("education")}
        >
          Học vấn
        </button>
      </div>

      {activeSubTab === "experience" ? (
        <div>
          <h2 className="text-lg font-semibold mb-2">Danh sách Kinh nghiệm</h2>
          <ul className="mb-4">
            {experiencesList.map((exp) => (
              <li key={exp.id} className="mb-2 border p-2 rounded">
                <div>
                  <strong>{exp.position}</strong> tại {exp.organization} ({exp.startYear} - {exp.endYear ?? "Hiện tại"})
                </div>
                <div className="mt-1">
                  <button onClick={() => setExperienceDialog({ open: true, data: exp })} className="text-blue-600 mr-2">Sửa</button>
                  <button onClick={() => handleDeleteExperience(exp.id)} className="text-red-600">Xóa</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={() => setExperienceDialog({ open: true, data: null })} className="bg-green-600 text-white px-4 py-2 rounded">
            + Thêm kinh nghiệm
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-2">Danh sách Học vấn</h2>
          <ul className="mb-4">
            {educationList.map((edu) => (
              <li key={edu.id} className="mb-2 border p-2 rounded">
                <div>
                  <strong>{edu.degree}</strong> tại {edu.school} ({edu.year})
                </div>
                <div className="mt-1">
                  <button onClick={() => setEducationDialog({ open: true, data: edu })} className="text-blue-600 mr-2">Sửa</button>
                  <button onClick={() => handleDeleteEducation(edu.id)} className="text-red-600">Xóa</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={() => setEducationDialog({ open: true, data: null })} className="bg-green-600 text-white px-4 py-2 rounded">
            + Thêm học vấn
          </button>
        </div>
      )}

      {/* Dialogs hiển thị form nhập dữ liệu thêm/sửa (có thể thay bằng modal thực tế) */}
      {experienceDialog.open && (
        <div className="mt-6 p-4 border rounded">
          <h3 className="text-md font-medium mb-2">{experienceDialog.data ? "Sửa kinh nghiệm" : "Thêm kinh nghiệm"}</h3>
          <input
            placeholder="Chức danh"
            value={experienceDialog.data?.position ?? newExperience.position}
            onChange={(e) => {
              if (experienceDialog.data) {
                setExperienceDialog({ ...experienceDialog, data: { ...experienceDialog.data, position: e.target.value } })
              } else {
                setNewExperience({ ...newExperience, position: e.target.value })
              }
            }}
            className="mb-2 p-2 border w-full"
          />
          <input
            placeholder="Tổ chức"
            value={experienceDialog.data?.organization ?? newExperience.organization}
            onChange={(e) => {
              if (experienceDialog.data) {
                setExperienceDialog({ ...experienceDialog, data: { ...experienceDialog.data, organization: e.target.value } })
              } else {
                setNewExperience({ ...newExperience, organization: e.target.value })
              }
            }}
            className="mb-2 p-2 border w-full"
          />
          <input
            placeholder="Năm bắt đầu"
            type="number"
            value={experienceDialog.data?.startYear ?? newExperience.startYear}
            onChange={(e) => {
              const val = Number(e.target.value)
              if (experienceDialog.data) {
                setExperienceDialog({ ...experienceDialog, data: { ...experienceDialog.data, startYear: val } })
              } else {
                setNewExperience({ ...newExperience, startYear: val })
              }
            }}
            className="mb-2 p-2 border w-full"
          />
          <input
            placeholder="Năm kết thúc (hoặc để trống)"
            type="number"
            value={experienceDialog.data?.endYear ?? newExperience.endYear ?? ""}
            onChange={(e) => {
              const val = e.target.value ? Number(e.target.value) : null
              if (experienceDialog.data) {
                setExperienceDialog({ ...experienceDialog, data: { ...experienceDialog.data, endYear: val } })
              } else {
                setNewExperience({ ...newExperience, endYear: val })
              }
            }}
            className="mb-2 p-2 border w-full"
          />
          <button
            onClick={experienceDialog.data ? handleEditExperience : handleAddExperience}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            disabled={saving}
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      )}

      {educationDialog.open && (
        <div className="mt-6 p-4 border rounded">
          <h3 className="text-md font-medium mb-2">{educationDialog.data ? "Sửa học vấn" : "Thêm học vấn"}</h3>
          <input
            placeholder="Bằng cấp"
            value={educationDialog.data?.degree ?? newEducation.degree}
            onChange={(e) => {
              if (educationDialog.data) {
                setEducationDialog({ ...educationDialog, data: { ...educationDialog.data, degree: e.target.value } })
              } else {
                setNewEducation({ ...newEducation, degree: e.target.value })
              }
            }}
            className="mb-2 p-2 border w-full"
          />
          <input
            placeholder="Trường"
            value={educationDialog.data?.school ?? newEducation.school}
            onChange={(e) => {
              if (educationDialog.data) {
                setEducationDialog({ ...educationDialog, data: { ...educationDialog.data, school: e.target.value } })
              } else {
                setNewEducation({ ...newEducation, school: e.target.value })
              }
            }}
            className="mb-2 p-2 border w-full"
          />
          <input
            placeholder="Năm tốt nghiệp"
            type="number"
            value={educationDialog.data?.year ?? newEducation.year}
            onChange={(e) => {
              const val = Number(e.target.value)
              if (educationDialog.data) {
                setEducationDialog({ ...educationDialog, data: { ...educationDialog.data, year: val } })
              } else {
                setNewEducation({ ...newEducation, year: val })
              }
            }}
            className="mb-2 p-2 border w-full"
          />
          <button
            onClick={educationDialog.data ? handleEditEducation : handleAddEducation}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            disabled={saving}
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      )}
    </div>
  )
}

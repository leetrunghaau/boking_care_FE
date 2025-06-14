"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, Languages, Plus, FileEdit, Trash2, Loader2 } from "lucide-react"

interface QualificationsTabProps {
  specialties: any[]
  languages: any[]
  doctorId: number
  onUpdate: (data: { specialties?: any[]; languages?: any[] }) => void
  onNotification: (type: "success" | "error", message: string) => void
}

export default function QualificationsTab({
  specialties,
  languages,
  doctorId,
  onUpdate,
  onNotification,
}: QualificationsTabProps) {
  const [specialtiesList, setSpecialtiesList] = useState<any[]>(specialties)
  const [languagesList, setLanguagesList] = useState<any[]>(languages)

  const [specialtyDialog, setSpecialtyDialog] = useState({ open: false, data: null as any | null })
  const [languageDialog, setLanguageDialog] = useState({ open: false, data: null as any | null })

  const [newSpecialty, setNewSpecialty] = useState<Omit<any, "id">>({ name: "" })
  const [newLanguage, setNewLanguage] = useState<Omit<any, "id">>({ name: "" })

  const [saving, setSaving] = useState(false)
  const [activeSubTab, setActiveSubTab] = useState("specialties")

  // Specialty handlers
  const handleAddSpecialty = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // In a real app, you would call your API here
      // const response = await fetch(`/api/doctors/${doctorId}/specialties`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newSpecialty)
      // });
      // const data = await response.json();

      // Create new specialty with generated ID
      const newId = Math.max(0, ...specialtiesList.map((s) => s.id)) + 1
      const specialtyToAdd = { id: newId, ...newSpecialty }

      // Update local state
      const updatedSpecialties = [...specialtiesList, specialtyToAdd]
      setSpecialtiesList(updatedSpecialties)

      // Update parent state
      onUpdate({ specialties: updatedSpecialties })
      onNotification("success", "Đã thêm chuyên môn mới thành công")

      // Reset form and close dialog
      setSpecialtyDialog({ open: false, data: null })
      setNewSpecialty({ name: "" })
    } catch (error) {
      onNotification("error", "Không thể thêm chuyên môn. Vui lòng thử lại sau.")
    } finally {
      setSaving(false)
    }
  }

  const handleEditSpecialty = async () => {
    if (!specialtyDialog.data) return

    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // In a real app, you would call your API here
      // const response = await fetch(`/api/doctors/${doctorId}/specialties/${specialtyDialog.data.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(specialtyDialog.data)
      // });

      // Update local state
      const updatedSpecialties = specialtiesList.map((spec) =>
        spec.id === specialtyDialog.data.id ? { ...specialtyDialog.data } : spec,
      )
      setSpecialtiesList(updatedSpecialties)

      // Update parent state
      onUpdate({ specialties: updatedSpecialties })
      onNotification("success", "Đã cập nhật chuyên môn thành công")

      // Close dialog
      setSpecialtyDialog({ open: false, data: null })
    } catch (error) {
      onNotification("error", "Không thể cập nhật chuyên môn. Vui lòng thử lại sau.")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSpecialty = async (id: number) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, you would call your API here
      // await fetch(`/api/doctors/${doctorId}/specialties/${id}`, {
      //   method: 'DELETE'
      // });

      // Update local state
      const updatedSpecialties = specialtiesList.filter((spec) => spec.id !== id)
      setSpecialtiesList(updatedSpecialties)

      // Update parent state
      onUpdate({ specialties: updatedSpecialties })
      onNotification("success", "Đã xóa chuyên môn thành công")
    } catch (error) {
      onNotification("error", "Không thể xóa chuyên môn. Vui lòng thử lại sau.")
    }
  }

  // Language handlers
  const handleAddLanguage = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // In a real app, you would call your API here
      // const response = await fetch(`/api/doctors/${doctorId}/languages`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newLanguage)
      // });
      // const data = await response.json();

      // Create new language with generated ID
      const newId = Math.max(0, ...languagesList.map((l) => l.id)) + 1
      const languageToAdd = { id: newId, ...newLanguage }

      // Update local state
      const updatedLanguages = [...languagesList, languageToAdd]
      setLanguagesList(updatedLanguages)

      // Update parent state
      onUpdate({ languages: updatedLanguages })
      onNotification("success", "Đã thêm ngôn ngữ mới thành công")

      // Reset form and close dialog
      setLanguageDialog({ open: false, data: null })
      setNewLanguage({ name: "" })
    } catch (error) {
      onNotification("error", "Không thể thêm ngôn ngữ. Vui lòng thử lại sau.")
    } finally {
      setSaving(false)
    }
  }

  const handleEditLanguage = async () => {
    if (!languageDialog.data) return

    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // In a real app, you would call your API here
      // const response = await fetch(`/api/doctors/${doctorId}/languages/${languageDialog.data.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(languageDialog.data)
      // });

      // Update local state
      const updatedLanguages = languagesList.map((lang) =>
        lang.id === languageDialog.data.id ? { ...languageDialog.data } : lang,
      )
      setLanguagesList(updatedLanguages)

      // Update parent state
      onUpdate({ languages: updatedLanguages })
      onNotification("success", "Đã cập nhật ngôn ngữ thành công")

      // Close dialog
      setLanguageDialog({ open: false, data: null })
    } catch (error) {
      onNotification("error", "Không thể cập nhật ngôn ngữ. Vui lòng thử lại sau.")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteLanguage = async (id: number) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, you would call your API here
      // await fetch(`/api/doctors/${doctorId}/languages/${id}`, {
      //   method: 'DELETE'
      // });

      // Update local state
      const updatedLanguages = languagesList.filter((lang) => lang.id !== id)
      setLanguagesList(updatedLanguages)

      // Update parent state
      onUpdate({ languages: updatedLanguages })
      onNotification("success", "Đã xóa ngôn ngữ thành công")
    } catch (error) {
      onNotification("error", "Không thể xóa ngôn ngữ. Vui lòng thử lại sau.")
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="bg-gradient-to-r from-teal-50 to-green-50 rounded-t-lg">
          <CardTitle className="flex items-center text-xl">
            <Stethoscope className="w-5 h-5 mr-2 text-teal-600" />
            Chuyên môn & Ngôn ngữ
          </CardTitle>
          <CardDescription>Các lĩnh vực chuyên môn và ngôn ngữ của bác sĩ</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="specialties" value={activeSubTab} onValueChange={setActiveSubTab}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="specialties">Chuyên môn</TabsTrigger>
              <TabsTrigger value="languages">Ngôn ngữ</TabsTrigger>
            </TabsList>

            {/* Specialties Tab */}
            <TabsContent value="specialties">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Danh sách chuyên môn</h3>
                <Button
                  onClick={() => {
                    setNewSpecialty({ name: "" })
                    setSpecialtyDialog({ open: true, data: null })
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm chuyên môn
                </Button>
              </div>

              {specialtiesList.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <Stethoscope className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Chưa có chuyên môn nào</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {specialtiesList.map((specialty) => (
                    <div
                      key={specialty.id}
                      className="bg-teal-50 border border-teal-200 rounded-lg px-4 py-3 flex items-center justify-between"
                    >
                      <span className="font-medium text-teal-700">{specialty.name}</span>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSpecialtyDialog({ open: true, data: { ...specialty } })}
                          className="h-7 w-7 p-0 text-teal-600"
                        >
                          <FileEdit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSpecialty(specialty.id)}
                          className="h-7 w-7 p-0 text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Languages Tab */}
            <TabsContent value="languages">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Danh sách ngôn ngữ</h3>
                <Button
                  onClick={() => {
                    setNewLanguage({ name: "" })
                    setLanguageDialog({ open: true, data: null })
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm ngôn ngữ
                </Button>
              </div>

              {languagesList.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <Languages className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Chưa có ngôn ngữ nào</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {languagesList.map((language) => (
                    <div
                      key={language.id}
                      className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center justify-between"
                    >
                      <span className="font-medium text-blue-700">{language.name}</span>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setLanguageDialog({ open: true, data: { ...language } })}
                          className="h-7 w-7 p-0 text-blue-600"
                        >
                          <FileEdit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLanguage(language.id)}
                          className="h-7 w-7 p-0 text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Specialty Dialog */}
      <Dialog
        open={specialtyDialog.open}
        onOpenChange={(open) => !open && setSpecialtyDialog({ open: false, data: null })}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{specialtyDialog.data ? "Chỉnh sửa chuyên môn" : "Thêm chuyên môn mới"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="specialty-name">Tên chuyên môn</Label>
              <Input
                id="specialty-name"
                value={specialtyDialog.data ? specialtyDialog.data.name : newSpecialty.name}
                onChange={(e) =>
                  specialtyDialog.data
                    ? setSpecialtyDialog({
                        ...specialtyDialog,
                        data: { ...specialtyDialog.data, name: e.target.value },
                      })
                    : setNewSpecialty({ ...newSpecialty, name: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSpecialtyDialog({ open: false, data: null })} className="mr-2">
              Hủy
            </Button>
            <Button
              onClick={specialtyDialog.data ? handleEditSpecialty : handleAddSpecialty}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={saving || (specialtyDialog.data ? !specialtyDialog.data.name : !newSpecialty.name)}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {specialtyDialog.data ? "Đang cập nhật..." : "Đang thêm..."}
                </>
              ) : specialtyDialog.data ? (
                "Cập nhật"
              ) : (
                "Thêm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Language Dialog */}
      <Dialog
        open={languageDialog.open}
        onOpenChange={(open) => !open && setLanguageDialog({ open: false, data: null })}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{languageDialog.data ? "Chỉnh sửa ngôn ngữ" : "Thêm ngôn ngữ mới"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="lang-name">Tên ngôn ngữ</Label>
              <Input
                id="lang-name"
                value={languageDialog.data ? languageDialog.data.name : newLanguage.name}
                onChange={(e) =>
                  languageDialog.data
                    ? setLanguageDialog({
                        ...languageDialog,
                        data: { ...languageDialog.data, name: e.target.value },
                      })
                    : setNewLanguage({ ...newLanguage, name: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLanguageDialog({ open: false, data: null })} className="mr-2">
              Hủy
            </Button>
            <Button
              onClick={languageDialog.data ? handleEditLanguage : handleAddLanguage}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={saving || (languageDialog.data ? !languageDialog.data.name : !newLanguage.name)}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {languageDialog.data ? "Đang cập nhật..." : "Đang thêm..."}
                </>
              ) : languageDialog.data ? (
                "Cập nhật"
              ) : (
                "Thêm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

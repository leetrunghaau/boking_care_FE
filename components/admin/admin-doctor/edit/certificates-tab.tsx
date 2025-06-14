"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Award, Plus, FileEdit, Trash2, Calendar, BookOpen, Loader2 } from "lucide-react"
import { format } from "date-fns"

interface CertificatesTabProps {
  certificates: any[]
  doctorId: number
  onUpdate: (certificates: any[]) => void
  onNotification: (type: "success" | "error", message: string) => void
}

export default function CertificatesTab({ certificates, doctorId, onUpdate, onNotification }: CertificatesTabProps) {
  const [certificatesList, setCertificatesList] = useState<any[]>(certificates)
  const [dialog, setDialog] = useState({ open: false, data: null as any | null })
  const [newCertificate, setNewCertificate] = useState<Omit<any, "id">>({
    title: "",
    publishedAt: "",
    journal: "",
    description: "",
  })
  const [saving, setSaving] = useState(false)

  const handleAddCertificate = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // In a real app, you would call your API here
      // const response = await fetch(`/api/doctors/${doctorId}/certificates`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newCertificate)
      // });
      // const data = await response.json();

      // Create new certificate with generated ID
      const newId = Math.max(0, ...certificatesList.map((c) => c.id)) + 1
      const certificateToAdd = { id: newId, ...newCertificate }

      // Update local state
      const updatedCertificates = [...certificatesList, certificateToAdd]
      setCertificatesList(updatedCertificates)

      // Update parent state
      onUpdate(updatedCertificates)
      onNotification("success", "Đã thêm chứng chỉ mới thành công")

      // Reset form and close dialog
      setDialog({ open: false, data: null })
      setNewCertificate({ title: "", publishedAt: "", journal: "", description: "" })
    } catch (error) {
      onNotification("error", "Không thể thêm chứng chỉ. Vui lòng thử lại sau.")
    } finally {
      setSaving(false)
    }
  }

  const handleEditCertificate = async () => {
    if (!dialog.data) return

    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // In a real app, you would call your API here
      // const response = await fetch(`/api/doctors/${doctorId}/certificates/${dialog.data.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dialog.data)
      // });

      // Update local state
      const updatedCertificates = certificatesList.map((cert) =>
        cert.id === dialog.data.id ? { ...dialog.data } : cert,
      )
      setCertificatesList(updatedCertificates)

      // Update parent state
      onUpdate(updatedCertificates)
      onNotification("success", "Đã cập nhật chứng chỉ thành công")

      // Close dialog
      setDialog({ open: false, data: null })
    } catch (error) {
      onNotification("error", "Không thể cập nhật chứng chỉ. Vui lòng thử lại sau.")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteCertificate = async (id: number) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, you would call your API here
      // await fetch(`/api/doctors/${doctorId}/certificates/${id}`, {
      //   method: 'DELETE'
      // });

      // Update local state
      const updatedCertificates = certificatesList.filter((cert) => cert.id !== id)
      setCertificatesList(updatedCertificates)

      // Update parent state
      onUpdate(updatedCertificates)
      onNotification("success", "Đã xóa chứng chỉ thành công")
    } catch (error) {
      onNotification("error", "Không thể xóa chứng chỉ. Vui lòng thử lại sau.")
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-t-lg flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-xl">
              <Award className="w-5 h-5 mr-2 text-amber-600" />
              Chứng chỉ và công trình nghiên cứu
            </CardTitle>
            <CardDescription>Các chứng chỉ và công trình nghiên cứu của bác sĩ</CardDescription>
          </div>
          <Button
            onClick={() => {
              setNewCertificate({ title: "", publishedAt: "", journal: "", description: "" })
              setDialog({ open: true, data: null })
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm chứng chỉ
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {certificatesList.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Chưa có chứng chỉ nào</p>
            </div>
          ) : (
            <div className="space-y-4">
              {certificatesList.map((cert) => (
                <Card key={cert.id} className="overflow-hidden">
                  <CardHeader className="bg-amber-50 py-3 px-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-medium">{cert.title}</CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDialog({ open: true, data: { ...cert } })}
                          className="h-8 w-8 p-0 text-amber-600"
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCertificate(cert.id)}
                          className="h-8 w-8 p-0 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-3 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Ngày công bố: {format(new Date(cert.publishedAt), "dd/MM/yyyy")}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          Tạp chí: {cert.journal}
                        </p>
                      </div>
                    </div>
                    {cert.description && <p className="mt-2 text-gray-700">{cert.description}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Certificate Dialog */}
      <Dialog open={dialog.open} onOpenChange={(open) => !open && setDialog({ open: false, data: null })}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{dialog.data ? "Chỉnh sửa chứng chỉ" : "Thêm chứng chỉ mới"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cert-title">Tên chứng chỉ</Label>
              <Input
                id="cert-title"
                value={dialog.data ? dialog.data.title : newCertificate.title}
                onChange={(e) =>
                  dialog.data
                    ? setDialog({
                        ...dialog,
                        data: { ...dialog.data, title: e.target.value },
                      })
                    : setNewCertificate({ ...newCertificate, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cert-date">Ngày công bố</Label>
              <Input
                id="cert-date"
                type="date"
                value={dialog.data ? dialog.data.publishedAt : newCertificate.publishedAt}
                onChange={(e) =>
                  dialog.data
                    ? setDialog({
                        ...dialog,
                        data: { ...dialog.data, publishedAt: e.target.value },
                      })
                    : setNewCertificate({ ...newCertificate, publishedAt: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cert-journal">Tạp chí</Label>
              <Input
                id="cert-journal"
                value={dialog.data ? dialog.data.journal : newCertificate.journal}
                onChange={(e) =>
                  dialog.data
                    ? setDialog({
                        ...dialog,
                        data: { ...dialog.data, journal: e.target.value },
                      })
                    : setNewCertificate({ ...newCertificate, journal: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cert-description">Mô tả</Label>
              <Textarea
                id="cert-description"
                value={dialog.data ? dialog.data.description : newCertificate.description}
                onChange={(e) =>
                  dialog.data
                    ? setDialog({
                        ...dialog,
                        data: { ...dialog.data, description: e.target.value },
                      })
                    : setNewCertificate({ ...newCertificate, description: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialog({ open: false, data: null })} className="mr-2">
              Hủy
            </Button>
            <Button
              onClick={dialog.data ? handleEditCertificate : handleAddCertificate}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={
                saving ||
                (dialog.data
                  ? !dialog.data.title || !dialog.data.publishedAt || !dialog.data.journal
                  : !newCertificate.title || !newCertificate.publishedAt || !newCertificate.journal)
              }
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {dialog.data ? "Đang cập nhật..." : "Đang thêm..."}
                </>
              ) : dialog.data ? (
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

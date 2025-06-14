"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getImageSrc } from "@/helper/url"
import { cn } from "@/lib/utils"
import { AlertCircle, Calendar, FileText, Mail, Phone, Trash2, Upload, User, Users } from "lucide-react"

interface Pops {
    form: any
    onChange: (fild: string, value: any )=> void
}

export const InfoCP = ({ form, onChange }:Pops) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    <User className="w-5 h-5 mr-2 text-teal-600" />
                    Thông tin cá nhân
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <Avatar className="w-24 h-24 mx-auto sm:mx-0">
                        <AvatarImage src={getImageSrc(form.img)} alt={form.name || "Bác sĩ mới"} />
                        <AvatarFallback className="text-lg">
                            {form.name ? form.name.charAt(0).toUpperCase() : "BS"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-3 text-center sm:text-left">
                        <Label className="text-sm font-medium">Ảnh đại diện</Label>
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <label htmlFor="avatar-upload" className="cursor-pointer">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Tải lên ảnh
                                </label>
                            </Button>
                            {form.img && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onChange("img", null)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Xóa
                                </Button>
                            )}
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                onChange={e => onChange("img", e.target.files?.[0])}
                                className="hidden"
                            />
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG (tối đa 2MB)</p>
                    </div>
                </div>

                {/* Basic Info Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Họ và tên <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            value={form?.name??""}
                            onChange={(e) => onChange("name", e.target.value)}
                            placeholder="VD: BS. Nguyễn Văn An"
                            className={cn(
                                "focus:ring-teal-500 focus:border-teal-500",
                            )}
                        />
                        {/* {errors.name && (
                            <p className="text-sm text-red-500 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.name}
                            </p>
                        )} */}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="gender">
                            Giới tính <span className="text-red-500">*</span>
                        </Label>
                        <Select value={form.gender} onValueChange={(value) => onChange("gender", value)}>
                            <SelectTrigger
                                className={cn("focus:ring-teal-500 focus:border-teal-500")}
                            >
                                <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                                        Nam
                                    </div>
                                </SelectItem>
                                <SelectItem value="female">
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-2 text-pink-500" />
                                        Nữ
                                    </div>
                                </SelectItem>
                                <SelectItem value="other">
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-2 text-gray-500" />
                                        Khác
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {/* {errors.gender && (
                            <p className="text-sm text-red-500 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.gender}
                            </p>
                        )} */}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                            <Phone className="w-4 h-4 mr-1 text-gray-500" />
                            Số điện thoại <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="phone"
                            value={form?.phone??""}
                            onChange={(e) => onChange("phone", e.target.value)}
                            placeholder="VD: 0973286451"
                            className={cn(
                                "focus:ring-teal-500 focus:border-teal-500",
                                // errors.phone && "border-red-500 focus:border-red-500 focus:ring-red-500",
                            )}
                        />
                        {/* {errors.phone && (
                            <p className="text-sm text-red-500 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.phone}
                            </p>
                        )} */}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                            <Mail className="w-4 h-4 mr-1 text-gray-500" />
                            Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={form?.email??""}
                            onChange={(e) => onChange("email", e.target.value)}
                            placeholder="VD: doctor@example.com"
                            className={cn(
                                "focus:ring-teal-500 focus:border-teal-500",
                                // errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500",
                            )}
                        />
                        {/* {errors.email && (
                            <p className="text-sm text-red-500 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.email}
                            </p>
                        )} */}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="dob" className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                        Ngày sinh <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="dob"
                        type="date"
                        value={form?.dob??""}
                        onChange={(e) => onChange("dob", e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                        min={new Date(new Date().getFullYear() - 100, 0, 1).toISOString().split("T")[0]}
                        className={cn(
                            "focus:ring-teal-500 focus:border-teal-500",
                            // errors.dob && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        )}
                    />
                    {/* {errors.dob && (
                        <p className="text-sm text-red-500 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.dob}
                        </p>
                    )} */}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="about" className="flex items-center">
                        <FileText className="w-4 h-4 mr-1 text-gray-500" />
                        Giới thiệu về bác sĩ <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="about"
                        value={form?.about??""}
                        onChange={(e) => onChange("about", e.target.value)}
                        placeholder="Viết giới thiệu về kinh nghiệm, chuyên môn và thành tích của bác sĩ..."
                        rows={4}
                        className={cn(
                            "focus:ring-teal-500 focus:border-teal-500",
                            // errors.about && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        )}
                    />
                    <div className="flex justify-between items-center">
                        {/* {errors.about && (
                            <p className="text-sm text-red-500 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.about}
                            </p>
                        )} */}
                        <p className="text-xs text-gray-500 ml-auto">{form.length}/50 ký tự tối thiểu</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
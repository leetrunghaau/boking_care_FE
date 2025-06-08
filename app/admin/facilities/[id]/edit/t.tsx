"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Clock,
  FileText,
  ImageIcon,
  Info,
  MapPin,
  Phone,
  Save,
  Stethoscope,
  Upload,
  Users,
  Plus,
  LinkIcon,
  FileCheck,
} from "lucide-react";

export default function EditFacilityPage() {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-semibold text-teal-600">
              Admin.Med+
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-teal-600 px-2 py-1 text-sm font-medium">
              Tổng quan
            </a>
            <a
              href="#"
              className="text-teal-600 border-b-2 border-teal-600 px-2 py-1 text-sm font-medium">
              Cơ sở y tế
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-teal-600 px-2 py-1 text-sm font-medium">
              Bác sĩ
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-teal-600 px-2 py-1 text-sm font-medium">
              Bệnh nhân
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-teal-600 px-2 py-1 text-sm font-medium">
              Hướng dẫn
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Lê Hữu (ADMIN)</span>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
              LH
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <a href="#" className="hover:text-teal-600">
              Tổng quan
            </a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-teal-600">
              Cơ sở y tế
            </a>
            <span className="mx-2">/</span>
            <span className="text-teal-600">Chỉnh sửa</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Chỉnh sửa cơ sở y tế
            </h1>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="basic"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <TabsList className="w-full flex p-0 bg-transparent border-b border-gray-200">
              <TabsTrigger
                value="basic"
                className="flex-1 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600">
                <Info className="w-4 h-4 mr-2" />
                Thông tin cơ bản
              </TabsTrigger>
              <TabsTrigger
                value="doctors"
                className="flex-1 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600">
                <Users className="w-4 h-4 mr-2" />
                Bác sĩ
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="flex-1 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600">
                <Stethoscope className="w-4 h-4 mr-2" />
                Dịch vụ & Chuyên khoa
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="flex-1 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600">
                <ImageIcon className="w-4 h-4 mr-2" />
                Hình ảnh
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-teal-600" />
                  Thông tin cơ bản
                </CardTitle>
                <CardDescription>Thông tin chính về cơ sở y tế</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="facility-name"
                      className="text-sm font-medium text-gray-700">
                      Tên cơ sở
                    </label>
                    <Input
                      id="facility-name"
                      placeholder="Nhập tên cơ sở y tế"
                      className="focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="operating-year"
                      className="text-sm font-medium text-gray-700">
                      Năm hoạt động
                    </label>
                    <Input
                      id="operating-year"
                      placeholder="2025"
                      type="number"
                      className="focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700">
                    Giới thiệu
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Mô tả về cơ sở y tế..."
                    rows={4}
                    className="focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700 flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-gray-500" />
                      Số điện thoại
                    </label>
                    <Input
                      id="phone"
                      placeholder="0123456789"
                      className="focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="license"
                      className="text-sm font-medium text-gray-700">
                      Giấy phép hoạt động
                    </label>
                    <Input
                      id="license"
                      placeholder="Số giấy phép"
                      className="focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                    Địa chỉ
                  </label>
                  <Input
                    id="address"
                    placeholder="Nhập địa chỉ đầy đủ"
                    className="focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="map-url"
                    className="text-sm font-medium text-gray-700 flex items-center">
                    <LinkIcon className="w-4 h-4 mr-1 text-gray-500" />
                    URL Google Maps
                  </label>
                  <Input
                    id="map-url"
                    placeholder="https://maps.google.com/..."
                    className="focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-teal-600" />
                  Ảnh bìa cơ sở
                </CardTitle>
                <CardDescription>
                  Tải lên hình ảnh đại diện cho cơ sở y tế
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-teal-600 hover:text-teal-500">
                        <span>Nhấp để tải lên</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">hoặc kéo thả</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG hoặc GIF (MAX. 800x400px)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-teal-600" />
                  Giờ hoạt động
                </CardTitle>
                <CardDescription>
                  Thiết lập thời gian hoạt động trong tuần
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                      <label className="text-sm font-medium text-gray-700">
                        Ngày
                      </label>
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                        <option>Thứ 2</option>
                        <option>Thứ 3</option>
                        <option>Thứ 4</option>
                        <option>Thứ 5</option>
                        <option>Thứ 6</option>
                        <option>Thứ 7</option>
                        <option>Chủ nhật</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <label className="text-sm font-medium text-gray-700">
                        Giờ mở cửa
                      </label>
                      <Input
                        type="time"
                        defaultValue="08:00"
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="text-sm font-medium text-gray-700">
                        Giờ đóng cửa
                      </label>
                      <Input
                        type="time"
                        defaultValue="17:00"
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-3 flex items-end">
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700">
                        Xóa
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-teal-300 text-teal-600 hover:bg-teal-50">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm giờ hoạt động
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="w-5 h-5 mr-2 text-teal-600" />
                  Danh sách bác sĩ
                </CardTitle>
                <CardDescription>
                  Quản lý đội ngũ bác sĩ làm việc tại cơ sở
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Đội ngũ bác sĩ
                </h2>
                <p className="text-gray-600 max-w-md mb-6">
                  Quản lý đội ngũ bác sĩ làm việc tại cơ sở này. Thêm thông tin
                  chi tiết về chuyên môn và lịch làm việc.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Thêm bác sĩ
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Stethoscope className="w-5 h-5 mr-2 text-teal-600" />
                  Dịch vụ & Chuyên khoa
                </CardTitle>
                <CardDescription>
                  Quản lý các dịch vụ y tế và chuyên khoa
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                  <Stethoscope className="w-10 h-10 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Dịch vụ & Chuyên khoa
                </h2>
                <p className="text-gray-600 max-w-md mb-6">
                  Quản lý các dịch vụ y tế và chuyên khoa được cung cấp tại cơ
                  sở này. Thêm, sửa hoặc xóa các dịch vụ.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Bắt đầu thiết lập
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-teal-600" />
                  Thư viện hình ảnh
                </CardTitle>
                <CardDescription>
                  Quản lý bộ sưu tập hình ảnh của cơ sở y tế
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                  <ImageIcon className="w-10 h-10 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Thư viện hình ảnh
                </h2>
                <p className="text-gray-600 max-w-md mb-6">
                  Quản lý bộ sưu tập hình ảnh của cơ sở y tế. Tải lên hình ảnh
                  chất lượng cao để giới thiệu cơ sở.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Tải lên hình ảnh
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-teal-400" />
                <span className="text-xl font-semibold text-teal-400">
                  Med+
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Nền tảng đặt lịch khám bệnh và chăm sóc sức khỏe toàn diện hàng
                đầu Việt Nam
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">YouTube</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Về Med+</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Tin tức
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Câu hỏi thường gặp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Dành cho bệnh nhân</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Cơ sở y tế
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Bác sĩ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Chuyên khoa
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Gói khám
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Hướng dẫn đặt lịch
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" />
                  <span>
                    61, Võ Văn Ngân, p. Linh Chiểu, tp. Thủ Đức, tp. HCM
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-gray-500" />
                  <span>036 701 6872</span>
                </li>
                <li className="flex items-center">
                  <FileCheck className="w-5 h-5 mr-2 text-gray-500" />
                  <span>leetrunghau@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2025 Med+. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

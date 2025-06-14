"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CheckCheck, Languages, Plus, TextCursorInput, X } from "lucide-react"
import { useState } from "react"


interface Pops {
    lang: any[],
    onChange: (value: any[]) => void
}

export const LanguagesCP = ({ lang, onChange }: Pops) => {
    const [newLang, setNewLang] = useState<string>("")
    const addLang = () => {
        onChange([...lang, { id: -new Date, name: newLang }])
        setNewLang('')
    }
    const subLang = (id: number) => {
        onChange(lang.filter(i => i.id != id))
    }
    return (
        <Card>
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="text-lg flex items-center text-gray-800">
                    <Languages className="w-5 h-5 mr-2 text-green-600" />
                    Ngôn ngữ
                </CardTitle>
                <CardDescription className="text-gray-600">Các ngôn ngữ bác sĩ có thể sử dụng</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <div className="flex space-x-2">

                    <div className="relative flex-1">
                        <TextCursorInput className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Nhập kỹ năng mới..."
                            value={newLang}
                            onChange={(e) => setNewLang(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && newLang.trim() && addLang()}
                            className="h-10 px-10"
                        />
                        {newLang.trim() &&
                            <CheckCheck
                                onClick={addLang}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-700 w-4 h-4 cursor-pointer"
                            />
                        }

                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Danh sách ngôn ngữ ({lang.length})
                    </h3>

                    {lang.length === 0 ? (
                        <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                            <Languages className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">Chưa có ngôn ngữ nào</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {lang.map((language) => (
                                <div
                                    key={language.id}
                                    className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                                >
                                    <div>
                                        <div className="font-medium text-green-700">{language.name}</div>
                                    </div>
                                    <button
                                        onClick={() => subLang(language.id)}
                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
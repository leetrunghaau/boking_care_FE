"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Award, CheckCheck, Languages, Plus, TextCursorInput, X } from "lucide-react"
import { useState } from "react"
import { Badge } from '@/components/ui/badge';


interface Pops {
    skills: any[],
    onChange: (value: any[]) => void
}

export const SkillCP = ({ skills, onChange }: Pops) => {
    const [newSkill, setNewSkill] = useState<string>("")
    const addSkill = () => {
        onChange([...skills, { id: -new Date, name: newSkill }])
        setNewSkill('')
    }
    const subSkill = (id: number) => {
        onChange(skills.filter(i => i.id != id))
    }
    return (
        <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="text-lg flex items-center text-gray-800">
                    <Award className="w-5 h-5 mr-2 text-blue-600" />
                    Kỹ năng chuyên môn
                </CardTitle>
                <CardDescription className="text-gray-600">Các kỹ năng và chuyên môn của bác sĩ</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <div className="flex space-x-2">
                    <div className="relative flex-1">
                        <TextCursorInput className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Nhập kỹ năng mới..."
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && newSkill.trim() && addSkill()}
                            className="h-10 px-10"
                        />
                        {newSkill.trim() &&
                            <CheckCheck
                                onClick={addSkill}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 w-4 h-4 cursor-pointer"
                            />
                        }
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Danh sách kỹ năng ({skills.length})</h3>

                    {skills.length === 0 ? (
                        <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                            <Award className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">Chưa có kỹ năng nào</p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <Badge
                                    key={skill.id}
                                    variant="outline"
                                    className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-2"
                                >
                                    {skill.name}
                                    <button
                                        onClick={() => subSkill(skill.id)}
                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
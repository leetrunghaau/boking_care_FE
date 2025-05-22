"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign } from "lucide-react"

interface ScheduleInfoProps {
  price: string
  duration: string
  breakTime: boolean
  notes: string
  onPriceChange: (value: string) => void
  onDurationChange: (value: string) => void
  onBreakTimeChange: (value: boolean) => void
  onNotesChange: (value: string) => void
}

export function ScheduleInfo({
  price,
  duration,
  breakTime,
  notes,
  onPriceChange,
  onDurationChange,
  onBreakTimeChange,
  onNotesChange,
}: ScheduleInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-green-600" />
          Thông tin khám
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="price">Giá khám (VNĐ)</Label>
          <Input
            id="price"
            type="number"
            placeholder="Nhập giá khám, ví dụ: 300000"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Thời gian khám (phút)</Label>
          <Select value={duration} onValueChange={onDurationChange}>
            <SelectTrigger id="duration">
              <SelectValue placeholder="Chọn thời gian khám" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 phút</SelectItem>
              <SelectItem value="30">30 phút</SelectItem>
              <SelectItem value="45">45 phút</SelectItem>
              <SelectItem value="60">60 phút</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="break-time">Nghỉ trưa (11:30 - 13:30)</Label>
            <Switch id="break-time" checked={breakTime} onCheckedChange={onBreakTimeChange} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Ghi chú</Label>
          <Textarea
            id="notes"
            placeholder="Nhập ghi chú về lịch làm việc"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}

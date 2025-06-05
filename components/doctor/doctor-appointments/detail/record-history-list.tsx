"use client";

import { useEffect, useState } from "react";
import { RecordHistoryCard } from "./record-history";
import http from "@/helper/axios";

interface RecordHistory {
  id: string;
  recordDate: string;
  doctorName: string;
  diagnosis: string;
  symptoms: string;
  // treatment?: string;
  notes: string;
  bloodPressure: string;
  temperature: string;
  pulse: string;
  weight: string;
  bmi: string;
}

interface RecordHistoryListProps {
  bookingId: number | string | null;
}

export function RecordHistoryList({ bookingId }: RecordHistoryListProps) {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecordHistory = async () => {
      try {
        setLoading(true);
        const res = await http.get<any>(
          `/doctor-appointment/patient/history/${bookingId}`
        );
        console.log("Fetched record history", res);
        if (res) {
          setRecords(res);
        }
      } catch (err) {
        console.error("Failed to fetch record history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecordHistory();
  }, [bookingId]);

  if (!records || records.length === 0) {
    return (
      <p className="text-sm text-slate-500">Không có lịch sử khám bệnh.</p>
    );
  }

  return (
    <div className="space-y-6">
      {records.map((record) => (
        <RecordHistoryCard key={record.id} record={record} />
      ))}
    </div>
  );
}

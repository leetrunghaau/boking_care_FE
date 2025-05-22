"use client"

import * as React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

// Chart container component
const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("h-full w-full", className)} {...props} />
))
Chart.displayName = "Chart"

// Chart tooltip component
const ChartTooltip = React.forwardRef<React.ElementRef<typeof Tooltip>, React.ComponentPropsWithoutRef<typeof Tooltip>>(
  ({ className, ...props }, ref) => (
    <Tooltip
      ref={ref}
      content={({ active, payload }) => {
        if (active && payload && payload.length) {
          return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
              <div className="grid grid-cols-2 gap-2">
                {payload.map((entry) => (
                  <div key={entry.name} className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{entry.name}</span>
                    <span className="font-bold text-xs">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        }
        return null
      }}
      {...props}
    />
  ),
)
ChartTooltip.displayName = "ChartTooltip"

// Bar Chart component
const BarChart = React.forwardRef<
  React.ElementRef<typeof RechartsBarChart>,
  React.ComponentPropsWithoutRef<typeof RechartsBarChart> & {
    data: any[]
    index: string
    categories: string[]
    colors?: string[]
    valueFormatter?: (value: number) => string
    yAxisWidth?: number
  }
>(
  (
    {
      data,
      index,
      categories,
      colors = ["#2563eb", "#f97316", "#8b5cf6", "#06b6d4"],
      valueFormatter = (value: number) => `${value}`,
      yAxisWidth = 56,
      className,
      ...props
    },
    ref,
  ) => (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        ref={ref}
        data={data}
        className={cn("", className)}
        margin={{
          top: 16,
          right: 16,
          bottom: 16,
          left: 16,
        }}
        {...props}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={index} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={8} />
        <YAxis
          width={yAxisWidth}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={8}
          tickFormatter={valueFormatter}
        />
        <ChartTooltip />
        <Legend
          verticalAlign="top"
          height={40}
          content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <div className="flex items-center justify-center gap-4">
                  {payload.map((entry, index) => (
                    <div key={`item-${index}`} className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-xs text-muted-foreground">{entry.value}</span>
                    </div>
                  ))}
                </div>
              )
            }
            return null
          }}
        />
        {categories.map((category, index) => (
          <Bar key={category} dataKey={category} fill={colors[index % colors.length]} radius={[4, 4, 0, 0]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  ),
)
BarChart.displayName = "BarChart"

// Line Chart component
const LineChart = React.forwardRef<
  React.ElementRef<typeof RechartsLineChart>,
  React.ComponentPropsWithoutRef<typeof RechartsLineChart> & {
    data: any[]
    index: string
    categories: string[]
    colors?: string[]
    valueFormatter?: (value: number) => string
    yAxisWidth?: number
  }
>(
  (
    {
      data,
      index,
      categories,
      colors = ["#2563eb", "#f97316", "#8b5cf6", "#06b6d4"],
      valueFormatter = (value: number) => `${value}`,
      yAxisWidth = 56,
      className,
      ...props
    },
    ref,
  ) => (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        ref={ref}
        data={data}
        className={cn("", className)}
        margin={{
          top: 16,
          right: 16,
          bottom: 16,
          left: 16,
        }}
        {...props}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={index} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={8} />
        <YAxis
          width={yAxisWidth}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={8}
          tickFormatter={valueFormatter}
        />
        <ChartTooltip />
        <Legend
          verticalAlign="top"
          height={40}
          content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <div className="flex items-center justify-center gap-4">
                  {payload.map((entry, index) => (
                    <div key={`item-${index}`} className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-xs text-muted-foreground">{entry.value}</span>
                    </div>
                  ))}
                </div>
              )
            }
            return null
          }}
        />
        {categories.map((category, index) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  ),
)
LineChart.displayName = "LineChart"

// Pie Chart component
const PieChart = React.forwardRef<
  React.ElementRef<typeof RechartsPieChart>,
  React.ComponentPropsWithoutRef<typeof RechartsPieChart> & {
    data: any[]
    category: string
    index: string
    colors?: string[]
    valueFormatter?: (value: number) => string
  }
>(
  (
    {
      data,
      category,
      index,
      colors = ["#2563eb", "#f97316", "#8b5cf6", "#06b6d4", "#10b981", "#ef4444", "#f59e0b"],
      valueFormatter = (value: number) => `${value}`,
      className,
      ...props
    },
    ref,
  ) => (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart ref={ref} className={cn("", className)} {...props}>
        <Pie
          data={data}
          dataKey={category}
          nameKey={index}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <ChartTooltip />
        <Legend
          verticalAlign="bottom"
          height={40}
          content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {payload.map((entry, index) => (
                    <div key={`item-${index}`} className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-xs text-muted-foreground">{entry.value}</span>
                    </div>
                  ))}
                </div>
              )
            }
            return null
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  ),
)
PieChart.displayName = "PieChart"

export { Chart, ChartTooltip, BarChart, LineChart, PieChart }

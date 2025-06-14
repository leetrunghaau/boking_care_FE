import { X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import type { ReactNode } from "react"

interface Props {
    list: any[]
    value?: any
    onChange: (value: any) => void
    placeholder?: string
    label?: string
    keyProp?: string
    renderItem?: (item: any) => ReactNode
}

export default function GenericSearchSelect({
    list,
    value,
    onChange,
    placeholder = "Chọn...",
    label = "name",
    keyProp = "id",
    renderItem,
}: Props) {
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const selectedItem = list.find((item) => item[keyProp] === value)
    const displayLabel = (item: any) => item?.[label] ?? ""

    const filtered = list.filter((item) =>
        displayLabel(item).toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        setSearch(displayLabel(selectedItem))
    }, [value, selectedItem])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false)
                setSearch(displayLabel(selectedItem))
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [selectedItem, displayLabel])

    return (
        <div ref={wrapperRef} className="relative w-full max-w-md">
            <div className="relative">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        const val = e.target.value
                        setSearch(val)
                        setOpen(true)
                        if (val.trim() === "") {
                            onChange(null)
                        }
                    }}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {search && (
                    <X
                        onClick={() => {
                            setSearch("");
                            onChange(null);
                            setOpen(false);
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-700 w-4 h-4 cursor-pointer"
                        role="button"
                        aria-label="Clear search"
                    />
                )}
            </div>
            {open && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                    {filtered.length === 0 ? (
                        <li className="p-2 text-gray-500">Không tìm thấy kết quả.</li>
                    ) : (
                        filtered.map((item, i) => (
                            <li
                                key={i}
                                onClick={() => {
                                    onChange(item[keyProp])
                                    setSearch(displayLabel(item))
                                    setOpen(false)
                                }}
                                className={`cursor-pointer px-4 py-2 hover:bg-teal-100 flex items-center gap-2 ${item[keyProp] === value ? "bg-teal-50" : ""
                                    }`}
                            >
                                {renderItem ? renderItem(item) : displayLabel(item)}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    )
}

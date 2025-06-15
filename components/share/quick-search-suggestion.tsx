import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";

interface QuickSuggestProps<T> {
    list: any[];
    value?: string
    onInputChange: (value: string) => void;
    onSelectItem: (value: string) => void;
    renderItem: (item: any) => ReactNode;
    getValue: (item: any) => string;
    placeholder?: string;
  }

export default function QuickSuggest<T>({
    value = "",
    list,
    onInputChange,
    onSelectItem,
    renderItem,
    getValue,
    placeholder = "Tìm kiếm...",
}: QuickSuggestProps<T>) {
    // const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (list.length > 0 && value.trim() !== "") {
            setOpen(true);
        }
    }, [list]);

    return (
        <div ref={wrapperRef} className="relative w-full max-w-md">
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        const val = e.target.value;
                        setOpen(true);
                        onInputChange(val); 
                      }}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {value && (
                    <X
                        onClick={() => {
                            onSelectItem("");
                            setOpen(false);
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-700 w-4 h-4 cursor-pointer"
                        role="button"
                        aria-label="Clear input"
                    />
                )}
            </div>

            {open && list.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                    {list.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                const value = getValue(item);
                                onSelectItem(value);
                                setOpen(false);
                              }}
                            className="cursor-pointer px-4 py-2 hover:bg-teal-100"
                        >
                            {renderItem(item)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// components/ui/sub-header.tsx
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Breadcrumb {
  label: string
  href?: string
}

interface SubHeaderProps {
  title: string
  breadcrumbs?: Breadcrumb[]
}

export default function SubHeader({ title, breadcrumbs = [] }: SubHeaderProps) {
  return (
    <div className="relative mx-auto w-11/12 bg-slate-50 py-12 md:py-20 px-4 md:px-16 overflow-hidden min-h-[330px]  ">
      {/* Decorative images */}
      <img
        src="/sub-header/subheader-tr.png"
        alt="top right"
        className="absolute top-0 right-[-100px] w-1/2 object-cover"
      />
      <img
        src="/sub-header/subheader-br.png"
        alt="bottom right"
        className="absolute bottom-0 right-0 w-1/3 object-fill"
      />
      <img
        src="/sub-header/subheader-bl.png"
        alt="bottom left"
        className="absolute bottom-0 left-0 w-1/3"
      />

      {/* Content */}
      <div className="relative z-10 container text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{title}</h1>
        {breadcrumbs.length > 0 && (
          <div className="mt-3 flex justify-center">
            <nav className="text-sm text-muted-foreground flex flex-wrap items-center gap-x-1">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-x-1">
                  {index > 0 && <ChevronRight className="h-4 w-4" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:underline text-muted-foreground">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
        
      </div>
    </div>
  )
}

import appConfig from "@/config/config"
import { ipconfig } from "./ip"

export function getFullURL(uri: string | null | undefined): string {
    if (!uri || uri == "") return "/placeholder.svg"
    return `${ipconfig.BE_CDN}${uri}`
}
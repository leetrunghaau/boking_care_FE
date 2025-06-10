import appConfig from "@/config/config"

export function getFullURL(uri: string | null | undefined): string  {
    if (!uri) return "/placeholder.svg"
    return `${appConfig.CDN_URL}${uri}`
}
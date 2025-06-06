import appConfig from "@/config/config"

export function getFullURL(uri: string | null | undefined): string | null {
    if (!uri) return null
    return `${appConfig.CDN_URL}${uri}`
}

interface AppConfig {
  BASE_URL: string;
  API_VERSION: string;
  API_KEY: string;
  CDN_URL: string;
  APP_NAME: string;
}

const appConfig: AppConfig = {
  BASE_URL: `${process.env.NEXT_PUBLIC_API}`,
  API_VERSION: `${process.env.NEXT_PUBLIC_API_VERSION}`,
  API_KEY: `${process.env.NEXT_PUBLIC_API_KEY}`,
  CDN_URL: `${process.env.NEXT_PUBLIC_CDN_URL}`,
  APP_NAME: `${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default appConfig;
type configType = {
  API_URL: string;
};
const CONFIG: Record<keyof configType, string | number> = {
  API_URL: "https://bookclouder-be-dejc.vercel.app",
};

export default function getConfig(config: keyof configType): string | number {
  return CONFIG[config];
}

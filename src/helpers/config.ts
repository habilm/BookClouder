type configType = {
  API_URL: string;
};
const CONFIG: Record<keyof configType, string | number> = {
  API_URL: "http://localhost:3000",
  // API_URL: "https://bookclouder-api.finepher.com",
};

export default function getConfig(config: keyof configType): string | number {
  return CONFIG[config];
}

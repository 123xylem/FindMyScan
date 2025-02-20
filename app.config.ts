import "dotenv/config";

export default {
  name: "findmyscan",
  slug: "findmyscan",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "findmyscan",
  extra: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
  plugins: ["expo-router"],
};

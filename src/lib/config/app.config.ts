export type AppEnvironment = "development" | "production" | "test";

const nodeEnv = process.env.NODE_ENV;

const environment: AppEnvironment =
    nodeEnv === "production" || nodeEnv === "test" ? nodeEnv : "development";

export const APP_CONFIG = {
    environment,

    isDevelopment: environment === "development",
    isProduction: environment === "production",
    isTest: environment === "test",

    appBaseUrl: process.env.APP_BASE_URL ?? "",
} as const;

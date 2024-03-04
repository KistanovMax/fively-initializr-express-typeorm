declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    ACCESS_TOKEN_SECRET: string;
    FRONTEND_ENDPOINT: string;
  }
}

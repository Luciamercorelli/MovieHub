import dotenv from "dotenv";

type TConfig = {
  [key: string]: EnvironmentConfig;
};

type EnvironmentConfig = {
  app: AppConfig;
  db: DbConfig;
};

type AppConfig = {
  PORT: string | number;
};

type DbConfig = {
  URI: string;
};

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

const ENV = process.env.NODE_ENV ?? "development";

const CONFIG: TConfig = {
  development: {
    app: {
      PORT: process.env.PORT || 4001,
    },
    db: {
      URI:
        process.env.MONGODB_URI ||
        "mongodb+srv://luciamercorelli:clprlhYem7cCyryf@cluster0.jpgopem.mongodb.net/",
    },
  },
  production: {
    app: {
      PORT: process.env.PORT || 8081,
    },
    db: {
      URI:
        process.env.MONGODB_URI ||
        "mongodb+srv://luciamercorelli:clprlhYem7cCyryf@cluster0.jpgopem.mongodb.net/",
    },
  },
};

export default CONFIG[ENV];

const dotenv = require("dotenv")

let ENV_FILE_NAME = ""
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production"
    break
  case "staging":
    ENV_FILE_NAME = ".env.staging"
    break
  case "test":
    ENV_FILE_NAME = ".env.test"
    break
  case "development":
  default:
    ENV_FILE_NAME = ".env"
    break
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME })
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000"

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:3000"

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-store"

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379"

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
]

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    database_extra: { ssl: { rejectUnauthorized: false } },
  },
  plugins,
  featureFlags: {
    tax_inclusive_pricing: true,
  },
  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: REDIS_URL,
      },
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: REDIS_URL,
      },
    },
  },
  currencies: ["inr"],
  defaultCurrency: "inr"
} 
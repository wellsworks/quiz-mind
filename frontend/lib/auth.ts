import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const backend = process.env.BACKEND_URL || "";
export const DB_URL = process.env.BETTER_AUTH_DB;

export const auth = betterAuth({
    database: new Pool({
        connectionString: DB_URL,
    }),
    emailAndPassword: {
        enabled: true,
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60,
            strategy: "jwt",
            secret: process.env.BETTER_AUTH_SECRET,
            refreshCache: {
                updateAge: 60
            }
        },
    },
    account: {
        storeStateStrategy: "cookie",
        storeAccountCookie: true,
    },
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        }
    },
    trustedOrigins: [
        backend,
    ],
});


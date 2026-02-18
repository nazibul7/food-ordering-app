import http from "k6/http"
import { config } from "./config.js"

// Follow https://auth0.com/docs/get-started/onboarding/self-service-m2m

export function getM2MToken() {
    const res = http.post(`https://${config.AUTH0_DOMAIN}/oauth/token`,
        JSON.stringify({
            client_id: `${config.AUTH0_CLIENT_ID}`,
            client_secret: `${config.AUTH0_CLIENT_SECRET}`,
            audience: `${config.AUTH0_AUDIENCE}`,
            grant_type: "client_credentials",
        }),
        { headers: { 'content-type': 'application/json' } },
    )

    return res.json("access_token")
}
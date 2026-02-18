// user-profile.test.js
import http from "k6/http";
import { check, sleep } from "k6";
import { config } from "../helpers/config.js";
import { getM2MToken } from "../helpers/auth.js";

export { options } from "../helpers/baseline.config.js";

export function setup() {
    const token = getM2MToken();
    return { token };
}

export default function (data) {
    const { token } = data;

    // 1. Create user (if doesn't exist)
    let res = http.post(
        `${config.API_BASE_URL}/api/v1/user/create`,
        JSON.stringify({
            auth0Id: "auth0|baseline-user",
            email: "baseline.user@test.io",
        }),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    check(res, { "user created/exists": (r) => r.status === 200 || r.status === 201 });
    sleep(1);

    // 2. Get user profile
    res = http.get(`${config.API_BASE_URL}/api/v1/user/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    check(res, { 
        "profile fetched": (r) => r.status === 200,
        "has user data": (r) => r.json().email !== undefined
    });
    sleep(1);

    // 3. Update user profile
    res = http.put(
        `${config.API_BASE_URL}/api/v1/user/`,
        JSON.stringify({
            name: "Baseline User",
            addressLine1: "123 Test St",
            city: "Test City",
            country: "Test Country",
        }),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    check(res, { "profile updated": (r) => r.status === 200 });
}
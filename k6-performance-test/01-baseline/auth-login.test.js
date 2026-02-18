import http from "k6/http";
import { check } from "k6";
import { config } from "../helpers/config.js";
import { baselineUser } from "../helpers/baseline.data.js";
import { getM2MToken } from "../helpers/auth.js";

export { options } from "../helpers/baseline.config.js"

export function setup() {
    const token = getM2MToken();
    return { token };
}


export default function (data) {
    const res = http.post(`${config.API_BASE_URL}/api/v1/user/create`,
        JSON.stringify(baselineUser),
        {
            headers: {
                Authorization: `Bearer ${data.token}`,
                "Content-Type": 'application/json'
            }
        }
    )
    check(res, {
        "user exists or created": (r) =>
            r.status === 200 || r.status === 201
    })
}
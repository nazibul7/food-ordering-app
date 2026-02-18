import http from "k6/http";
import { check, sleep } from "k6";
import { config } from "../helpers/config.js";
import { baselineCheckout, baselineUser } from "../helpers/baseline.data.js";
import { getM2MToken } from "../helpers/auth.js";

export { options } from "../helpers/baseline.config.js"

export function setup() {
    const token = getM2MToken();
    return { token };
}

export default function (data) {
    // Search resturant based on city
    let res = http.get(`${config.API_BASE_URL}/api/resturant/search/kolkata?searchQuery=&selectedCusine=&sortOptions=bestMatch&page=1`)
    check(res, { "search ok": (r) => r.status === 200 });
    sleep(1);

    
    const body = res.json();
    const restaurants = body.data;

    if (!restaurants.length) return;

    // Pick the first restaurant
    const resturantId = restaurants[0]._id;

    res = http.get(`${config.API_BASE_URL}/api/resturant/${resturantId}`)

    check(res, { "fetched restaurant": (r) => r.status === 200 });
    sleep(1);

    // login for checkout
    res = http.post(`${config.API_BASE_URL}/api/v1/user/create`,
        JSON.stringify(baselineUser), {
        headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": 'application/json'
        }
    });
    
    check(res, { "user exists or created": (r) => r.status === 200 || r.status === 201 });

    // placing order & payment
    res = http.post(`${config.API_BASE_URL}/api/order/checkout/create-checkout-session`,
        JSON.stringify(baselineCheckout),
        {
            // method: "POST",This is fetch syntax not k6
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            },
            // body: JSON.stringify(baselineCheckout), This is fetch syntax not k6
        }
    );
    check(res, { "checkout order": (r) => r.status === 200 });
    sleep(1);

    // order status
    const status = http.get(`${config.API_BASE_URL}/api/order`, {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    });
    check(status, { "order status ok": (r) => r.status === 200 });
}
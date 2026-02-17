// 01-baseline/browse-resturants.test.js
import http from "k6/http";
import { check, sleep } from "k6";
import { config } from "../helpers/config.js";

export { options } from "../helpers/baseline.config.js";

const CITIES = ["kolkata", "london", "manchester"];

export default function () {
    // Pick random city
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    
    // 1. Search restaurants
    let res = http.get(
        `${config.API_BASE_URL}/api/resturant/search/${city}?page=1`
    );
    
    check(res, { 
        "search ok": (r) => r.status === 200,
        "has restaurants": (r) => r.json().data && r.json().data.length > 0
    });
    sleep(1);

    // 2. Get restaurant details
    const restaurants = res.json().data;
    if (restaurants && restaurants.length > 0) {
        const restaurantId = restaurants[0]._id;
        res = http.get(`${config.API_BASE_URL}/api/resturant/${restaurantId}`);
        check(res, { "restaurant detail ok": (r) => r.status === 200 });
        sleep(1);
    }
}

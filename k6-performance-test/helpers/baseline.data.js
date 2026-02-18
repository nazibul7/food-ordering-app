// helpers/baseline.data.js

/**
 * Baseline Test Data
 *
 * Rules:
 * - Deterministic
 * - Stable
 * - Reusable across baseline tests
 * - Represents ONE known user
 */

export const baselineUser = {
    auth0Id: "auth0|baseline-user",
    email: "baseline.user@test.io",
};

export const baselineCheckout = {
    cartItems: [
        {
            menuItemId: "672a496552b8d7fc5e967795",
            name: "Pizza",
            quantity: 2,
        },
    ],
    resturantId: "672a496552b8d7fc5e967794",
    deliveryDetails: {
        email: "baseline.user@test.io",
        name: "Test User",
        addressLine1: "New Town, Kolkata",
        city: "Kolkata",
        country: "India",
    },
};

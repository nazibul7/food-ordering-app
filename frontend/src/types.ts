export type User = {
    _id: string
    email: string
    name: string
    addressLine1: string
    country: string
    city: string
}


export type MenuItem = {
    _id: string
    name: string
    price: number
}
export type Resturant = {
    _id: string
    user: string
    resturantName: string
    city: string
    country: string
    deliveryPrice: number
    estimatedDeliveryTime: number
    cusines: string[]
    menuItems: MenuItem[]
    imageUrl: string
    lastUpdated: string
}

export type ResturantSearchResponse = {
    data: Resturant[]
    pagination: {
        total: number
        page: number
        pages: number
    }
}

export type TCartItem = {
    _id: string
    name: string
    price: number
    quantity: number
}

export type TMenuItem={
    menuItem:MenuItem
}
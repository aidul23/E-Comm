export interface SignUp {
    name: string,
    email: string,
    password: string
}

export interface LogIn {
    email: string,
    password: string
}

export interface Product {
    name: string,
    price: string,
    color: string,
    category: string,
    description: string,
    image: string,
    id: number
}
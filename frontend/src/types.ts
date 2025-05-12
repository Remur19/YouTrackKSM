export interface Task {
    id: number;
    category_id: number;
    title: string;
    description: string;
    done: boolean;
}

export interface Category {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}
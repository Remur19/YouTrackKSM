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
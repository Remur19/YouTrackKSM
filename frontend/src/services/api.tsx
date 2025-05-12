import {type Task, type User} from '../types';
import { type Category } from '../types';

const BASE_URL = 'http://localhost:8080';

// --- Aufgaben (Tasks) ---

export async function getAllTasks(userId: number): Promise<Task[]> {
    try {
        const response = await fetch(`${BASE_URL}/tasks/${userId}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Fehler beim Abrufen der Aufgaben: ${response.statusText}`);
        }
        const data = await response.json();
        return data as Task[];
    } catch (error) {
        console.error('Fehler bei getAllTasks:', error);
        throw error;
    }
}

export async function createTask(task: Task): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Erstellen: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fehler bei createTask:', error);
        throw error;
    }
}

export async function editTask(task: Task): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/user/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Aktualisieren: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fehler bei editTask:', error);
        throw error;
    }
}

export async function deleteTask(id: string): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Löschen: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fehler bei deleteTask:', error);
        throw error;
    }
}

// --- Kategorien (Categories) ---

export async function getAllCategories(userId: number): Promise<Category[]> { //Niklas
    try {
        const response = await fetch(`${BASE_URL}/categories/${userId}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Fehler beim Abrufen der Kategorien: ${response.statusText}`);
        }
        const data = await response.json();
        return data as Category[];
    } catch (error) {
        console.error('Fehler bei getAllCategories:', error);
        throw error;
    }
}

export async function createCategory(category: Category): Promise<void> {// Leo
    try {
        const response = await fetch(`${BASE_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Erstellen: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fehler bei createCategory:', error);
        throw error;
    }
}

export async function editCategory(category: Category): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/categories/${category.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Aktualisieren: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fehler bei editCategory:', error);
        throw error;
    }
}

export async function deleteCategory(id: string): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/categories/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Löschen: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fehler bei deleteCategory:', error);
        throw error;
    }
}


export async function createUser(user:Omit<User, 'id'>): Promise<User> {
    console.log(JSON.stringify(user));

    const response = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error(`Fehler beim Erstellen des Nutzers: ${response.statusText}`);
    }

    const id: number = await response.json(); // direkt die ID als Zahl
    const fullUser: User = { ...user, id };

    return fullUser;
}

export async function getUser(id: number): Promise<User> {
    const response = await fetch(`${BASE_URL}/user/${id}`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error(`Fehler beim Abrufen des Nutzers: ${response.statusText}`);
    }

    return await response.json();
}

export async function updateUser(user: User): Promise<void> {
    console.log(JSON.stringify(user));
    const response = await fetch(`${BASE_URL}/user/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error(`Fehler beim Aktualisieren des Nutzers: ${response.statusText}`);
    }
}

export async function deleteUser(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/user/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Fehler beim Löschen des Nutzers: ${response.statusText}`);
    }
}


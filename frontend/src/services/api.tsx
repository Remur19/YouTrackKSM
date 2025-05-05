import {type Task} from '../types';
import type {Category} from '../types';
import {useFormState} from "react-dom";
//Aufgabe ändern

export async function editTask(task: Task): Promise<void> {
    try {
        const response = await fetch(`editpath`, { //todo: import Backend Path
            method: 'PUT', // oder 'PATCH', je nach API
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Aktualisieren: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fehler bei editTask:', error);
        throw error;
    }
}

export async function editCategory(category: Category): Promise<void> {
    try {
        const response = await fetch(`editpath`, { //todo: import Backend Path
            method: 'PUT', // oder 'PATCH', je nach API
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Aktualisieren: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fehler bei editTask:', error);
        throw error;
    }
}

export async function getAllTasks(): Promise<Task[]> {
    try {
        const response = await fetch(`AllPath`, { //todo: import Backend Path
            method: 'GET', // oder 'PATCH', je nach API
        });
        if (!response.ok) {
            throw new Error(`Fehler beim Aktualisieren: ${response.statusText}`);
        }
        const data = await response.json();
        return data as Task[];
    } catch (error) {
        console.error('Fehler bei getAllTask:', error);
        throw error;
    }
}

export async function getAllCategories(): Promise<Category[]> {
    try {
        const response = await fetch(`AllCatPath`, { //todo: import Backend Path
            method: 'GET', // oder 'PATCH', je nach API
        });
        if (!response.ok) {
            throw new Error(`Fehler beim Aktualisieren: ${response.statusText}`);
        }
        const data = await response.json();
        return data as Category[];
    } catch (error) {
        console.error('Fehler bei getAllTask:', error);
        throw error;
    }

}

export async function deleteTask(id: string): Promise<void> {
    try {
        const response = await fetch(`/api/tasks/${id}`, {              //todo: change path
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Löschen: ${response.statusText}`);
        }

        // Optional: Du kannst hier auch `return;` schreiben, aber bei Promise<void> ist das nicht nötig.
    } catch (error) {
        console.error('Fehler bei deleteTask:', error);
}
}


export async function deleteCategoty(id: string): Promise<void> {
    try {
        const response = await fetch(`categoryDelete`, {              //todo: change path
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Löschen: ${response.statusText}`);
        }

        // Optional: Du kannst hier auch `return;` schreiben, aber bei Promise<void> ist das nicht nötig.
    } catch (error) {
        console.error('Fehler bei deleteTask:', error);
    }
}


export async function createTask(task: Task): Promise<void> {
    try {
        const response = await fetch("createTask", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }catch (error) {
        console.error('Fehler bei createTask:', error);
    }
}

export async function createCategory(category: Category): Promise<void> {
    try {
        const response = await fetch("createCategory", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
    }catch (error) {
        console.error('Fehler bei createTask:', error);
    }
}


export async function





// testApi.ts
import {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    createTask,
    getAllTasks,
    editTask,
    deleteTask,
    createCategory,
    getAllCategories,
    editCategory,
    deleteCategory,
} from './api';

import type { Task, Category } from '../types'; // Pfad anpassen

async function testApi() {
    try {
        const createdUser = await createUser({
            name: 'Max Mustermann',
            email: 'max@example.com',
            password: 'testpw'
        });

        const user = await getUser(createdUser.id);

        await updateUser({ ...user, name: 'Max Geändert' });



        const category: Category = {
            id: 0, // wird ignoriert oder vom Server ersetzt
            user_id: createdUser.id,
            name: 'Allgemein'
        };
        await createCategory(category);
        const categories = await getAllCategories(createdUser.id);
        const createdCategory = categories[categories.length - 1];

        await editCategory({ ...createdCategory, name: 'Geändert' });


        const task: Task = {
            id: 0,
            category_id: createdCategory.id,
            title: 'Testaufgabe',
            description: 'Beschreibung',
            done: false
        };
        await createTask(task);
        const tasks = await getAllTasks(createdUser.id);
        const createdTask = tasks[tasks.length - 1];

        await editTask({ ...createdTask, done: true });

        await deleteTask(createdTask.id.toString());

        await deleteCategory(createdCategory.id.toString());

        await deleteUser(createdUser.id);

    } catch (error) {
        console.error('❌ Fehler während Testdurchlauf:', error);
    }
}

testApi();

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
        console.log('📌 Starte API-Tests');

        // --- USER ---
        console.log('🧪 Erstelle Benutzer...');
        const createdUser = await createUser({
            name: 'Max Mustermann',
            email: 'max@example.com',
            password: 'testpw'
        });
        console.log('✅ Benutzer erstellt mit ID:', createdUser.id);

        console.log('📥 Lade Benutzer...');
        const user = await getUser(createdUser.id);
        console.log('✅ Benutzer geladen:', user);

        console.log('✏️ Aktualisiere Benutzer...');
        await updateUser({ ...user, name: 'Max Geändert' });
        console.log('✅ Benutzer aktualisiert');

        // --- CATEGORY ---
        console.log('📁 Erstelle Kategorie...');
        const category: Category = {
            id: 0, // wird ignoriert oder vom Server ersetzt
            user_id: createdUser.id,
            name: 'Allgemein'
        };
        await createCategory(category);
        const categories = await getAllCategories(createdUser.id);
        const createdCategory = categories[categories.length - 1];
        console.log('✅ Kategorie erstellt mit ID:', createdCategory.id);

        console.log('✏️ Aktualisiere Kategorie...');
        await editCategory({ ...createdCategory, name: 'Geändert' });
        console.log('✅ Kategorie aktualisiert');

        // --- TASK ---
        console.log('📝 Erstelle Aufgabe...');
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
        console.log('✅ Aufgabe erstellt mit ID:', createdTask.id);

        console.log('✏️ Aktualisiere Aufgabe...');
        await editTask({ ...createdTask, done: true });
        console.log('✅ Aufgabe aktualisiert');

        // --- CLEANUP ---
        console.log('🗑️ Lösche Aufgabe...');
        await deleteTask(createdTask.id.toString());
        console.log('✅ Aufgabe gelöscht');

        console.log('🗑️ Lösche Kategorie...');
        await deleteCategory(createdCategory.id.toString());
        console.log('✅ Kategorie gelöscht');

        console.log('🗑️ Lösche Benutzer...');
        await deleteUser(createdUser.id);
        console.log('✅ Benutzer gelöscht');

        console.log('🎉 Alle Tests erfolgreich!');
    } catch (error) {
        console.error('❌ Fehler während Testdurchlauf:', error);
    }
}

testApi();






import {getAllCategories} from "../src/services/api";

jest.mocked("../src/services/api");
describe("Category API Calls", () => {// Alle API Calls unter den describe
    it("should get all categories", async () => {
        const categories = await getAllCategories(1);
        jest.fn(getAllCategories)
        expect(categories.length).toBeGreaterThan(0);
        expect(categories[0]).toHaveProperty("name");
        expect(categories).toHaveProperty("user_id");
    })
})

//export async function getAllCategories(userId: number): Promise<Category[]> { //Niklas
//     try {
//         const response = await fetch(`${BASE_URL}/categories/${userId}`, {
//             method: 'GET',
//         });
//         if (!response.ok) {
//             throw new Error(`Fehler beim Abrufen der Kategorien: ${response.statusText}`);
//         }
//         const data = await response.json();
//         return data as Category[];
//     } catch (error) {
//         console.error('Fehler bei getAllCategories:', error);
//         throw error;
//     }
// }
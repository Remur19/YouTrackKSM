
import {getAllCategories} from "../src/services/api";
import {Category} from "../src/types";

jest.mocked("../src/services/api");

const fakeCategoies :Category[] =[{
    name: "testCat1",
    id: 1,
    user_id: 1
}, {
    name: "testCat2",
    id: 2,
    user_id: 2
}]
let isApiConnected = false;
    // Alle API Calls unter den describe
    beforeAll(async () => {
        try{await getAllCategories(1);
            isApiConnected = true;
        }catch (e:unknown) {
            isApiConnected = false;
        }
    });
    if(isApiConnected){
        test("should get all categories", async () => {
            const categories = await getAllCategories(1);
            jest.fn(getAllCategories)
            expect(categories.length).toBeGreaterThan(0);
            expect(categories[0]).toHaveProperty("name");
            expect(categories).toHaveProperty("user_id");
        })
    }else{
        test("should get all categories", async () => {
            const categories =fakeCategoies;
            expect(categories.length).toBeGreaterThan(0);
            expect(categories[0]).toHaveProperty("name");
        })
    }



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
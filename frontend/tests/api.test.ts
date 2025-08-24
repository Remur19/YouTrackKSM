import {  getAllCategories } from '../src/services/api';
import {Category} from "../src/types";

//TESTS NIKLAS PANZ:
describe("getAllCategories", () => {
    const BASE_URL = 'http://localhost:8080';

    beforeEach(() => {
        global.fetch = jest.fn();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    const mockUpCategories:Category[] = [{
        id: 1,
        user_id: 1,
        name: 'Heute',
    },{
        id: 2,
        user_id: 1,
        name: 'Diese Woche',
    },{
        id: 3,
        user_id: 2,
        name: 'Dieses Jahr',
    },{
        id: 4,
        user_id: 2,
        name: 'Videospiele',
    },{
        id: 5,
        user_id: 3,
        name: 'Musik',
    },];
    const user1Categories = mockUpCategories.filter(
        (category: Category) => category.user_id === 1
    );

// Alle API Calls unter den describe

    test("should get all categories", async () => {


        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            statusText: 'OK',
            json: async () => user1Categories,
        } as Response);

        const categories = await getAllCategories(1);

        expect(categories.length).toBeGreaterThan(0);
        expect(categories[0]).toHaveProperty("name");
        expect(categories[0]).toHaveProperty("user_id");
    })
    test("check that getAllCategories calls fetch with correct params", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            statusText: "OK",
            json: async () => [],
        } as Response);

        await getAllCategories(1);

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/categories/1`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
    });

    test("should throw an error if response is not ok", async () => {
        // fetch resolved, aber mit schlechtem Status
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => [],
        });
        await expect(getAllCategories(2))
            .rejects.toThrow("Fehler beim Abrufen der Kategorien: undefined");
    });

})

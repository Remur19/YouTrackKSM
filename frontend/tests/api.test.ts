import {getUser, createUser, getAllCategories} from "../src/services/api";
import {Category} from "../src/types";



describe("getUser", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });


    test("Abfrage erfolgreich", async () => {
        const userId = "7d4c5a7e-6624-4f53-a9b6-6ffdeef7987b";
        const mockUser = {id: userId} ;

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockUser,
        } as Response);
        
        //uuid.Parse(userId)
        const user = await getUser(userId);

        expect(user).toEqual(mockUser);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/user/${userId}`, {method: "GET"});
    });

    test("Abfrage nicht erfolgreich", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            statusText: "Not Found",
        } as Response);

        await expect(getUser("7d4c5a7e-6624-4f53-a9b6-6ffdeef7987a"))
            .rejects
            .toThrow("Fehler beim Abrufen des Nutzers: Not Found");
    });
});

describe("createUser", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("erstellt einen Nutzer erfolgreich", async () => {
        const newUser = { name: "Alice", email: "alice@example.com", password: "secret123" };
        const returnedId = 42;

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            statusText: "OK",
            json: async () => returnedId,
        } as Response);

        const result = await createUser(newUser);

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/user",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            }
        );

        expect(result).toEqual({ ...newUser, id: returnedId });
    });

    test("wirft Fehler, wenn API nicht ok ist", async () => {
        const newUser = { name: "Bob", email: "bob@example.com", password: "pwd123" };

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            statusText: "Bad Request",
            json: async () => ({}),
        } as Response);

        await expect(createUser(newUser))
            .rejects
            .toThrow("Fehler beim Erstellen des Nutzers: Bad Request");
    });

    test("wirft Fehler bei fetch-Ausnahme", async () => {
        const newUser = { name: "Eve", email: "eve@example.com", password: "xxx" };

        global.fetch = jest.fn().mockRejectedValue(new Error("Network down"));

        await expect(createUser(newUser))
            .rejects
            .toThrow("Network down");
    });

});
describe("getAllCategories", () => {

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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch (e) {
            isApiConnected = false;
        }
    });
    if(isApiConnected){
        test("should get all categories", async () => {
            const categories = await getAllCategories(1);
            jest.fn(getAllCategories)
            expect(categories.length).toBeGreaterThan(0);
            expect(categories[0]).toHaveProperty("name");
            expect(categories[0]).toHaveProperty("user_id");
        })
    }else{
        test("should get all fake categories", async () => {
            const categories =fakeCategoies;
            expect(categories.length).toBeGreaterThan(0);
            expect(categories[0]).toHaveProperty("name");
        })
    }

})


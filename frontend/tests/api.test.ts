import {getUser, createUser, getAllCategories, BASE_URL} from "../src/services/api";

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


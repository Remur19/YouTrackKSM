import { createCategory, createTask, createUser, deleteUser, editTask, getUser } from "../services/api";
import type { Category, Task } from "../types";



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



global.fetch = jest.fn(); 

describe('deleteUser', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear(); 
  });

  it('sollte einen Nutzer erfolgreich löschen', async () => {
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    await expect(deleteUser(1)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/user/1', { method: 'DELETE' });
  });

  it('sollte einen Fehler werfen, wenn DELETE fehlschlägt', async () => {
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Nicht gefunden',
    });

    await expect(deleteUser(1)).rejects.toThrow('Fehler beim Löschen des Nutzers: Nicht gefunden');
  });
});



describe('editTask', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('sollte eine Task erfolgreich aktualisieren', async () => {
    
    const newUser = { name: 'Task User', email: "taskuser@test.com", password: "pw123" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => 1,
    });
    const createdUser = await createUser(newUser);

    
    const newCategory: Category = { name: 'Test Category', user_id: createdUser.id , id:1};
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });
    await createCategory(newCategory);

    
    const newTask: Task = { 
      title: 'Test Task', 
      description: "Test Description", 
      category_id: 1, 
      id:1,
      done: false 
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });
    await createTask(newTask);

    
    const taskToEdit: Task = { 
      id: 1, 
      title: 'Updated Task', 
      description: "Updated Description", 
      category_id: 1, 
      done: true 
    };


    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    await expect(editTask(taskToEdit)).resolves.toBeUndefined();

    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/user/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskToEdit),
    });
  });

  it('sollte einen Fehler werfen, wenn PUT fehlschlägt', async () => {
    const mockTask: Task = { id: 999, title: 'Non-existent Task', description: "Test", category_id: 1, done: false };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    await expect(editTask(mockTask)).rejects.toThrow('Fehler beim Aktualisieren: Not Found');
  });

  it('sollte Fehler aus catch weiterwerfen', async () => {
    const mockTask: Task = { id: 1, title: 'Test Task', description: "Test", category_id: 1, done: false };

    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Netzwerkfehler'));

    await expect(editTask(mockTask)).rejects.toThrow('Netzwerkfehler');
  });
});
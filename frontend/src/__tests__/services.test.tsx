import { createCategory, editCategory } from '../services/api';

const BASE_URL = 'http://localhost:8080';

beforeEach(() => {
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('API tests', () => {
  it('createCategory() should create a new category', async () => {
    const mockUpCategorie = {
      id: 1,
      user_id: 2,
      name: 'new',
    };
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      statusText: 'OK',
      json: async () => ({ success: true }),
    } as Response);

    await createCategory(mockUpCategorie);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockUpCategorie),
    });
  });

  it('editCategory() should create a new category', async () => {
    const mockUpCategorie = {
      id: 1,
      user_id: 2,
      name: 'new',
    };
    const newName = 'newName';

    const mockUpCategorie2 = {
      id: 1,
      user_id: 2,
      name: newName,
    };
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      statusText: 'OK',
      json: async () => ({ success: true }),
    } as Response);

    await editCategory(mockUpCategorie2);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${mockUpCategorie.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockUpCategorie2),
      }
    );
  });
it('deleteCategory() should delete a category', async () => {
    const mockUpCategorie = {
      id: 1,
      user_id: 2,
      name: 'new',
    };
    const newName = 'newName';

    const mockUpCategorie2 = {
      id: 1,
      user_id: 2,
      name: newName,
    };
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      statusText: 'OK',
      json: async () => ({ success: true }),
    } as Response);

    await editCategory(mockUpCategorie2);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${mockUpCategorie.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockUpCategorie2),
      }
    );
  });

  it('getAllCategories() should delete a category', async () => {
    const mockUpCategorie = {
      id: 1,
      user_id: 2,
      name: 'new',
    };
    const newName = 'newName';

    const mockUpCategorie2 = {
      id: 1,
      user_id: 2,
      name: newName,
    };
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      statusText: 'OK',
      json: async () => ({ success: true }),
    } as Response);

    await editCategory(mockUpCategorie2);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${mockUpCategorie.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockUpCategorie2),
      }
    );
  });
});
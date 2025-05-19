package repo

import (
	"errors"
	"sync"

	"backend/utils"

	"github.com/google/uuid"
)

type MockRepo struct {
	users      map[uuid.UUID]utils.User
	tasks      map[uuid.UUID]utils.Task
	categories map[uuid.UUID]utils.Category
	mu         sync.RWMutex
}

var (
	ERROR_USER_NOT_FOUND     = errors.New("user not found")
	ERROR_TASK_NOT_FOUND     = errors.New("task not found")
	ERROR_CATEGORY_NOT_FOUND = errors.New("category")
)

func NewMockRepo() Repository {
	return &MockRepo{
		users:      make(map[uuid.UUID]utils.User),
		tasks:      make(map[uuid.UUID]utils.Task),
		categories: make(map[uuid.UUID]utils.Category),
	}
}

// User Methods

func (m *MockRepo) CreateUser(user utils.User) (uuid.UUID, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	user.ID = uuid.New()
	m.users[user.ID] = user
	return user.ID, nil
}

func (m *MockRepo) GetUser(id uuid.UUID) (utils.User, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	user, ok := m.users[id]
	if !ok {
		return utils.User{}, ERROR_USER_NOT_FOUND
	}
	return user, nil
}

func (m *MockRepo) UpdateUser(id uuid.UUID, user utils.User) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, ok := m.users[id]; !ok {
		return ERROR_USER_NOT_FOUND
	}
	user.ID = id
	m.users[id] = user
	return nil
}

func (m *MockRepo) DeleteUser(id uuid.UUID) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	delete(m.users, id)
	return nil
}

func (m *MockRepo) GetUserByEmail(email string) (utils.User, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	for _, user := range m.users {
		if user.Email == email {
			return user, nil
		}
	}
	return utils.User{}, ERROR_USER_NOT_FOUND
}

func (m *MockRepo) GetUsers() ([]utils.User, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	users := make([]utils.User, 0, len(m.users))
	for _, user := range m.users {
		users = append(users, user)
	}
	return users, nil
}

// Task Methods

func (m *MockRepo) CreateTask(task utils.Task) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	task.ID = uuid.New()
	m.tasks[task.ID] = task
	return nil
}

func (m *MockRepo) UpdateTask(id uuid.UUID, task utils.Task) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, ok := m.tasks[id]; !ok {
		return ERROR_TASK_NOT_FOUND
	}
	task.ID = id
	m.tasks[id] = task
	return nil
}

func (m *MockRepo) DeleteTask(id uuid.UUID) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	delete(m.tasks, id)
	return nil
}

func (m *MockRepo) GetTasksByOwner(ownerID uuid.UUID) ([]utils.Task, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	var tasks []utils.Task
	for _, task := range m.tasks {
		if task.Owner_id == ownerID {
			tasks = append(tasks, task)
		}
	}
	return tasks, nil
}

// Category Methods

func (m *MockRepo) CreateCategory(category utils.Category) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	category.ID = uuid.New()
	m.categories[category.ID] = category
	return nil
}

func (m *MockRepo) UpdateCategory(id uuid.UUID, category utils.Category) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, ok := m.categories[id]; !ok {
		return ERROR_CATEGORY_NOT_FOUND
	}
	category.ID = id
	m.categories[id] = category
	return nil
}

func (m *MockRepo) DeleteCategory(id uuid.UUID) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	delete(m.categories, id)
	return nil
}

func (m *MockRepo) GetCategories() ([]utils.Category, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	categories := make([]utils.Category, 0, len(m.categories))
	for _, category := range m.categories {
		categories = append(categories, category)
	}
	return categories, nil
}

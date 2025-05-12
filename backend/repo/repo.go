package repo

import (
	"backend/utils"

	"github.com/google/uuid"
)

type Repository interface {
	CreateUser(user utils.User) (uuid.UUID, error)
	GetUser(id uuid.UUID) (utils.User, error)
	UpdateUser(id uuid.UUID, user utils.User) error
	DeleteUser(id uuid.UUID) error
	GetUserByEmail(email string) (utils.User, error)
	GetUsers() ([]utils.User, error)

	CreateTask(task utils.Task) error
	UpdateTask(id uuid.UUID, task utils.Task) error
	DeleteTask(id uuid.UUID) error
	GetTasksByOwner(ownerID uuid.UUID) ([]utils.Task, error)

	CreateCategory(category utils.Category) error
	UpdateCategory(id uuid.UUID, category utils.Category) error
	DeleteCategory(id uuid.UUID) error
	GetCategories() ([]utils.Category, error)
}

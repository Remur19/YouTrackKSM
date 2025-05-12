package categoryservice

import (
	"backend/repo"
	"backend/utils"

	"github.com/google/uuid"
)

type Category struct {
	repo repo.Repository
}

func NewCategoryService(repo repo.Repository) *Category {
	return &Category{
		repo: repo,
	}
}

func (c *Category) GetCategories() ([]utils.Category, error) {
	return c.repo.GetCategories()
}

func (c *Category) CreateCategory(category utils.Category) error {
	category.ID = uuid.New()
	return c.repo.CreateCategory(category)
}

func (c *Category) UpdateCategory(id uuid.UUID, category utils.Category) error {
	return c.repo.UpdateCategory(id, category)
}

func (c *Category) DeleteCategory(id uuid.UUID) error {
	return c.repo.DeleteCategory(id)
}

package categoryservice

import (
	"backend/repo"
	"backend/utils"

	"github.com/google/uuid"
)

type Category struct {
	repo   repo.MongoDBRepo
	currId int
}

func NewCategoryService(repo repo.MongoDBRepo) *Category {
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

func (c *Category) UpdateCategory(id int, category utils.Category) error {
	return c.repo.UpdateCategory(id, category)
}

func (c *Category) DeleteCategory(id int) error {
	return c.repo.DeleteCategory(id)
}

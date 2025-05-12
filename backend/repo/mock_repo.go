package repo

import (
	"backend/utils"

	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

// MongoDBRepoMock implementiert das Interface, aber mit testify/mock.
type MongoDBRepoMock struct {
	mock.Mock
}

func (m *MongoDBRepoMock) GetCategories() ([]utils.Category, error) {
	args := m.Called()
	return args.Get(0).([]utils.Category), args.Error(1)
}

func (m *MongoDBRepoMock) CreateCategory(cat utils.Category) error {
	args := m.Called(cat)
	return args.Error(0)
}

func (m *MongoDBRepoMock) UpdateCategory(id uuid.UUID, cat utils.Category) error {
	args := m.Called(id, cat)
	return args.Error(0)
}

func (m *MongoDBRepoMock) DeleteCategory(id uuid.UUID) error {
	args := m.Called(id)
	return args.Error(0)
}

package UserService

import (
	"backend/repo"
	"backend/utils"

	"github.com/google/uuid"
)

type UserService struct {
	repo   *repo.MongoDBRepo
	currId int
}

func NewUserService(repo *repo.MongoDBRepo) *UserService {
	return &UserService{
		repo: repo,
	}
}

func (u *UserService) GetUser(id uuid.UUID) (utils.User, error) {
	return u.repo.GetUser(id)
}

func (u *UserService) GetAllUsers() ([]utils.User, error) {
	return u.repo.GetAllUsers()
}

func (u *UserService) CreateUser(user utils.User) (uuid.UUID, error) {
	user.ID = uuid.New()
	return u.repo.CreateUser(user)
}

func (u *UserService) UpdateUser(id uuid.UUID, user utils.User) error {
	return u.repo.UpdateUser(id, user)
}

func (u *UserService) DeleteUser(id uuid.UUID) error {
	return u.repo.DeleteUser(id)
}

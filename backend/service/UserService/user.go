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

func (u *UserService) GetUser(id int) (utils.User, error) {
	return u.repo.GetUser(id)
}

func (u *UserService) CreateUser(user utils.User) error {
	user.ID = uuid.New()
	return u.repo.CreateUser(user)
}

func (u *UserService) UpdateUser(id int, user utils.User) error {
	return u.repo.UpdateUser(id, user)
}

func (u *UserService) DeleteUser(id int) error {
	return u.repo.DeleteUser(id)
}

package UserService

import (
	"backend/repo"
	"backend/utils"
	"testing"
)

var (
	mockRepo    = repo.NewMockRepo()
	userService = NewUserService(mockRepo)
)

func TestCreateUser(t *testing.T) {
	_, err := userService.CreateUser(utils.User{})
	if err != nil {
		t.Fail()
	}
}

func TestDeleteUser(t *testing.T) {
	id, _ := userService.CreateUser(utils.User{})
	err := userService.DeleteUser(id)
	if err != nil {
		t.Fail()
	}
}

func TestGetAllUsers(t *testing.T) {
	mr := repo.NewMockRepo()
	us := NewUserService(mr)

	_, _ = us.CreateUser(utils.User{})
	_, _ = us.CreateUser(utils.User{})

	users, err := us.GetAllUsers()
	if err != nil {
		t.Fail()
	}

	if len(users) != 2 {
		t.Fail()
	}
}

func TestGetUser(t *testing.T) {
	id, _ := userService.CreateUser(utils.User{})
	usr, err := userService.GetUser(id)
	if err != nil || usr.ID != id {
		t.Fail()
	}
}


package taskservice

import (
	"backend/repo"
	"backend/utils"
	"testing"

	"github.com/google/uuid"
)

var (
	mockTaskRepo = repo.NewMockRepo()
	taskService  = NewTaskService(mockTaskRepo)
)

func TestCreateTask(t *testing.T) {
	err := taskService.CreateTask(utils.Task{
		Title: "Testaufgabe",
	})
	if err != nil {
		t.Fail()
	}
}

func TestGetTasksByUser(t *testing.T) {
	userID := uuid.New()

	err := taskService.CreateTask(utils.Task{
		Title:    "UserTask1",
		Owner_id: userID,
	})
	if err != nil {
		panic(err)
	}
	err = taskService.CreateTask(utils.Task{
		Title:    "UserTask2",
		Owner_id: userID,
	})
	if err != nil {
		panic(err)
	}

	tasks, err := taskService.GetTasksByUser(userID)
	if err != nil || len(tasks) != 2 {
		t.Fail()
	}
}

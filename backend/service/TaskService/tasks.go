package taskservice

import (
	"backend/repo"
	"backend/utils"

	"github.com/google/uuid"
)

type TaskService struct {
	repo repo.Repository
}

func NewTaskService(repo repo.Repository) *TaskService {
	return &TaskService{
		repo: repo,
	}
}

func (ts *TaskService) GetTasksByUser(userID uuid.UUID) ([]utils.Task, error) {
	return ts.repo.GetTasksByOwner(userID)
}

func (ts *TaskService) CreateTask(task utils.Task) error {
	task.ID = uuid.New()
	return ts.repo.CreateTask(task)
}

func (ts *TaskService) UpdateTask(taskID uuid.UUID, task utils.Task) error {
	return ts.repo.UpdateTask(taskID, task)
}

func (ts *TaskService) DeleteTask(taskID uuid.UUID) error {
	return ts.repo.DeleteTask(taskID)
}

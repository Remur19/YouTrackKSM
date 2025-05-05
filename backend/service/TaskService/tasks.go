package taskservice

import (
	"backend/repo"
	"backend/utils"
)

type TaskService struct {
	repo repo.MongoDBRepo
}

func NewTaskService(repo repo.MongoDBRepo) *TaskService {
	return &TaskService{
		repo: repo,
	}
}

func (ts *TaskService) GetTasksByUser(userID int) ([]utils.Task, error) {
	return ts.repo.GetTasksByOwner(userID)
}

func (ts *TaskService) CreateTask(task utils.Task) error {
	return ts.repo.CreateTask(task)
}

func (ts *TaskService) UpdateTask(taskID int, task utils.Task) error {
	return ts.repo.UpdateTask(taskID, task)
}

func (ts *TaskService) DeleteTask(taskID int) error {
	return ts.repo.DeleteTask(taskID)
}

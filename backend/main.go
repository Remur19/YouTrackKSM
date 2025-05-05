package main

import (
	"backend/repo"
	categoryservice "backend/service/CategoryService"
	taskservice "backend/service/TaskService"
	"backend/service/UserService"
	"backend/transport"
	"fmt"
)

func main() {
	repo := repo.NewMongoDBRepo("mongodb://localhost:27017")
	userSvc := UserService.NewUserService(repo)
	catSvc := categoryservice.NewCategoryService(*repo)
	taskSvc := taskservice.NewTaskService(*repo)
	tp := transport.NewHTTPTransport(
		userSvc,
		catSvc,
		taskSvc,
	).SetupRoutes()
	fmt.Printf("%s", tp.Start(":8088"))
}

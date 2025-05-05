package main

import (
	"backend/repo"
	categoryservice "backend/service/CategoryService"
	taskservice "backend/service/TaskService"
	"backend/service/UserService"
	"backend/transport"
	"flag"
	"fmt"
)

func main() {
	var (
		addr  string
		mongo string
	)
	flag.StringVar(&addr, "addr", ":8088", "address to listen on")
	flag.StringVar(&mongo, "mongo", "mongodb://localhost:27017", "MongoDB connection string")
	flag.Parse()
	repo := repo.NewMongoDBRepo(mongo)
	userSvc := UserService.NewUserService(repo)
	catSvc := categoryservice.NewCategoryService(*repo)
	taskSvc := taskservice.NewTaskService(*repo)
	tp := transport.NewHTTPTransport(
		userSvc,
		taskSvc,
		catSvc,
	).SetupRoutes()

	fmt.Printf("Server started on addr %s\n", addr)
	fmt.Printf("%s\n", tp.Start(addr))
}

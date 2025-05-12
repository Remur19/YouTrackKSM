package transport

import (
	categoryservice "backend/service/CategoryService"
	taskservice "backend/service/TaskService"
	"backend/service/UserService"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type HTTPTransport struct {
	mx              *mux.Router
	userService     *UserService.UserService
	taskService     *taskservice.TaskService
	categoryService *categoryservice.Category
}

func NewHTTPTransport(userRepo *UserService.UserService, taskRepo *taskservice.TaskService, categoryRepo *categoryservice.Category) *HTTPTransport {
	return &HTTPTransport{
		mx:              mux.NewRouter(),
		userService:     userRepo,
		taskService:     taskRepo,
		categoryService: categoryRepo,
	}

}

func (t *HTTPTransport) SetupRoutes() *HTTPTransport {
	t.mx.HandleFunc("/health", t.healthHandler).Methods("GET")
	t.mx.HandleFunc("/version", t.versionHandler).Methods("GET")

	t.mx.HandleFunc("/user", t.CreateUser).Methods("POST")
	t.mx.HandleFunc("/user/{id}", t.GetUser).Methods("GET")
	t.mx.HandleFunc("/user", t.GetAllUser).Methods("GET")
	t.mx.HandleFunc("/user/{id}", t.UpdateUser).Methods("PUT")
	t.mx.HandleFunc("/user/{id}", t.DeleteUser).Methods("DELETE")

	t.mx.HandleFunc("/categories", t.GetCategories).Methods("GET")
	t.mx.HandleFunc("/categories", t.CreateCategory).Methods("POST")
	t.mx.HandleFunc("/categories/{id}", t.UpdateCategory).Methods("PUT")
	t.mx.HandleFunc("/categories/{id}", t.DeleteCategory).Methods("DELETE")

	t.mx.HandleFunc("/tasks/{id}", t.GetTasks).Methods("GET") // id is the id of the owner
	t.mx.HandleFunc("/tasks", t.CreateTask).Methods("POST")
	t.mx.HandleFunc("/tasks/{id}", t.UpdateTask).Methods("PUT")
	t.mx.HandleFunc("/tasks/{id}", t.DeleteTask).Methods("DELETE")

	cors.AllowAll().Handler(t.mx)
	return t
}

func (t *HTTPTransport) healthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func (t *HTTPTransport) versionHandler(w http.ResponseWriter, r *http.Request) {
	_, err := w.Write([]byte("v1.0.0"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (t *HTTPTransport) Start(port string) error {
	return http.ListenAndServe(port, t.mx)
}

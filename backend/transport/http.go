package transport

import (
	categoryservice "backend/service/CategoryService"
	taskservice "backend/service/TaskService"
	"backend/service/UserService"
	"net/http"

	"github.com/gorilla/mux"
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

	return t
}

func (t *HTTPTransport) healthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func (t *HTTPTransport) versionHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("v1.0.0"))
	w.WriteHeader(http.StatusOK)
}

func (t *HTTPTransport) Start(port string) error {
	return http.ListenAndServe(port, t.mx)
}

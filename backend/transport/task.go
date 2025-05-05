package transport

import (
	"backend/utils"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func (t *HTTPTransport) CreateTask(w http.ResponseWriter, r *http.Request) {
	var task utils.Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err := t.taskService.CreateTask(task); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (t *HTTPTransport) GetTasks(w http.ResponseWriter, r *http.Request) {
	var (
		vars = mux.Vars(r)
		id   string
		id_i int
		ok   bool
		err  error
	)
	if id, ok = vars["id"]; !ok {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if id_i, err = uuid.Parse(id); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	tasks, err := t.taskService.GetTasksByUser(id_i)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(tasks); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (t *HTTPTransport) UpdateTask(w http.ResponseWriter, r *http.Request) {
	var (
		vars = mux.Vars(r)
		id   string
		id_i int
		ok   bool
		err  error
	)
	if id, ok = vars["id"]; !ok {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if id_i, err = uuid.Parse(id); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var task utils.Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err := t.taskService.UpdateTask(id_i, task); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (t *HTTPTransport) DeleteTask(w http.ResponseWriter, r *http.Request) {
	var (
		vars = mux.Vars(r)
		id   string
		id_i int
		ok   bool
		err  error
	)
	if id, ok = vars["id"]; !ok {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if id_i, err = uuid.Parse(id); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err := t.taskService.DeleteTask(id_i); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

package transport

import (
	"backend/utils"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func (t *HTTPTransport) CreateUser(w http.ResponseWriter, r *http.Request) {
	var user utils.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	id, err := t.userService.CreateUser(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}


func (t *HTTPTransport) GetAllUser(w http.ResponseWriter, r *http.Request) {
	users, err := t.userService.GetAllUsers()
	if err != nil {
		http.Error(w, err.Error(), 304)
		return
	}
	if err = json.NewEncoder(w).Encode(users); err != nil {
		http.Error(w, err.Error(), 304)
		return
	}
}

func (t *HTTPTransport) GetUser(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var (
		intId uuid.UUID
		err   error
	)
	intId, err = uuid.Parse(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	user, err := t.userService.GetUser(intId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(user); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (t *HTTPTransport) UpdateUser(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var (
		intId uuid.UUID
		err   error
	)
	intId, err = uuid.Parse(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var user utils.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err := t.userService.UpdateUser(intId, user); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (t *HTTPTransport) DeleteUser(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var (
		intId uuid.UUID
		err   error
	)
	intId, err = uuid.Parse(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err := t.userService.DeleteUser(intId); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

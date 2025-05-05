package utils

import "github.com/google/uuid"

type Task struct {
	ID          uuid.UUID `bson:"id"`
	Category_id int       `bson:"category_id"`
	Owner_id    int       `bson:"owner_id"`
	Title       string    `bson:"title"`
	Description string    `bson:"description"`
	Done        bool      `bson:"done"`
}

type Category struct {
	ID   uuid.UUID `bson:"id"`
	Name string    `bson:"name"`
}

type User struct {
	ID       uuid.UUID `bson:"id"`
	Email    string    `bson:"email"`
	Name     string    `bson:"name"`
	Password string    `bson:"password"`
}

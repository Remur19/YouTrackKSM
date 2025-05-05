package utils

type Task struct {
	ID          int    `bson:"id"`
	Category_id int    `bson:"category_id"`
	Owner_id    int    `bson:"owner_id"`
	Title       string `bson:"title"`
	Description string `bson:"description"`
	Done        bool   `bson:"done"`
}

type Category struct {
	ID   int    `bson:"id"`
	Name string `bson:"name"`
}

type User struct {
	ID       int    `bson:"id"`
	Email    string `bson:"email"`
	Name     string `bson:"name"`
	Password string `bson:"password"`
}

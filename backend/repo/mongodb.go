package repo

import (
	"backend/utils"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDBRepo struct {
	client     *mongo.Client
	users      *mongo.Collection
	categories *mongo.Collection
	tasks      *mongo.Collection
}

const (
	UserCollectionName     = "users"
	CategoryCollectionName = "categories"
	TaskCollectionName     = "tasks"
	DBName                 = "todo"
)

func NewMongoDBRepo(connString string) *MongoDBRepo {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(connString))
	if err != nil {
		panic(err)
	}
	db := client.Database(DBName)
	users := db.Collection(UserCollectionName)
	categories := db.Collection(CategoryCollectionName)
	tasks := db.Collection(TaskCollectionName)
	return &MongoDBRepo{
		users:      users,
		categories: categories,
		tasks:      tasks,
	}
}

func (r *MongoDBRepo) Close() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	return r.client.Disconnect(ctx)
}

func (r *MongoDBRepo) CreateUser(user utils.User) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := r.users.InsertOne(ctx, user)
	return err
}

func (r *MongoDBRepo) GetUser(id int) (utils.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var user utils.User
	err := r.users.FindOne(ctx, bson.M{"_id": id}).Decode(&user)
	return user, err
}

func (r *MongoDBRepo) UpdateUser(id int, user utils.User) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := r.users.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": user})
	return err
}

func (r *MongoDBRepo) DeleteUser(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := r.users.DeleteOne(ctx, bson.M{"_id": id})
	return err
}

func (r *MongoDBRepo) GetUserByEmail(email string) (utils.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var user utils.User
	err := r.users.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	return user, err
}

func (r *MongoDBRepo) GetUsers() ([]utils.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var users []utils.User
	cursor, err := r.users.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var user utils.User
		err := cursor.Decode(&user)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}

func (r *MongoDBRepo) CreateTask(task utils.Task) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := r.tasks.InsertOne(ctx, task)
	return err
}

func (r *MongoDBRepo) UpdateTask(id int, task utils.Task) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := r.tasks.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": task})
	return err
}

func (r *MongoDBRepo) DeleteTask(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := r.tasks.DeleteOne(ctx, bson.M{"_id": id})
	return err
}

func (r *MongoDBRepo) GetTasksByOwner(owner_id int) ([]utils.Task, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var tasks []utils.Task
	cursor, err := r.tasks.Find(ctx, bson.M{"owner_id": owner_id})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var task utils.Task
		err := cursor.Decode(&task)
		if err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}
	return tasks, nil
}

func (r *MongoDBRepo) CreateCategory(category utils.Category) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := r.categories.InsertOne(ctx, category)
	return err
}

func (r *MongoDBRepo) GetCategories() ([]utils.Category, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var categories []utils.Category
	cursor, err := r.categories.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var category utils.Category
		err := cursor.Decode(&category)
		if err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}
	return categories, nil
}

func (r *MongoDBRepo) DeleteCategory(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := r.categories.DeleteOne(ctx, bson.M{"_id": id})
	return err
}

func (r *MongoDBRepo) UpdateCategory(id int, category utils.Category) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := r.categories.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": category})
	return err
}

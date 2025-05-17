package categoryservice_test

import (
	"testing"

	"github.com/google/uuid"

	"backend/repo"
	categoryservice "backend/service/CategoryService"
	"backend/utils"
)

func TestCategoryService_CRUD(t *testing.T) {
	mockRepo := repo.NewMockRepo()
	svc := categoryservice.NewCategoryService(mockRepo)

	// Create
	c := utils.Category{Name: "TestCat"}
	if err := svc.CreateCategory(c); err != nil {
		t.Fatalf("CreateCategory failed: %v", err)
	}

	// Get
	cats, err := svc.GetCategories()
	if err != nil {
		t.Fatalf("GetCategories failed: %v", err)
	}
	if len(cats) != 1 {
		t.Fatalf("expected 1 category, got %d", len(cats))
	}
	got := cats[0]
	if got.Name != "TestCat" {
		t.Errorf("expected Name 'TestCat', got '%s'", got.Name)
	}
	if got.ID == uuid.Nil {
		t.Error("expected non-nil ID")
	}

	// Update
	updated := got
	updated.Name = "UpdatedCat"
	if err := svc.UpdateCategory(got.ID, updated); err != nil {
		t.Fatalf("UpdateCategory failed: %v", err)
	}
	cats2, _ := svc.GetCategories()
	if cats2[0].Name != "UpdatedCat" {
		t.Errorf("expected Name 'UpdatedCat', got '%s'", cats2[0].Name)
	}

	// Update non-existent → error
	badID := uuid.New()
	if err := svc.UpdateCategory(badID, utils.Category{Name: "X"}); err == nil {
		t.Error("expected error when updating non-existent category")
	}

	// Delete
	if err := svc.DeleteCategory(got.ID); err != nil {
		t.Fatalf("DeleteCategory failed: %v", err)
	}
	cats3, _ := svc.GetCategories()
	if len(cats3) != 0 {
		t.Errorf("expected 0 categories after delete, got %d", len(cats3))
	}
}

package repo

import "testing"

func Test_False_URI(t *testing.T) {
	_, err := NewMongoDBRepo("")

	if err == nil {
		t.Error("Should return an error on flase connection String")
	}
}

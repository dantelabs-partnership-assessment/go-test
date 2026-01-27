package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	// Initialize some sample tasks
	tasks = []Task{
		{
			ID:          1,
			Title:       "Learn Go",
			Description: "Study Go programming language basics",
			Completed:   true,
			CreatedAt:   parseTime("2024-01-01T10:00:00Z"),
			UpdatedAt:   parseTime("2024-01-02T10:00:00Z"),
		},
		{
			ID:          2,
			Title:       "Build REST API",
			Description: "Create a RESTful API with Go",
			Completed:   false,
			CreatedAt:   parseTime("2024-01-03T10:00:00Z"),
			UpdatedAt:   parseTime("2024-01-03T10:00:00Z"),
		},
	}
	currentID = 3

	r := mux.NewRouter()

	// Routes
	r.HandleFunc("/", HomeHandler).Methods("GET")
	r.HandleFunc("/api/tasks", GetTasksHandler).Methods("GET")
	r.HandleFunc("/api/tasks", CreateTaskHandler).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/tasks/{id}", UpdateTaskHandler).Methods("PUT", "OPTIONS")
	r.HandleFunc("/api/tasks/{id}", DeleteTaskHandler).Methods("DELETE", "OPTIONS")
	r.HandleFunc("/api/tasks/{id}/toggle", ToggleTaskHandler).Methods("PATCH", "OPTIONS")

	// Serve frontend in production
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("../frontend/dist")))

	fmt.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func parseTime(timeStr string) time.Time {
	t, _ := time.Parse(time.RFC3339, timeStr)
	return t
}
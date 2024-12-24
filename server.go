package main

import (
	"fmt"
	"net/http"
	"os"
)

func handler(w http.ResponseWriter, r *http.Request) {
	htmlFile, err := os.ReadFile("index.html")
	if err != nil {
		http.Error(w, "Failed to load HTML file", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/html")
	w.Write(htmlFile)
}

func main() {
	// 静的ファイルを提供するための設定
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("./assets"))))

	http.HandleFunc("/", handler)

	port := ":8080"
	fmt.Println("Server is running on http://0.0.0.0" + port)
	err := http.ListenAndServe("0.0.0.0"+port, nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}

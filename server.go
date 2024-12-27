package main

import (
	"fmt"
	"net/http"
	"os"
)

// HTMLファイルを読み込むハンドラ
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
	// 静的ファイルの提供 (assets ディレクトリ)
	fs := http.FileServer(http.Dir("assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))

	// ルートリクエスト
	http.HandleFunc("/", handler)

	port := ":8080"
	fmt.Println("Server is running on http://localhost" + port)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}

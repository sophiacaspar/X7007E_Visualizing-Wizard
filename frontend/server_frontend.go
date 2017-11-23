package main

import (
	"fmt"
	"net/http"
	"html/template"
	"log"
)

type ButtonText struct {
	Title     		string
	ButtonContent	string
}

type Quiz struct {
	Question	string
	Choice1		string
	Choice2		string
	Choice3		string
	Choice4		string
}

/*****************************************
*** Adds content on website            ***
*****************************************/
func IndexHandler(w http.ResponseWriter, r *http.Request) {
	title := "Visualizing Wizard"
    buttonContent := "Get started"
	bt := &ButtonText{title, buttonContent}
    template.Must(template.ParseFiles("static/index.html", "static/templates/start.tmp")).Execute(w, bt)
}

func QuizHandler(w http.ResponseWriter, r *http.Request) {
	question := "What day is it today?"
    c1 := "Monday"
    c2 := "Wednesday"
    c3 := "Thursday"
    c4 := "Friday"
	q := &Quiz{question, c1, c2, c3, c4}
    template.Must(template.ParseFiles("static/index.html", "static/templates/quiz.tmp")).Execute(w, q)
}


/*****************************************
*** Starts the http-server with the    ***
*** different commands (get, post etc) ***
*****************************************/
func startWebserver() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	//router.GET("/", IndexHandler)
	http.HandleFunc("/", IndexHandler)
	http.HandleFunc("/quiz", QuizHandler)

	fmt.Println("running on localhost:1025")
	log.Fatal(http.ListenAndServe("localhost:1025", nil))
}


func main() {
		startWebserver()
}
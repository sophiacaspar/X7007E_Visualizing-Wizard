package main

import (
	"fmt"
	"net/http"
	"html/template"
	"log"
)

type TextView struct {
    Title     string
    Text        string
}

/*****************************************
*** Adds content on website            ***
*****************************************/
func IndexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("funkar")
	title := "test"
    text := "Den här texten borde hamna på sidan"
	tv := &TextView{title, text}
    template.Must(template.ParseFiles("static/index.html", "static/templates/test.tmp")).Execute(w, tv)
}


/*****************************************
*** Starts the http-server with the    ***
*** different commands (get, post etc) ***
*****************************************/
func startWebserver() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	//router.GET("/", IndexHandler)
	http.HandleFunc("/", IndexHandler)

	fmt.Println("running on localhost:1025")
	log.Fatal(http.ListenAndServe("localhost:1025", nil))
}


func main() {
		startWebserver()
}
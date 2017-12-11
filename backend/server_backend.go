package main

import (
	"fmt"
	"github.com/rs/cors"
	"github.com/julienschmidt/httprouter" //https://github.com/julienschmidt/httprouter
	"github.com/mndrix/golog"
	"net/http"
	//"strconv"
	"encoding/json"
	"log"
	//"os"
)

type Answers struct {
	Q1     	string `json="q1"`
	Q2		string `json="q2"`
	Q3		string `json="q3"`
	Q4		string `json="q4"`
	Q5		string `json="q5"`
	Q6		string `json="q6"`
	Q7		string `json="q7"`
	Q8		string `json="q8"`
}

type Test struct {
	Greeting 	string `json="greeting"`
	Name		string `json="name"`
}

/*****************************************
*** Starts the http-server with the    ***
*** different commands (get, post etc) ***
*****************************************/

func startBackend() {
	//ip := "130.240.170.62:1026"
	ip := "localhost:1026"
	router := httprouter.New()
	router.GET("/test", testHandler)
	router.POST("/quizResult", quizHandler)



	//handler := cors.Default().Handler(router)

	c := cors.New(cors.Options{
    	AllowedMethods: []string{"POST", "GET"},
	})

	// Insert the middleware
	handler := c.Handler(router)
	fmt.Println("running on", ip)
	log.Fatal(http.ListenAndServe(ip, handler))
	
}



func testHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Println("GET test")

	greeting := "hello"
	name := "Sophia"
	test := &Test{greeting, name}

	jsonBody, _ := json.Marshal(test)
	w.WriteHeader(200) // is ok
	w.Write(jsonBody)

}


func quizHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Println("POST quizHandler")

	dec := json.NewDecoder(r.Body)
	answers := Answers{}
	err := dec.Decode(&answers)
	if err != nil {
		log.Fatal(err)
	}

	answers.returnResult(w, r, ps)

}

func (ans *Answers) returnResult(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Println("Returning result")
	fmt.Println(ans)

	jsonBody, err := json.Marshal(ans)
	w.WriteHeader(200) // is ok
	w.Write(jsonBody)
	checkError(w, err)
}


/*******************************************************
*************** ERROR HANDLERS *************************
*******************************************************/

func checkError(w http.ResponseWriter, err error) {
	if err != nil {
		w.WriteHeader(500) // error
		fmt.Println(err)
		fmt.Fprintf(w, "Bad input")
		w.Write([]byte("{ error: bad input }"))
	}
}

/*******************************************************
********************* MAIN *****************************
*******************************************************/

func main() {
	startBackend()
}
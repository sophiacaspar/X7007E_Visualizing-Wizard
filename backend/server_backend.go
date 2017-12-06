package main

import (
	"fmt"
	"github.com/rs/cors"
	"github.com/julienschmidt/httprouter" //https://github.com/julienschmidt/httprouter
	"net/http"
	//"strconv"
	"encoding/json"
	"log"
	//"os"
)

type Answers struct {
	A1     	string `json="a1"`
	A2		string `json="a2"`
	A3		string `json="a3"`
	A4		string `json="a4"`
	A5		string `json="a5"`
	A6		string `json="a6"`
	A7		string `json="a7"`
	A8		string `json="a8"`
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
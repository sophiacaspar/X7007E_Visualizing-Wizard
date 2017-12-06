package main

import (
	"fmt"
	"github.com/rs/cors"
	"github.com/julienschmidt/httprouter" //https://github.com/julienschmidt/httprouter
	"net/http"
	"strconv"
	"encoding/json"
	"log"
	"os"
)

type Answers struct {
	A1     	string
	A2		string
	A3		string
	A4		string
	A5		string
	A6		string
	A7		string
	A8		string
}

/*****************************************
*** Starts the http-server with the    ***
*** different commands (get, post etc) ***
*****************************************/

func startBackend() {
	//ip := "130.240.170.62:1026"
	ip := "localhost:1026"
	router := httprouter.New()
	router.POST("/user/:id", l.getUser)



	//handler := cors.Default().Handler(router)

	c := cors.New(cors.Options{
    	AllowedMethods: []string{"POST", "GET"},
	})

	// Insert the middleware
	handler := c.Handler(router)
	log.Fatal(http.ListenAndServe(ip, handler))
	fmt.Println("running on", ip)
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
package main

import (
	"fmt"
	"github.com/mndrix/golog"
	"github.com/rs/cors"
	"github.com/julienschmidt/httprouter" //https://github.com/julienschmidt/httprouter
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

type Result struct {
	Result 	[]string `json="result"`
}

/*****************************************
*** Starts the http-server with the    ***
*** different commands (get, post etc) ***
*****************************************/

func startBackend() {
	//ip := "130.240.170.62:1026"
	ip := "localhost:1026"
	router := httprouter.New()
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



func (ans *Answers) golog(w http.ResponseWriter, r *http.Request, ps httprouter.Params) []string {
	fmt.Println("golog")
	prologInput := ans.Q1 + ", " + ans.Q2 + ", " + ans.Q3 + ", " + ans.Q4 +", "+ ans.Q5 + ", " + ans.Q6 + ", " + ans.Q7 + ", " + ans.Q8 

	fmt.Println(prologInput)

	m := golog.NewMachine().Consult(quizLogic())

	solutions := m.ProveAll(`getResultFromQuiz(`+prologInput+`, Result).`)
	result := []string{}

	for _, solution := range solutions {
		result = append(result, solution.ByName_("Result").String())
		
	    //fmt.Printf("Use %s \n", solution.ByName_("Result"))
	}
	result = removeDuplicates(result)
	return result
}


func quizHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Println("POST quizHandler")

	dec := json.NewDecoder(r.Body)
	answers := Answers{}
	err := dec.Decode(&answers)
	if err != nil {
		log.Fatal(err)
	}
	result := &Result{answers.golog(w, r, ps)}
	result.returnResult(w, r, ps)

}

func (result *Result) returnResult(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Println("Returning result")

	jsonBody, err := json.Marshal(result)
	w.WriteHeader(200) // is ok
	w.Write(jsonBody)
	checkError(w, err)
}

func removeDuplicates(elements []string) []string {
    // Use map to record duplicates as we find them.
    encountered := map[string]bool{}
    result := []string{}
    if len(elements) == 0 {
    	result = append(result, "null")
    	return result
    }

    for v := range elements {
        if encountered[elements[v]] == true {
            // Do not add duplicate.
        } else {
            // Record this element as an encountered element.
            encountered[elements[v]] = true
            // Append to result slice.
            result = append(result, elements[v])
        }
    }
    // Return the new slice.
    return result
}

/*******************************************************
*************** PROLOGE SCRIPT *************************
*******************************************************/

func quizLogic() string{
	return `
		%! radkollaps pink
	getResultFromQuiz(ans1, X, Y, ans1, _, ans1, ans4, ans4, radkollaps):-
		(
			X == ans1
			;
			X == ans2
		),
		(
			Y == ans1
			;
			Y == ans2
		).

	%! radkollaps blue, green
	getResultFromQuiz(X, _, _, ans1, _, Y, ans4, ans4, radkollaps):-
		(
			X == ans3,
			Y == ans4
		);
		(
			X == ans4, 
			Y == ans3
		).

	%! radkollaps
	getResultFromQuiz(X, _, _, ans1, _, _, ans4, ans4, radkollaps):-
		X \== ans2.

	%! klick pink
	getResultFromQuiz(ans2, ans2, ans2, _, _, ans4, Q, ans3, klick):-
		(
			Q == ans1
			;
			Q == ans2
			;
			Q == ans3
		).

	%! klick + skroll
	getResultFromQuiz(X, Y, Z, _, _, _, Q, ans3, Result):-
		X \== ans2,
		Y \== ans1,
		Z \== ans1,
		Q \== ans4,

		(
			Result = klick
			;
			Result = skroll
		).


	%! squish
	getResultFromQuiz(_, _, X, _, _, _, Y, Z, squish):-
		(
			X == ans1
			;
			X == ans2
		),
			Y \== ans4,
			Z \== ans4
		.

	%! squish
	getResultFromQuiz(_, _, X, _, _, _, Y, Z, squish):-
		(
			X == ans1
			;
			X == ans2
		),
		(
			Y == ans4
			;
			Z == ans4
		).

	`
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
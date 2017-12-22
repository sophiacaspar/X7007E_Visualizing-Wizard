// Questions and answers are in questions.js

var q = 0;
var answersFromUser= {};
var ip = getIP();



function firstQuestion(){
	setNewQuestion(questions.q1, answers.q1);
}

function getAnswers(ans){
	switch(q) {
		case 0:
			answersFromUser.q1 = ans;
			setNewQuestion(questions.q2, answers.q2);
			q++;
			break;
		case 1:
			answersFromUser.q2 = ans;
			setNewQuestion(questions.q3, answers.q3);
			q++;
			break;
		case 2:
			answersFromUser.q3 = ans;
			setNewQuestion(questions.q4, answers.q4);
			q++;
			break;
		case 3:
			answersFromUser.q4 = ans;
			setNewQuestion(questions.q5, answers.q5);
			q++;
			break;
		case 4:
			answersFromUser.q5 = ans;
			setNewQuestion(questions.q6, answers.q6);
			q++;
			break;
		case 5:
			answersFromUser.q6 = ans;
			setNewQuestion(questions.q7, answers.q7);
			q++;
			break;
		case 6:
			answersFromUser.q7 = ans;

			setNewQuestion(questions.q8, answers.q8);
			q++
			break;
		case 7:
			answersFromUser.q8 = ans;
			sendAnswers();
			q++;
			break;
	}
}

function setNewQuestion(question, answers){
	document.getElementById("question").innerHTML = question;
	for (var i = 0; i < 4; i++) {
		var id = "ans" + (i+1);
		setNewAnswer(id, answers[i]);
	}
}


function setNewAnswer(id, answer){
	document.getElementById(id).innerHTML = answer;
}

function setNewOnclickAttribute(id, lastQuestion){
	document.getElementById(id).setAttribute('onclick', "showAnswers('" + id + "')");
}

function showAnswers(ans) {
	answersFromUser.q8 = ans;
	sendAnswers();
	
}


function sendAnswers() {
	var xhr = new XMLHttpRequest();
        xhr.onload = function(event) {
            if (xhr.status == 200) {
        		var result = event.target.response;
          		result = JSON.parse(result);
          		
          		resultHandler(result);
          		
            } else {
              alert("Error! Upload failed");
            }
          };
          xhr.onerror = function() {
            alert("Error! Upload failed." + xhr.status);
          };
            
          xhr.open('POST', ip + '/quizResult', true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(answersFromUser));
      }

function resultHandler(result){
	var firstResult = result.Result[0];
	if (firstResult == "uncertain") {
		displayUncertain();
		firstResult = "squish";
	}

	getResult(firstResult);
	getCode();
	getTable(firstResult);
	displayCode(event, 'HTML');
	displayResult();
}




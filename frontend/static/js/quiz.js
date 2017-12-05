// Questions and answers are in questions.js

var q = 0;
var answersFromUser= {};


$( document ).ready(function() {
	firstQuestion();

});


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
			
			for (var i = 0; i < 4; i++) {
				var id = "ans" + (i+1);
				setNewOnclickAttribute(id, true);
			}

			setNewOnclickAttribute('ans5', "Null", true);
			q++
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
	if (lastQuestion == false) {
		document.getElementById(id).setAttribute('onclick', "getAnswers('" + id + "')");
	} else {
		document.getElementById(id).setAttribute('onclick', "showAnswers('" + id + "')");
	}

}

function showAnswers(ans) {
	answersFromUser.q8 = ans;
	document.getElementById('result').innerHTML = JSON.stringify(answersFromUser);
	
}





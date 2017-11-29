var q = 0;
var obj= {};

function getAnswers(ans){
	switch(q) {
		case 0:
			obj.q1 = ans;
			var newQuestion = "What's your favourite color?";
			var answers = [
							"red",
							"blue",
							"green",
							"yellow"
							];

			setNewQuestion(newQuestion);

			for (var i = 0; i < 4; i++) {
				var id = "ans" + (i+1);
				setNewAnswer(id, answers[i]);
				setNewOnclickAttribute(id, answers[i], false);
			}

			q++;
			break;
		case 1:
			obj.q2 = ans;
			var newQuestion = "What's your favourite fruit?";
			var answers = [
							"orange",
							"banana",
							"kiwi",
							"apple"
							];

			setNewQuestion(newQuestion);
			
			for (var i = 0; i < 4; i++) {
				var id = "ans" + (i+1);
				setNewAnswer(id, answers[i]);
				setNewOnclickAttribute(id, answers[i], true);
			}

			setNewOnclickAttribute('ans5', "Null", true);
			q++
			break;
	}
}

function setNewQuestion(question){
	document.getElementById("question").innerHTML = question;
}


function setNewAnswer(id, answer){
	document.getElementById(id).innerHTML = answer;
}

function setNewOnclickAttribute(id, shortAnswer, lastQuestion){
	if (lastQuestion == false) {
		document.getElementById(id).setAttribute('onclick', "getAnswers('" + shortAnswer + "')");
	} else {
		document.getElementById(id).setAttribute('onclick', "showAnswers('" + shortAnswer + "')");
	}

}

function showAnswers(ans) {
	obj.q3 = ans;
	document.getElementById('result').innerHTML = JSON.stringify(obj);
	
}


var q = 0;
var obj= {};
$( document ).ready(function() {
  $("#test1").show();
  });


function getAnswers(ans){
	switch(q) {
		case 0:
			obj.q1 = ans;
			var current = document.getElementById('test1');
			current.id = 'test2';
			var next = document.getElementById('test2');

			document.getElementById('ans1').innerHTML = "test";
			document.getElementById('ans1').setAttribute('onclick', "showAnswers('test')");
			//current.style.display = "none";
			//next.style.display = "block";
			q++;
			break;
		case 1:
			break;
	}
}

function setNewQuestion(question){

}

function setNewID(current, next){

}

function setNewAnswer(id, answer){

}

function setNewOnclickAttribute(id, shortAnswer, lastQuestion){

}

function showAnswers(ans) {
	obj.q2 = ans;
	var current = document.getElementById('test2');
	document.getElementById('result').innerHTML = JSON.stringify(obj);
	
}
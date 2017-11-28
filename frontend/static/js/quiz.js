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
			var next = document.getElementById('test2');
			current.style.display = "none";
			next.style.display = "block";
			q++;
			break;
		case 1:
			break;
	}
}

function showAnswers(ans) {
	obj.q2 = ans;
	var current = document.getElementById('test2');
	document.getElementById('result').innerHTML = JSON.stringify(obj);
	
}
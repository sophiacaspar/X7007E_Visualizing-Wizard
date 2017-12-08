

function displayResult(){
	document.getElementById('quiz').style.display = "none";
	document.getElementById('result').style.display = "inline";
}


function viewResult(result){
				document.getElementById('result').innerHTML = JSON.stringify(result);
}
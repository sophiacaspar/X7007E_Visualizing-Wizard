

function displayResult(){
	document.getElementById('quiz').style.display = "none";
	document.getElementById('result').style.display = "inline";
}


function viewResult(result){
	document.getElementById('resultText').innerHTML = JSON.stringify(result);
}

function getTable() {
	var tableInput = document.getElementById("tableInput").value;
	//var newTable = generateScrollTable(tableInput);
	//var newTable = generateSquishTable(tableInput);
	//var newTable = generateRowCollapseTable(tableInput);
	var newTable = generateClickTable(tableInput);

	document.getElementById("exampleTable").innerHTML = newTable;
}

function generateScrollTable(tableInput){
	var lines = tableInput.split('\n');
	var newTable = "<div id='table-scroll' class='table-scroll'><div class='table-wrap'><table class='main-table'>";

	for (var i = 0; i < lines.length; i++) {
		var columns = lines[i].split(',');
		if (i == 0){
			newTable += "<thead><tr>";
			for (var j = 0; j < columns.length; j++) {
				if (j == 0) {
					newTable += "<th class='fixed-side' scope='col'>" + columns[j] + "</th>";
				} else {
					newTable += "<th scope='col'>" + columns[j] + "</th>";
				}
			}
			newTable += "</tr></thead><tbody>";
		} else {
			newTable += "<tr>";
			for (var j = 0; j < columns.length; j++) {
				if (j == 0) {
					newTable += "<td class='fixed-side'>" + columns[j] + "</td>";
				} else {
					newTable += "<td>" + columns[j] + "</td>";
				}
			}
			newTable += "</tr>";
		}
	}
	newTable += "</tbody></table></div></div>";

	return newTable;
}

function generateSquishTable(tableInput){
	var lines = tableInput.split('\n');
	var newTable = "<table class='responsive' data-compression='6' data-min='8' data-max='16' cellpadding='.1em' cellspacing='.2em'>";

	for (var i = 0; i < lines.length; i++) {
		var columns = lines[i].split(',');
		newTable += "<tr>";

		for (var j = 0; j < columns.length; j++) {
			newTable += "<td>" + columns[j] + "</td>";
		}
			newTable += "</tr>";
	}
	newTable += "</table>";

	return newTable;
}

function generateRowCollapseTable(tableInput){
	var lines = tableInput.split('\n');
	var newTable = "<table class='rwd-table'>";

		for (var i = 0; i < lines.length; i++) {
			var columns = lines[i].split(',');
			if (i == 0){
				newTable += "<tr>";
				for (var j = 0; j < columns.length; j++) {
					newTable += "<th>" + columns[j] + "</th>";
				}
				newTable += "</tr>";
			} else {
				newTable += "<tr>";
				for (var j = 0; j < columns.length; j++) {
					newTable += "<td data-th='" + lines[0].split(',')[j] + "'>" + columns[j] + "</td>";
				}
				newTable += "</tr>";
			}
	}
	newTable += "</table>";

	return newTable;
}

function generateClickTable(tableInput){
	var lines = tableInput.split('\n');
	var newTable = "<table class='tablesaw tablesaw-swipe' data-tablesaw-mode='swipe' data-tablesaw-minimap>";

	for (var i = 0; i < lines.length; i++) {
		var columns = lines[i].split(',');
		if (i == 0){
			newTable += "<thead><tr>";
			for (var j = 0; j < columns.length; j++) {
				if (j == 0) {
					newTable += "<th class='title tablesaw-swipe-cellpersist' scope='col' data-tablesaw-priority='persist'>" + columns[j] + "</th>";
				} else if (j == 1) {
					newTable += "<th scope='col' class>" + columns[j] + "</th>"
				} else {
					newTable += "<th scope='col' class='tablesaw-swipe-cellhidden'>" + columns[j] + "</th>";
				}
			}
			newTable += "</tr></thead><tbody>";
		} else {
			newTable += "<tr>";
			for (var j = 0; j < columns.length; j++) {
				if (j == 0) {
					newTable += "<td class='title tablesaw-swipe-cellpersist'>" + columns[j] + "</td>";
				} else if (j == 1) {
					newTable += "<td class>" + columns[j] + "</td>"
				} else {
					newTable += "<td scope='col' class='tablesaw-swipe-cellhidden'>" + columns[j] + "</td>";
				}
			}
			newTable += "</tr>";
		}
	}
	newTable += "</tbody></table>";

	return newTable;
}




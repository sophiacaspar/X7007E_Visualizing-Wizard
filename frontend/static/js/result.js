

function displayResult(){
	document.getElementById('quiz').style.display = "none";
	document.getElementById('result').style.display = "block";
}


function getTable(result) {
	var tableInput = document.getElementById("tableInput").value;
	var newTable;
	if (result == "click") {
		newTable = generateClickTable(tableInput);
	} else if (result == "rowCollapse") {
		newTable = generateRowCollapseTable(tableInput);
	} else if (result == "scroll") {
		newTable = generateScrollTable(tableInput);
	} else {
		newTable = generateSquishTable(tableInput);
	}

	document.getElementById("exampleTable").innerHTML = newTable;
	getCode(result, newTable);

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
	var newTable = "<table class='responsive' data-compression='6' data-min='8' data-max='16' cellpadding='.1em' cellspacing='.2em'>\n";

	for (var i = 0; i < lines.length; i++) {
		var columns = lines[i].split(',');
		newTable += "<tr>\n";

		for (var j = 0; j < columns.length; j++) {
			newTable += "&#9;<td>" + columns[j] + "</td>\n";
		}
			newTable += "</tr>\n";
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

function displayCode(evt, language) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(language).style.display = "block";
    evt.currentTarget.className += " active";
}

function getResult(result) {
    var i, resultContent;
    resultContent = document.getElementsByClassName("resultContent");
    for (i = 0; i < resultContent.length; i++) {
        resultContent[i].style.display = "none";
    }

	document.getElementById(result + "Result").style.display = "block";
    document.getElementById(result + "Explanation").style.display = "block";
    document.getElementById(result + "ProCon").style.display = "block";
    document.getElementById(result + "Think").style.display = "block";

    document.getElementById("generateTableBtn").setAttribute('onclick', "getTable('" + result + "')");
}

function getCode(result, table){
	var cssCode, jsCode;
	if (result == "rowCollapse") {
		cssCode = rowCollapseCSS;
		jsCode = "";
	} else if (result == "click") {
		cssCode = clickCSS;
		jsCode = clickJS;
	} else if (result == "scroll") {
		cssCode = scrollCSS;
		jsCode = scrollJS;
	} else {
		cssCode = squishCSS;
		jsCode = squishJS;
	}
	document.getElementById("CSS").innerHTML = cssCode;
	document.getElementById("JS").innerHTML = jsCode;
	document.getElementById("HTML").innerHTML = table;
}




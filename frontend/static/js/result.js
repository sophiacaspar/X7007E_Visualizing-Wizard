

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

	var instructionTable = "<b>Minska webbläsarens storlek för att se resultatet.</b><br><br>" + newTable;
	document.getElementById("exampleTable").innerHTML = instructionTable;
	getCode(result, newTable);

}

function displayUncertain(){
	document.getElementById("resultGreeting").innerHTML = "Dina svar var svåra att generera ett resultat till och däför rekommenderas tabell-lösningen:"
}

function generateScrollTable(tableInput){
	var lines = tableInput.split('\n');
	var newTable = "<div id='table-scroll' class='table-scroll'>\n&#9;<div class='table-wrap'>\n&#9;<table class='main-table'>\n";

	for (var i = 0; i < lines.length; i++) {
		var columns = lines[i].split(',');
		if (i == 0){
			newTable += "<thead>\n&#9;<tr>\n";
			for (var j = 0; j < columns.length; j++) {
				if (j == 0) {
					newTable += "&#9;<th class='fixed-side' scope='col'>" + columns[j] + "</th>\n";
				} else {
					newTable += "&#9;<th scope='col'>" + columns[j] + "</th>\n";
				}
			}
			newTable += "</tr>\n</thead>\n<tbody>\n";
		} else {
			newTable += "<tr>\n";
			for (var j = 0; j < columns.length; j++) {
				if (j == 0) {
					newTable += "&#9;<td class='fixed-side'>" + columns[j] + "</td>\n";
				} else {
					newTable += "&#9;<td>" + columns[j] + "</td>\n";
				}
			}
			newTable += "</tr>\n";
		}
	}
	newTable += "</tbody>\n</table>\n</div>\n</div>";

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
	var newTable = "<table class='rwd-table'>\n";

		for (var i = 0; i < lines.length; i++) {
			var columns = lines[i].split(',');
			if (i == 0){
				newTable += "<tr>\n";
				for (var j = 0; j < columns.length; j++) {
					newTable += "&#9;<th>" + columns[j] + "</th>\n";
				}
				newTable += "</tr>\n";
			} else {
				newTable += "<tr>\n";
				for (var j = 0; j < columns.length; j++) {
					newTable += "&#9;<td data-th='" + lines[0].split(',')[j] + "'>" + columns[j] + "</td>\n";
				}
				newTable += "</tr>\n";
			}
	}
	newTable += "</table>";

	return newTable;
}

function generateClickTable(tableInput){
	var lines = tableInput.split('\n');
	var newTable = "<table class='tablesaw tablesaw-swipe' data-tablesaw-mode='swipe' data-tablesaw-minimap>\n";

	for (var i = 0; i < lines.length; i++) {
		var columns = lines[i].split(',');
		if (i == 0){
			newTable += "<thead>\n&#9;<tr>\n";
			for (var j = 0; j < columns.length; j++) {
				if (j == 0) {
					newTable += "&#9;<th class='title tablesaw-swipe-cellpersist' scope='col' data-tablesaw-priority='persist'>" + columns[j] + "</th>\n";
				} else if (j == 1) {
					newTable += "&#9;<th scope='col' class>" + columns[j] + "</th>\n"
				} else {
					newTable += "&#9;<th scope='col' class='tablesaw-swipe-cellhidden'>" + columns[j] + "</th>\n";
				}
			}
			newTable += "</tr>\n</thead>\n<tbody>\n";
		} else {
			newTable += "<tr>\n";
			for (var j = 0; j < columns.length; j++) {
				if (j == 0) {
					newTable += "&#9;<td class='title tablesaw-swipe-cellpersist'>" + columns[j] + "</td>\n";
				} else if (j == 1) {
					newTable += "&#9;<td class>" + columns[j] + "</td>\n"
				} else {
					newTable += "&#9;<td scope='col' class='tablesaw-swipe-cellhidden'>" + columns[j] + "</td>\n";
				}
			}
			newTable += "</tr>\n";
		}
	}
	newTable += "</tbody>\n</table>";

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




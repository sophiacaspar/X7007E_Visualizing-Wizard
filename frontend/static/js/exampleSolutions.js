function displaySolutionCode(evt, language) {
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

function getSquishCode(){
	document.getElementById("squishCSS").innerHTML = squishCSS;
	document.getElementById("squishJS").innerHTML = squishJS;
	document.getElementById("squishHTML").innerHTML = squishHTML;
}

function getRowCollapseCode(){
	document.getElementById("rowCollapseCSS").innerHTML = rowCollapseCSS;
	document.getElementById("rowCollapseJS").innerHTML = rowCollapseJS;
	document.getElementById("rowCollapseHTML").innerHTML = rowCollapseHTML;
}

function getClickCode(){
	document.getElementById("clickCSS").innerHTML = clickCSS;
	document.getElementById("clickJS").innerHTML = clickJS;
	document.getElementById("clickHTML").innerHTML = clickHTML;
}

function getScrollCode(){
	document.getElementById("scrollCSS").innerHTML = scrollCSS;
	document.getElementById("scrollJS").innerHTML = scrollJS;
	document.getElementById("scrollHTML").innerHTML = scrollHTML;
}
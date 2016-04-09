function ajax(txt) {
	if(window.XMLHttpRequest)
		ajaxObj = new XMLHttpRequest();
	else
		ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
	
	ajaxObj.onreadystatechange = function() {
		if(ajaxObj.readyState==4) {
			parseSettings(ajaxObj.responseText);
		}
	}
	ajaxObj.open("GET",txt,true);
	ajaxObj.send();
}

window.onload = function () {
	ajax("preferences.txt");
}

var settings = {};
var settingsAreReady = false;
function parseSettings(txt) {
	arr = txt.split("\n");
	for (var i=0; i<arr.length; i++) {
		arr[i] = arr[i].split(": ");
		if(arr[i].length == 2) {
			settings[arr[i][0]] = arr[i][1].split(", ");
		}
		else {
			alert("Error In Preferences");
		}
	}
	settingsAreReady = true;

	$("#settings-icon").css("display", "block");
	$("#settings-icon").click(function () {
		if($("#settings").is(":visible"))
			$("#settings").hide();
		else
			$("#settings").show();
	});

	makeApiCalls();
}

function makeApiCalls() {
	var str = "<table><tbody>";
	for (var i=0; i<settings["active"].length; i++) {
		str += "<tr><td><a href=\"" + settings["active"][i] + "/index.html\">" + settings["active"][i] + "</a></td></tr>";
	}
	str += "</tbody></table>";
	$("#mainTableDiv").html(str);

	// todo: API calls
	api();
}

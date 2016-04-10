var username = "";
var password = "";

onload = function() {
	ajax("user-info.txt");
}

function isValidString(str) {
	return !(str == undefined || str == null || str == "");
}

function login() {
	if(document.getElementById("login-link").innerHTML == "Login") {
		// log in
		username = prompt("username:");
		password = prompt("password:");
		if(isValidString(username) || isValidString(password))
			document.getElementById("login-link").innerHTML = "Sign Out of " + username + "?";
		else
			alert("Invalid Username Or Password");
	}
	else {
		// sign out
		username = "";
		password = "";
		document.getElementById("login-link").innerHTML = "Login";
	}
}

function ajax(txt) {
	if(window.XMLHttpRequest)
		ajaxObj = new XMLHttpRequest();
	else
		ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
	
	ajaxObj.onreadystatechange = function() {
		if(ajaxObj.readyState==4) {
			if(ajaxObj.responseText != "") {
				var arr = ajaxObj.responseText.split("\n");
				if (arr.length == 2) {
					username = arr[0];
					password = arr[1];
					if(username != "" && password != "") {
						document.getElementById("login-link").innerHTML = "Sign Out of " + username + "?";
					}
				}
			}
			
		}
	};
	ajaxObj.open("GET",txt,true);
	ajaxObj.send();
}

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
		if(isValidString(username) || isValidString(password)) {
			setCookie("username", username, 365);
			setCookie("password", password, 365);
			document.getElementById("login-link").innerHTML = "Sign Out of " + username + "?";
		}
		else
			alert("Invalid Username Or Password");
	}
	else {
		// sign out
		username = "";
		password = "";
		setCookie("username", username, 365);
		setCookie("password", password, 365);
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
						setCookie("username", username, 365);
						setCookie("password", password, 365);
					}
				}
			}
			
		}
	};
	ajaxObj.open("GET",txt,true);
	ajaxObj.send();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
var un = document.getElementById('usernameLoginInput'); 
var pw = document.getElementById('passwordLoginInput'); 
un.value = username; 
pw.value = password; 
$('#loginModule form')[0].submit(); 

var paragraphs = document.getElementsByTagName('p'); 
var schiller_index = 0; 
var dining_index = 0;
for (i = 0; i < paragraphs.length -1; i++) {
	if (paragraphs[i].innerHTML.indexOf("Schillers-Student:") > -1) {
		schiller_index = i;
	} else if (paragraphs[i].innerHTML.indexOf("Dining Dollars:") > -1) {
		dining_index = i;
	}
}

var lists = document.getElementsByTagName("li");
var week_index = 0;

for (i = 0; i < lists.length - 1; i++) {
	if (lists[i].innerHTML.indexOf("Meals remaining this week:") > -1) {
		week_index = i;
		break;
	}
}

var schiller_string = paragraphs[schiller_index].textContent;
var dining_string = paragraphs[dining_index].textContent;
var week_string = paragraphs[week_index].textContent;

function ajax(txt) {
	if(window.XMLHttpRequest)
		ajaxObj = new XMLHttpRequest(); 
	else 
		ajaxObj = new ActiveXObject('Microsoft.XMLHTTP');
	ajaxObj.onreadystatechange = function() {
		if(4==4) {
			alert(ajaxObj.responseText);
		}
	} 
	ajaxObj.open('POST',txt,true);
	alert(txt);
	ajaxObj.send();
} 
ajax('http://thomasredding.nfshost.com/carlapp/write.php?username=' + username + '&schillers=' + schiller_string +'&dining_dollars=' + dining_string + '&meals=' + week_string);
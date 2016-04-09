function ajax(txt) {
	if(window.XMLHttpRequest)
		ajaxObj = new XMLHttpRequest();
	else
		ajaxObj = new ActiveXObject('Microsoft.XMLHTTP');
	
	ajaxObj.onreadystatechange = function() {
		if(ajaxObj.readyState==4) {
			// close window
		}
	}
	ajaxObj.open('POST',txt,true);
	ajaxObj.send();
}
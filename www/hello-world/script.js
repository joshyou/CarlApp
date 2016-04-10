var username = "reddingt";
var password = "Matrix1010";

document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
	// start server request
    var ref = window.open('https://apps.carleton.edu/login/?dest_page=https%3A%2F%2Fapps.carleton.edu%2Fcampus%2Fonecard%2Fdashboard%2F&msg_uname=onecard_login_blurb&redir_link_text=the%20OneCard%20dashboard', '_blank', 'location=yes,hidden=yes');
    ref.addEventListener('loadstart', function(event) {
    	// runs when InAppBrowser starts
    });
    ref.addEventListener('loadstop', function(event) {
        var elseIfCode = "function isNum(c) { return c in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; } function fuzzyParseFloat(txt) { for (var i=0; i<txt.length; i++) { if (!isNum(txt.charAt(i))) {txt = txt.substr(1); i--;} else {break;}} return parseFloat(txt); } function getSub(txt) { for (var i=0; i<txt.length; i++) { if(txt.charAt(i) == '<') { return txt.substr(0, i) }} return txt;} var str = document.getElementById('content').innerHTML; var schillers = fuzzyParseFloat(getSub(str.split('Schillers-Student:')[1])); var dining_dollars = fuzzyParseFloat(getSub(str.split('Dining Dollars:')[1])); var meals = fuzzyParseFloat(getSub(str.split('Meals remaining this week:')[1])); window.location.href = 'http://thomasredding.nfshost.com/carlapp/write.php?username=" + username + "&schillers=' + schillers + '&dining_dollars=' + dining_dollars + '&meals=' + meals;";
    	ref.executeScript({
            code: "if (window.location.href == 'https://apps.carleton.edu/login/?dest_page=https%3A%2F%2Fapps.carleton.edu%2Fcampus%2Fonecard%2Fdashboard%2F&msg_uname=onecard_login_blurb&redir_link_text=the%20OneCard%20dashboard') {var un = document.getElementById('usernameLoginInput'); var pw = document.getElementById('passwordLoginInput'); un.value = '" + username + "'; pw.value = '" + password + "'; $('#loginModule form')[0].submit();} else if (window.location.href.search('carleton') > 0) {" + elseIfCode + "}"
        });
        setTimeout(ref.close, 60000);
    });
    ref.addEventListener('loaderror', function(event) {
        // do nothing
    });
    ref.addEventListener('exit', function(event) {
        // runs when InAppBrowser is closed
    });

    onDeviceReadyB();
}

var checkNum = 0;
setTimeout(checkServer, 5000);
function checkServer() {
    ajax("http://thomasredding.nfshost.com/carlapp/read.php?username=" + username);
    checkNum++;
}

function ajax(txt) {
    if(window.XMLHttpRequest)
        ajaxObj = new XMLHttpRequest();
    else
        ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
    
    ajaxObj.onreadystatechange = function() {
        if(ajaxObj.readyState==4) {
            if (ajaxObj.responseText ==  "error" && checkNum < 4) {
                setTimeout(checkServer, 5000);
            }
            else {
                updateData(ajaxObj.responseText)
            }
        }
    };
    ajaxObj.open("GET",txt,true);
    ajaxObj.send();
}

function win(writer) {
	writer.truncate(0);
	writer.write(txt);
}

var ramCache = "";
function updateData(txt) {
	if (txt == "")
		return;

	// save to cache
	ramCache = txt;
    saveRamCache();

    document.getElementById("out").innerHTML = txt + ":" + Math.random();
}



/* caching stuff */

// Steps:

function fail(err) {
    alert("error: " + err);
}

// 2. Cordova is ready, get file system
function onDeviceReadyB() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

// 3. got file system, get cache.txt file
function gotFS(fileSystem) {
    fileSystem.root.getFile("cache.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

// 4. got cache.txt, get fileWriter
var globalFileEntry;
function gotFileEntry(fileEntry) {
    globalFileEntry = fileEntry;
}

function saveRamCache() {
    globalFileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        // console.log("contents of file now 'some sample text'");
        writer.onwriteend = function(evt) {
            /*
            console.log("contents of file now 'some sample'");
            writer.seek(4);
            writer.write(" different text");
            */
            writer.onwriteend = function(evt){
                // console.log("contents of file now 'some different text'");
            }
        };
    };
    writer.write(ramCache);
}


document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    var ref = window.open('https://apps.carleton.edu/login/?dest_page=https%3A%2F%2Fapps.carleton.edu%2Fcampus%2Fonecard%2Fdashboard%2F&msg_uname=onecard_login_blurb&redir_link_text=the%20OneCard%20dashboard', '_blank', 'location=yes');
    ref.addEventListener('loadstart', function(event) {
    	// todo
    });
    ref.addEventListener('loadstop', function(event) {
    	var username = "reddingt";
    	var password = "Matrix1010";
    	ref.executeScript({
            code: "var un = document.getElementById('usernameLoginInput'); var pw = document.getElementById('passwordLoginInput'); un.value = '" + username + "'; pw.value = '" + password + "';"
        });
    });
    ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
    ref.addEventListener('exit', function(event) { alert(event.type); });
}
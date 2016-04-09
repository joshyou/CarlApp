var un = document.getElementById('usernameLoginInput'); 
var pw = document.getElementById('passwordLoginInput'); 
un.value = '" + username + "'; 
pw.value = '" + password + "'; 
$('#loginModule form')[0].submit();

var paragraphs = document.getElementsByTagName("p");
var schiller_index = 0;
var dining_index = 0;

for (i = 0; i < paragraphs.length -1; i++) {
    if (paragraphs[i].innerHTML.indexOf("Schillers-Student:") > -1) {
        schiller_index = i;
    } else if (paragraphs[i].innerHTML.indexOf("Dining Dollars:") > -1) {
        dining_index = i;
    }
}

var lists = document.getElementsByTagName("li")
var today_index = 0;
var week_index = 0;

for (i = 0; i < lists.length - 1; i++) {
    if (lists[i].innerHTML.indexOf("Meals remaining this week:") > -1) {
        week_index = i;
        break;
    }
}

var schiller_string = paragraphs[schiller_index].innerHTML;
var dining_string = paragraphs[dining_index].innerHTML;
//var today_string = paragraphs[today_index].innerHTML;
var week_string = paragraphs[week_index].innerHTML;
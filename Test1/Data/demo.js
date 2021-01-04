$(document).ready(function() {
	//$('#jobtitle').select2();
	dispData();
});

function IsEmailValid(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(regex.test(email) == false) 
		return false;
	else 
		return true;
}

function IsAgeValid(bdate) {
	if( bdate.val() == "") {
		alert("Birth date field must be filled out");
	}
	else {
		var today = new Date();
		var b = new Date(bdate.val());
		var diff = today - b ;
		diff /= 31556952000;
		var age = Math.floor(diff);
		return age;
	}
	bdate.focus();
	return 0;
}

function IsBGroupValid(bgrop) {
    var regex = /^[ABO]{1,2}[+]{1}$/i;
	if( bgrop.val() == "") {
		alert("Blood group field must be filled out");
	}
	else {
		if(regex.test(bgrop.val()) == false) {
			alert("Blood group must be correct.");
		}
		else {
			return true;
		}
	}
	bgrop.focus();
	return 0;
}


function changeTab(active,noactive) {
	var firstTab = document.getElementById(active+"-tab");
	firstTab.classList.add ("active");
	firstTab.setAttribute("aria-selected","true");
	var firstBody = document.getElementById(active);
	firstBody.classList.add ("show");
	firstBody.classList.add ("active");
	var secondTab = document.getElementById(noactive+"-tab");
	secondTab.classList.remove ("active");
	secondTab.setAttribute("aria-selected","false");
	var secondBody = document.getElementById(noactive);
	secondBody.classList.remove ("show");
	secondBody.classList.remove ("active");
}

function validateCFrom() {
    var fname = $('#fname');
	var email = $('#emailadd');
    var bdate = $('#bdate');
    var bgroup = $('#bgroup');
    var phoneno = $('#phoneno');
    var jobtitle = $('#jobtitle');
	var ccode = $('#ccode');
	if (fname.val() != "" ) {
		if( email.val() != "") {
			if(IsEmailValid(email.val())) {
				var age = IsAgeValid(bdate);
				if(age) {
					if(IsBGroupValid(bgroup)) {
						var detail = localStorage.getItem(email.val());
						if( detail == null) {
							var user = {"email" : email.val() ,"fname" : fname.val() , "age" : age ,"bgroup" : bgroup.val() ,"ccode" : ccode.val() , "phoneno" : phoneno.val() , "jobtitle" : jobtitle.val() , "bdate" : bdate.val() };
							user = JSON.stringify(user);
							localStorage.setItem(email.val(),user);
							document.forms["createform"].reset();
							changeTab("pills-display","pills-create");
							dispData();
						}
						else {
							alert("email address already taken");
							email.focus();
						}
					}
				}
            }
			else
				alert("Email Address must be correct.");
		}
		else {
			alert("Email field must be filled out");
			email.focus();
		}
    }
    else
    {
        alert("Full name field must be filled out");
		fname.focus();
    }
	return false;
}

function getEmail() {
	var mails = [];
	for(var key in localStorage)
	{
		if(IsEmailValid(key))
			mails.push(key);
	}
	return mails;
}

function dispData() {
	var details = getEmail();
	var table;
	for( var i=0; i<details.length; i++) {
		detail = localStorage.getItem(details[i]);
		detail = JSON.parse(detail);
		phone = detail.ccode+detail.phoneno;
		table += "<tr><td>" + detail.email + "</td><td>" + detail.fname + "</td><td>" + detail.age + "</td><td>" + detail.bgroup + "</td><td>" + phone + "</td><td>" + detail.jobtitle + "</td></tr>";
	}
	$("#displayemp > tbody").html(table);
	$('#displayemp').DataTable();
}

function dispSelectData(){
	selEmail = document.getElementById("mails");
	selEmail.length = 1;
	selEmail.options[0].selected = 'selected';
	$("#editVis").hide();
	var details = getEmail();
	for( var i=0; i<details.length; i++) {
		selEmail.options[selEmail.options.length] = new Option(details[i],details[i]);
	}
}

function dispDSelectData(){
	selEmail = document.getElementById("dmails");
	selEmail.length = 1;
	selEmail.options[0].selected = 'selected';
	var details = getEmail();
	for( var i=0; i<details.length; i++) {
		selEmail.options[selEmail.options.length] = new Option(details[i],details[i]);
	}
}

function delEmp() {
	mail = $("#dmails").val();
	localStorage.removeItem(mail);
	document.forms["deleteform"].reset();
	changeTab("pills-display","pills-delete");
	dispData();
	return false;
}

$("#pills-edit  #mails").change( function() {
	$("#editVis").show();
	mail = $("#mails").val();
	detail = localStorage.getItem(mail);
	detail = JSON.parse(detail);
	$("#efname").val(detail.fname);
	$("#ebdate").val(detail.bdate);
	$("#ebgroup").val(detail.bgroup);
	$("#ephoneno").val(detail.phoneno);
	$("#ejobtitle").val(detail.jobtitle);
	$("#eccode").val(detail.ccode);
});

function editEmp() {
    var fname = $('#efname');
	var email = $('#mails');
    var bdate = $('#ebdate');
    var bgroup = $('#ebgroup');
    var phoneno = $('#ephoneno');
    var jobtitle = $('#ejobtitle');
	var ccode = $('#eccode');
	if (fname.val() != "" ) {
		var age = IsAgeValid(bdate);
		if(age) {
			if(IsBGroupValid(bgroup)) {
				var user = {"email" : email.val() ,"fname" : fname.val() , "age" : age ,"bgroup" : bgroup.val() ,"ccode" : ccode.val() , "phoneno" : phoneno.val() , "jobtitle" : jobtitle.val() , "bdate" : bdate.val() };
				user = JSON.stringify(user);
				localStorage.setItem(email.val(),user);
				document.forms["editform"].reset();
				changeTab("pills-display","pills-edit");
				dispData();
			}
		}
    }
    else
    {
        alert("Full name field must be filled out");
		fname.focus();
    }
	return false;
}
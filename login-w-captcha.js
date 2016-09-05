/*
** if(javascript is enabled){
*/
$(document).ready(function() {
	
	// REMOVE CAPTCHA
	$('.captcha').remove();
	
	// insert a timestamp in the form
	$.get("key.php", function(txt){
		$("#FormLogin").append('<input type="hidden" id="ts" name="ts" value="'+txt+'" />');
	});
	
	// post form on submit if fields are not empty
	$('#FormLogin').on('submit', function(e){
		e.preventDefault();
		
		var pass = $("#password").val();
		var login = $("#login").val();
		var ts = $("#ts").val();
		//var allways = $("#allways").val()

		// check if all fields are not empty
		if(pass=='' || login=='' || ts==''){
			alert("Please, login && password at list! o_0")
		}else{          
			$.ajax({
				type: "POST",
				url: "login.php",
				data: "password="+pass+"&email="+login+"&ts="+ts,
				success: function(msg){	
					if(msg == "True"){
						alert( "Wellcome! Wait you go redirect to the right page, click OK ...");
						window.location = 'wellcome.php'; // the welcome page! redirect to the right page, the login is correct 
					}else{
						alert(msg);
					}
				}
			});
		}
	});
});		
/*
** }else{
*/
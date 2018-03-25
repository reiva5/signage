$(document).ready(function() { 
	$('body').bootstrapMaterialDesign();
	$('#signin').click(function() {
		alert("iya-iya");
		let user = $('#username').val();
		let pass = $('#password').val();
		alert(user + " " + pass);
		$.post("/login",
		{
			username: user,
			password: pass
		},
		function(data, status){
			alert(data);
			if (data == 'valid'){
				window.location.href = "/admin_dashboard";
			} else {
				alert("password dan username salah cuk");
			}
		});
	});
});
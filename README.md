# login-without-captcha
Como criar formulários de login sem captcha mas seguros, evitando spam e bots.

# Como funciona
Geramos um timestamp e guardamos esse valor num cookie junto com uma chave privada, depois retornamos o valor do timestamp. Chamamos esse arquivo de ` key.php `:

```
<?php

$mt = mktime();

// Insert Cookie
setcookie('key', md5('Login with/out Captcha'.$mt), 0, '/');

// Expires in past
header("Expires: Mon, 6 Dec 1993 00:39:00 GMT");

// Always modified
header("Last-Modified: ".gmdate("D, d M Y H:i:s"). "GMT");

// HTTP/1.1
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Conrtol: post-check=0, pre-check=0", false);

// HTTP/1.0
header("Pragma: no-cache");

echo $mt;

?>
```

Através de javascript na página html de login usamos o método GET para chamar ` key.php ` e incluímos o valor retornado em um campo hidden no formulário. No exemplo abaixo nosso ` id ` do formulário é ` #FormLogin ` e o campo ` hidden ` é chamado de ` ts `.

```
// insert a timestamp in the form
$.get("key.php", function(txt){
	$("#FormLogin").append('<input type="hidden" id="ts" name="ts" value="'+txt+'" />');
});
```

Enviamos o formulário com ajax utilizando o método POST.

```
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
```

Na página que recebe a requisição POST ` login.php `, você deve incluir uma verificação no timestamp. 
Defina um valor máximo, em segundos, para preenchimento e postagem do formulário ` $seconds = 10*6; `, aqui deixei 60 segundos.

```
<? php

$proceed = "false";
$seconds = 10*6;

if(isset($_POST['ts']) && isset($_COOKIE['key']) && $_COOKIE['key'] == md5('Form with/out Captcha'.$_POST['ts'])){$procced = "true";}

if(!$proceed){
	echo "Suspicius activity o_0!";
	exit(-1);
}

if((int)$_POST['ts'] + $seconds < mktime()){
	echo "Too much time elapsed!";
	exit(-1);
}

?>
```
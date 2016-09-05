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
<?php 

	unset($_SESSION);

	$datos_cookie = session_get_cookie_params();

	setcookie( session_name(), NULL, time()-999999, $datos_cookie["path"], $datos_cookie["domain"], $datos_cookie["secure"],
	$datos_cookie["httponly"]);
	session_destroy(); // destruyo la sesión
	echo "<br>Has cerrado la sesión. Vuelve cuando quieras.<br>";

	 ?>

<?php
// === KONFIGURACE ===
$to = "robinsladek@seznam.cz";
$subject = "Nová zpráva z webu Autodoprava Deniska";

// === OŠETŘENÍ VSTUPŮ ===
$name = htmlspecialchars(trim($_POST['name'] ?? ''));
$phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
$email = htmlspecialchars(trim($_POST['email'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

if (empty($name) || empty($phone) || empty($message)) {
  http_response_code(400);
  echo "Vyplňte prosím všechna povinná pole.";
  exit;
}

// === OBSAH E-MAILU ===
$body = "
<b>Jméno a příjmení:</b> $name<br>
<b>Telefon:</b> $phone<br>
<b>E-mail:</b> $email<br><br>
<b>Zpráva:</b><br>
$message
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Autodoprava Deniska <no-reply@".$_SERVER['SERVER_NAME'].">\r\n";
$headers .= "Reply-To: $email\r\n";

// === ODESLÁNÍ ===
if (mail($to, $subject, $body, $headers)) {
  echo "Zpráva byla úspěšně odeslána. Děkujeme!";
} else {
  http_response_code(500);
  echo "Došlo k chybě při odesílání e-mailu. Zkuste to prosím znovu.";
}
?>

<?php

/* https://api.telegram.org/bot5474044461:AAFZNLurWL4Zre1s-VnIdui7M0seerpUFUw/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */


$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$date = $_POST['date'];

$dateFormated = date("d.m.Y", strtotime($date));

$token = "5474044461:AAFZNLurWL4Zre1s-VnIdui7M0seerpUFUw";
// $chat_id = "https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXXXX/getUpdates";
$chat_id = "-653223399";
$arr = array(
  'Имя пользователя: ' => $name . ';',
  'Телефон: ' => $phone . ';',
  'Email:' => $email . ';',
  'Дата:' => $dateFormated . ';',
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: index.html');
} else {
  echo "Error";
}
?>

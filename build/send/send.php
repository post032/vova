<!-- $turl = "https://api.telegram.org/bot830404368:AAEgztZ9d7NVBZK-6TR-tk5z6CvJDaO3i3U/sendMessage?
chat_id=-286836422&text=".$tmsg; -->

<?php
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $title = $_POST['title'];

  $token = "830404368:AAEgztZ9d7NVBZK-6TR-tk5z6CvJDaO3i3U";
  $chat_id = "-286836422";
  $arr = array(
    'Имя пользователя: ' => $name,
    'Телефон: ' => $phone,
    'Заказ ' => $title
  );

  foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
  };

  $sendToTelegram = fopen("https://api.telegram.org/bot830404368:AAEgztZ9d7NVBZK-6TR-tk5z6CvJDaO3i3U/sendMessage?chat_id=-286836422&parse_mode=html&text={$txt}","r");

  if ($sendToTelegram) {
    echo "сообщение успешно отправлено";
  } else {
    echo "Error";
  }

  ?>


  <!-- $name = htmlspecialchars($name);
  $phone = htmlspecialchars($phone);
  $name = urldecode($name);
  $phone = urldecode($phone);
  $name = trim($name);
  $phone = trim($phone);
  if (mail("адрес получателя", "Заявка с сайта", "ФИО:".$name.". телефон: ".$phone ,"From: адрес-отправки \r\n"))
   {     echo "сообщение успешно отправлено";
  } else {
      echo "при отправке сообщения возникли ошибки";
  } -->

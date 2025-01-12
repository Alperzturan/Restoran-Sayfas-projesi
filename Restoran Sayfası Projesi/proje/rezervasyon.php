<?php
// veiratabanına bağlama
$connect = new mysqli('localhost', 'root', '', 'reservations');

// hata var  mı yok  ju kontrol
if ($connect->connect_error) {
    die("Bağlantı başarısız: " . $connect->connect_error);
}

// rezervasyondan gelen  erileri alma
$name = $_POST['name'];
$phone = $_POST['phone'];
$reservation_date = $_POST['date'];
$reservation_time = $_POST['time'];

// database e gönderme
$sql = "INSERT INTO reservations (name, phone, reservation_date, reservation_time) 
        VALUES ('$name', '$phone', '$reservation_date', '$reservation_time')";
        
//olduysa tamamlandı sayfasına gnderme
if ($connect->query($sql) === TRUE) {
    echo '<meta http-equiv="refresh" content="0;url=rezervasyon_başarılı.html">';
    exit();
} else {
    echo "Hata: " . $sql . "<br>" . $connect->error;
}

//sql bağlatısını kapama
$connect->close();
?>





<?php
// Gelen verileri al (boşsa hata fırlatmamak için trim ile kontrol ediyoruz)
$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');

// E-postanın '@' işaretinden önceki kısmını (Öğrenci Numarasını) alıyoruz
$ogrenciNo = explode('@', $email)[0];

// Yönerge Kuralı: Şifre, öğrenci numarası ile birebir aynı olmalıdır
if ($email !== '' && $password !== '' && $password === $ogrenciNo) {
    // Başarılı Giriş Durumu
    echo "<!DOCTYPE html>
    <html lang='tr'>
    <head><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' rel='stylesheet'></head>
    <body class='bg-light d-flex align-items-center justify-content-center min-vh-100'>
        <div class='text-center p-5 card shadow-lg rounded-4 border-0 border-top border-5 border-success'>
            <h1 class='text-success display-5 fw-bold mb-3'>Giriş Başarılı!</h1>
            <h3 class='text-secondary'>Hoşgeldiniz <span class='text-dark'>$ogrenciNo</span></h3>
            <a href='index.html' class='btn btn-outline-dark mt-4 px-4 py-2'>Ana Sayfaya İlerle</a>
        </div>
    </body>
    </html>";
} else {
    // Başarısız Giriş: Hata mesajı ile login.html sayfasına Javascript yönlendirmesi
    echo "<script>
        alert('Hatalı giriş! Şifreniz öğrenci numaranız ile aynı olmalıdır.');
        window.location.href = 'login.html';
    </script>";
}
?>
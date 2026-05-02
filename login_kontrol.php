<?php
// Hocanın istediği sisteme kayıtlı öğrenci bilgileri (Senin gerçek bilgilerinle güncellendi)
$dogru_email = "zehra.aksu@ogr.sakarya.edu.tr"; // Doğru e-posta adresin eklendi
$dogru_sifre = "b251210066"; // Şifren öğrenci numaran olarak kaldı
$ogrenci_no = "b251210066";

// Formdan veriler POST yöntemiyle geldi mi kontrol et
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Gelen verileri al ve boşlukları temizle
    $gelen_email = trim($_POST["email"]);
    $gelen_sifre = trim($_POST["sifre"]);

    // Eğer verilerden biri boşsa (JavaScript'i aşıp geldiyse)
    if (empty($gelen_email) || empty($gelen_sifre)) {
        // Hata mesajıyla login sayfasına geri fırlat
        header("Location: login.html?hata=bos");
        exit();
    }

    // Bilgiler doğru mu diye karşılaştır
    if ($gelen_email === $dogru_email && $gelen_sifre === $dogru_sifre) {
        // Başarılı giriş: Hoşgeldiniz sayfasını göster
        ?>
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Başarılı Giriş</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-light d-flex justify-content-center align-items-center vh-100">
            <div class="text-center">
                <div class="alert alert-success p-5 shadow border-0" role="alert">
                    <h1 class="display-4 fw-bold">Hoşgeldiniz <?php echo $ogrenci_no; ?></h1>
                    <p class="lead mt-3">Sisteme güvenli bir şekilde giriş yaptınız.</p>
                    <a href="index.html" class="btn btn-outline-success mt-4">Ana Sayfaya Dön</a>
                </div>
            </div>
        </body>
        </html>
        <?php
    } else {
        // Bilgiler yanlışsa hata mesajıyla login sayfasına geri fırlat
        header("Location: login.html?hata=yanlis");
        exit();
    }

} else {
    // Sayfaya form doldurulmadan direkt URL'den girilmeye çalışıldıysa ana sayfaya kov
    header("Location: index.html");
    exit();
}
?>
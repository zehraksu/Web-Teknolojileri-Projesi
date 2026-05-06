<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Mesaj Gönderildi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light py-5">
    <div class="container">
        <div class="card shadow-lg border-0 rounded-4 mx-auto" style="max-width: 600px;">
            <div class="card-header bg-success text-white text-center py-4 rounded-top-4">
                <h3 class="mb-0">Mesajınız Başarıyla İletildi!</h3>
            </div>
            <div class="card-body p-4">
                <p class="text-muted text-center mb-4">Göstermiş olduğunuz ilgi için teşekkür ederim. Gönderdiğiniz bilgiler sunucu tarafından alınmıştır:</p>
                
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr><th class="w-25">Ad</th><td><?php echo htmlspecialchars($_POST['ad'] ?? ''); ?></td></tr>
                        <tr><th>Soyad</th><td><?php echo htmlspecialchars($_POST['soyad'] ?? ''); ?></td></tr>
                        <tr><th>E-Posta</th><td><?php echo htmlspecialchars($_POST['email'] ?? ''); ?></td></tr>
                        <tr><th>Telefon</th><td><?php echo htmlspecialchars($_POST['telefon'] ?? ''); ?></td></tr>
                        <tr><th>Cinsiyet</th><td><?php echo htmlspecialchars($_POST['cinsiyet'] ?? ''); ?></td></tr>
                        <tr><th>Konu</th><td><?php echo htmlspecialchars($_POST['konu'] ?? ''); ?></td></tr>
                        <tr><th>Mesaj</th><td><?php echo nl2br(htmlspecialchars($_POST['mesaj'] ?? '')); ?></td></tr>
                    </tbody>
                </table>
                <div class="text-center mt-4">
                    <a href="iletisim.html" class="btn btn-outline-success">Forma Geri Dön</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
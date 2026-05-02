<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gelen Form Verileri</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-5">
    <div class="container">
        <h2 class="text-success border-bottom pb-2 mb-4">PHP Sunucusuna Ulaşan Veriler</h2>
        
        <div class="card shadow-sm border-0">
            <div class="card-body">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>Form Alanı</th>
                            <th>Girilen Veri</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        // Form POST metoduyla gönderildiyse işlemleri yap
                        if ($_SERVER["REQUEST_METHOD"] == "POST") {
                            // Gelen her bir veriyi döngüye al ve tabloya yazdır
                            foreach ($_POST as $anahtar => $deger) {
                                // Güvenlik için htmlspecialchars kullanıyoruz
                                $guvenli_anahtar = htmlspecialchars($anahtar);
                                $guvenli_deger = htmlspecialchars(is_array($deger) ? implode(", ", $deger) : $deger);
                                
                                echo "<tr>";
                                echo "<td><strong>{$guvenli_anahtar}</strong></td>";
                                echo "<td>{$guvenli_deger}</td>";
                                echo "</tr>";
                            }
                        } else {
                            echo "<tr><td colspan='2' class='text-danger'>Hiçbir veri alınamadı. Lütfen formu kullanarak gelin.</td></tr>";
                        }
                        ?>
                    </tbody>
                </table>
                <a href="iletisim.html" class="btn btn-primary mt-3">İletişim Sayfasına Geri Dön</a>
            </div>
        </div>
    </div>
</body>
</html>
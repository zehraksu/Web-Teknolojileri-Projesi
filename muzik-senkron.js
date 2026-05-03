// Şarkı sözleri ve hangi saniyede (sn) ekranda çıkacakları.
// Buradaki saniyeleri (zaman) ve sözleri kendi şarkına göre değiştirebilirsin.
const sarkiSozleri = [
    { zaman: 0, metin: "🎶 (Müzik Başlıyor) 🎶" },
    { zaman: 5, metin: "Bir söz bitişi gibi son buldu sevişler..." },
    { zaman: 12, metin: "Bir yaz güneşi gibi eritir hep bu gidişler..." },
    { zaman: 18, metin: "İncelikler yüzünden..." },
    { zaman: 24, metin: "🎶 🎶 🎶" }
];

document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("sarkiCalar");
    const sozKutusu = document.getElementById("sarki-sozleri");
    
    // Otomatik oynatma denemesi (Tarayıcı izin verirse çalar)
    // Sayfaya ilk tıklandığında müziği başlatmak için bir kural ekliyoruz.
    document.body.addEventListener('click', function() {
        if(audio.paused) {
            audio.play().catch(e => console.log("Otomatik oynatma engellendi."));
        }
    }, { once: true }); // Sadece ilk tıklamada çalışır

    // Müzik çalarken her saniye burası çalışır
    audio.addEventListener("timeupdate", function() {
        let guncelSaniye = audio.currentTime;
        let aktifSoz = "";

        // Hangi saniyede olduğumuzu bulup doğru sözü seçiyoruz
        for (let i = 0; i < sarkiSozleri.length; i++) {
            if (guncelSaniye >= sarkiSozleri[i].zaman) {
                aktifSoz = sarkiSozleri[i].metin;
            }
        }

        // Eğer söz değiştiyse ekrana yazdır (sürekli aynı şeyi yazdırmamak için)
        if(sozKutusu.innerText !== aktifSoz) {
            sozKutusu.innerHTML = `<div class="lyric-line aktif-soz">${aktifSoz}</div>`;
        }
    });
});
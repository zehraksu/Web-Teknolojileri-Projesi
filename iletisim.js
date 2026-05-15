// ==========================================
// 1. VUE.JS İLE FORM DOĞRULAMA (Modern Yaklaşım)
// ==========================================
const { createApp } = Vue;

createApp({
    data() {
        return {
            form: {
                ad: '', soyad: '', email: '', telefon: '', cinsiyet: '', konu: '', mesaj: '', onay: false
            },
            vueHatalar: []
        }
    },
    methods: {
        kontrolEtVue() {
            this.vueHatalar = []; // Hataları sıfırla
            document.getElementById('native-alert').classList.add('d-none'); // Native hatasını gizle

            const isimRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/; // Sadece harf ve boşluk
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const telefonRegex = /^[0-9]+$/;

            // Ad Kontrolü
            if (!this.form.ad.trim()) {
                this.vueHatalar.push('Ad alanı boş bırakılamaz.');
            } else if (!isimRegex.test(this.form.ad.trim())) {
                this.vueHatalar.push('Ad alanı sadece harflerden oluşmalıdır (sayı girilemez).');
            }

            // Soyad Kontrolü
            if (!this.form.soyad.trim()) {
                this.vueHatalar.push('Soyad alanı boş bırakılamaz.');
            } else if (!isimRegex.test(this.form.soyad.trim())) {
                this.vueHatalar.push('Soyad alanı sadece harflerden oluşmalıdır (sayı girilemez).');
            }

            // Diğer Boş Alan Kontrolleri
            if (!this.form.cinsiyet) this.vueHatalar.push('Cinsiyet seçimi zorunludur.');
            if (!this.form.konu) this.vueHatalar.push('Lütfen bir konu seçiniz.');
            if (!this.form.mesaj.trim()) this.vueHatalar.push('Mesaj alanı boş bırakılamaz.');
            if (!this.form.onay) this.vueHatalar.push('Veri işleme onayını kabul etmelisiniz.');

            // E-Posta Format Kontrolü
            if (!this.form.email.trim()) {
                this.vueHatalar.push('E-posta alanı zorunludur.');
            } else if (!emailRegex.test(this.form.email.trim())) {
                this.vueHatalar.push('Geçerli bir e-posta adresi giriniz.');
            }

            // Telefon (Sadece Rakam) Kontrolü
            if (!this.form.telefon.trim()) {
                this.vueHatalar.push('Telefon numarası zorunludur.');
            } else if (!telefonRegex.test(this.form.telefon.trim())) {
                this.vueHatalar.push('Telefon numarası sadece rakamlardan oluşmalıdır.');
            }

            // Hata yoksa formu PHP'ye gönder
            if (this.vueHatalar.length === 0) {
                this.$refs.formElement.submit();
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },

        // VUE TARAFINDAN FORMU TEMİZLEME
        formuSifirla() {
            this.form = { ad: '', soyad: '', email: '', telefon: '', cinsiyet: '', konu: '', mesaj: '', onay: false };
            this.vueHatalar = [];
            document.getElementById('native-alert').classList.add('d-none');
        }
    }
}).mount('#app');

// ==========================================
// 2. NATIVE JS İLE FORM DOĞRULAMA (Klasik Yaklaşım)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnNative = document.getElementById('btnNativeJS');
    const nativeAlert = document.getElementById('native-alert');

    if(btnNative) {
        btnNative.addEventListener('click', () => {
            let hatalar = [];
            nativeAlert.classList.add('d-none');

            // Form Değerlerini Çekme
            const ad = document.getElementById('ad').value.trim();
            const soyad = document.getElementById('soyad').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefon = document.getElementById('telefon').value.trim();
            const cinsiyet = document.querySelector('input[name="cinsiyet"]:checked');
            const konu = document.getElementById('konu').value;
            const mesaj = document.getElementById('mesaj').value.trim();
            const onay = document.getElementById('onay').checked;

            const isimRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const telefonRegex = /^[0-9]+$/;

            // Ad Kontrolü
            if (ad === '') {
                hatalar.push('Ad alanı boş bırakılamaz.');
            } else if (!isimRegex.test(ad)) {
                hatalar.push('Ad alanı sadece harflerden oluşmalıdır (sayı girilemez).');
            }

            // Soyad Kontrolü
            if (soyad === '') {
                hatalar.push('Soyad alanı boş bırakılamaz.');
            } else if (!isimRegex.test(soyad)) {
                hatalar.push('Soyad alanı sadece harflerden oluşmalıdır (sayı girilemez).');
            }

            if (!cinsiyet) hatalar.push('Cinsiyet seçimi zorunludur.');
            if (konu === '') hatalar.push('Lütfen bir konu seçiniz.');
            if (mesaj === '') hatalar.push('Mesaj alanı boş bırakılamaz.');
            if (!onay) hatalar.push('Veri işleme onayını kabul etmelisiniz.');

            if (email === '') {
                hatalar.push('E-posta alanı zorunludur.');
            } else if (!emailRegex.test(email)) {
                hatalar.push('Geçerli bir e-posta adresi giriniz.');
            }

            if (telefon === '') {
                hatalar.push('Telefon numarası zorunludur.');
            } else if (!telefonRegex.test(telefon)) {
                hatalar.push('Telefon numarası sadece rakamlardan oluşmalıdır.');
            }

            if (hatalar.length > 0) {
                nativeAlert.classList.remove('d-none');
                nativeAlert.innerHTML = `<strong><i class="fas fa-exclamation-triangle me-2"></i>Native JS Hataları:</strong><ul class="mb-0 mt-2"><li>${hatalar.join('</li><li>')}</li></ul>`;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Hata yoksa PHP'ye gönder
                document.getElementById('contactForm').submit();
            }
        });
    }
});
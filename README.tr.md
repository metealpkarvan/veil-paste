# Veil Paste

AI ile paylaşmadan önce özel bilgileri yerel olarak maskele.

**[Uygulamayı aç](https://metealpkarvan.github.io/veil-paste/)** · [English](README.md) · [İndirilebilir ZIP](https://github.com/metealpkarvan/veil-paste/releases/latest)

![Veil Paste ekran görüntüsü](docs/preview.png)

## Nasıl kullanılır?

1. Metni yapıştır; e-posta, telefon, anahtar/sır ve IBAN taramalarını seç.
2. Özel adları ve kurum adlarını satır satır ekle. Büyük/küçük harfe duyarlıdır.
3. Maskele ve çıktıyı kontrol et; aynı bilgi aynı takma adı alır.
4. Maskeli sürümü tercih ettiğin AI aracına elle yapıştır.
5. Yanıtı geri açma alanına yapıştır. Eşleştirmeler yalnızca bu sekmede tutulur; yenileme onları siler.

EN/TR düğmesi dili değiştirir. Örnek düğmesi kurgusal veriler yükler. İlk başarılı çevrimiçi açılıştan sonra uygulama dosyaları aynı tarayıcıda çevrimdışı kullanım için önbelleğe alınır.

## İndir ve yerelde çalıştır

Canlı demo için hesap veya kurulum gerekmez. Releases bölümündeki **veil-paste-v1.0.0.zip** dosyasını indir, çıkar ve çıkarılan klasörde çalıştır:

    python3 -m http.server 8080 --bind 127.0.0.1

Tarayıcıda http://127.0.0.1:8080 adresini aç. Modül kısıtlamaları nedeniyle HTML dosyasına çift tıklamak yerine yerel HTTP sunucusu kullanılır. ZIP, kullanıcı kayıtlarını içermez.

## Gizlilik ve sınırlar

Uygulama cihazında çalışır. AI API anahtarı, sunucuya metin yükleme, reklam, analiz veya hesap gerektirmez. Metin ve eşleştirmeler yalnızca açık sekmenin belleğinde tutulur; yenileme onları siler.

Şifreleme veya eksiksiz veri sızıntısı önleme sistemi değildir. Tarama bazı bilgileri kaçırabilir ya da yanlış eşleştirebilir. Tarayıcı eklentileri, işletim sistemi panosu ve metni gönderdiğin hizmet uygulamanın kontrolü dışındadır.

## Araştırma ve geliştirme

Dayanılan paylaşım: [Pete (@nonmayorpete)](https://x.com/nonmayorpete/status/1640443500721496064) (2023-03-27). X erişim sınırlaması nedeniyle [okunabilir thread kopyası](https://threadreaderapp.com/thread/1640443500721496064.html) da incelendi. Bu seçilmiş küçük bir keşif örneklemidir; pazar araştırması veya ölçülmüş başarı iddiası değildir. Gözlem ile ürün çıkarımı [araştırma notlarında](docs/RESEARCH.md) ayrılır.

Geliştirme için Node.js 22+ gerekir:

    npm test
    npm run build

Testler, mimari tercihler ve kullanım kontrolleri İngilizce teknik belgelerde açıklanır. MIT lisansıyla kullanabilir, değiştirebilir ve katkıda bulunabilirsin.

---
version: alpha
name: Yiğit Doğantekin — Kâşifin Atlası
description: Kişisel portfolyo. Antika bakır baskı atlas levhası ile bilimkurgu HUD dilinin birleşimi; kobalt mürekkep ve krem kâğıt, iki renk.
colors:
  kagit: "#F4EFE4"
  kagit-2: "#EAE3D3"
  kobalt: "#2433D6"
  murekkep: "#0F1B4D"
  kobalt-acik: "#AEB6F2"
  kivilcim: "#E8442E"
typography:
  display-xl:
    fontFamily: Instrument Serif
    fontSize: 193px
    lineHeight: "0.86"
    fontWeight: 400
    letterSpacing: -0.005em
  display-l:
    fontFamily: Instrument Serif
    fontSize: 136px
    lineHeight: "0.9"
    fontWeight: 400
    letterSpacing: -0.005em
  numeral:
    fontFamily: Instrument Serif
    fontSize: 192px
    lineHeight: "0.8"
    fontWeight: 400
  heading:
    fontFamily: Instrument Serif
    fontSize: 40px
    lineHeight: "1.05"
    fontWeight: 400
  lede:
    fontFamily: Instrument Serif
    fontSize: 44px
    lineHeight: "1.1"
    fontWeight: 400
  stat:
    fontFamily: Instrument Serif
    fontSize: 72px
    lineHeight: "0.95"
    fontWeight: 400
  body:
    fontFamily: Newsreader
    fontSize: 1.125rem
    lineHeight: "1.6"
    fontWeight: 400
  body-s:
    fontFamily: Newsreader
    fontSize: 1rem
    lineHeight: "1.55"
    fontWeight: 400
  mono-label:
    fontFamily: IBM Plex Mono
    fontSize: 0.75rem
    lineHeight: "1.4"
    fontWeight: 500
    letterSpacing: 0.12em
  mono-text:
    fontFamily: IBM Plex Mono
    fontSize: 0.8125rem
    lineHeight: "1.5"
    fontWeight: 400
    letterSpacing: 0.04em
rounded:
  none: 0px
  pill: 999px
spacing:
  s-1: 4px
  s-2: 8px
  s-3: 12px
  s-4: 16px
  s-5: 24px
  s-6: 32px
  s-7: 48px
  s-8: 64px
  s-9: 96px
  s-10: 128px
  s-11: 192px
  page-margin: clamp(1rem, 3.33vw, 3rem)
  gutter: clamp(1rem, 1.67vw, 1.5rem)
components:
  button-primary:
    backgroundColor: "{colors.kobalt}"
    textColor: "{colors.kagit}"
    typography: "{typography.mono-label}"
    height: 48px
    padding: 24px
  button-secondary:
    backgroundColor: "{colors.kagit}"
    textColor: "{colors.kobalt}"
    typography: "{typography.mono-label}"
    height: 48px
    padding: 24px
  nav-pill:
    backgroundColor: "rgba(244, 239, 228, 0.62)"
    textColor: "{colors.murekkep}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.pill}"
    height: 44px
  fig-card:
    backgroundColor: "{colors.kagit-2}"
    textColor: "{colors.kobalt}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.none}"
  hud-label:
    textColor: "{colors.kobalt}"
    typography: "{typography.mono-label}"
  hairline:
    backgroundColor: "{colors.kobalt-acik}"
    height: 1px
  status-dot:
    backgroundColor: "{colors.kivilcim}"
    size: 8px
    rounded: "{rounded.pill}"
  flood-block:
    backgroundColor: "{colors.kobalt}"
    textColor: "{colors.kagit}"
    typography: "{typography.lede}"
  body-text:
    backgroundColor: "{colors.kagit}"
    textColor: "{colors.murekkep}"
    typography: "{typography.body}"
---

## Overview

Yiğit Doğantekin'in portfolyosu. İşverene ve iş birliği yapacak kişilere on saniyede şunu anlatır: "Fikirleri, yapay zekâ ajanlarını yöneterek yayınlanmış ürüne çeviriyorum." Ana fikir **"ajanların haritasını çizen kâşif"**: eski bir atlas levhası, saha defteri ve bakır baskı gravür; üstünde ince bir ekran üstü veri (HUD) katmanı. Klasik olan (serif, gravür, kâğıt) ile teknik olan (koordinat, canlı saat, kayıt numarası, 1-bit dither) aynı sayfada durur. Ton sakin, editoryal ve emin.

Görsel dilin tek kaynağı `kaynak/referanslar/` altındaki 18 referanstır; içlerindeki logo, metin ve illüstrasyonlar kopyalanmaz.

## Colors

Site iki renkle yapılır: kobalt mürekkep ve krem kâğıt. Diğer üç renk bu ikisinin işlevsel tonlarıdır.

- `kagit` ana zemin; `kagit-2` ikinci yüzey (FIG kartı içi, dizin tablosu satır vurgusu, kod/etiket zemini).
- `kobalt` illüstrasyon, başlık, bağlantı, dolu düğme ve "mavi taşkın" bloklarıdır. Krem üstünde 7,27:1.
- `murekkep` uzun gövde metni ve en koyu bölümler içindir (14,26:1). Gövde metni kobalt değil mürekkeptir; kobalt yalnız başlık, etiket ve bağlantıdadır.
- `kobalt-acik` yalnız dekoratif ince çizgi, dither ara tonu ve kobalt zemin üstündeki ikincil çizgilerdir. Krem üstünde metin rengi olarak kullanılmaz (1,70:1). Kobalt zemin üstünde yalnız 24 px ve üstü metinde kullanılabilir (4,28:1).
- `kivilcim` tek vurgudur ve yalnız iki yerde görünür: Kıvılcım kapak görselindeki alev ve hero'daki "YENİ ROLLERE AÇIK" durum noktası. Metin rengi değildir (krem üstünde 3,46:1; yalnız grafik nesne eşiğini geçer).
- Kobalt ya da mürekkep zemin üstünde metin her zaman `kagit` rengindedir.

Durum bilgisi hiçbir yerde yalnız renkle verilmez: dizindeki durum etiketleri metin olarak yazılır, canlı nokta yanında "DURUM" yazısıyla gelir.

## Themes

Tek tema vardır: kâğıt. Karanlık mod ayrı bir palet değil, kobalt ve mürekkep zeminli bölümlerle (iletişim, footer, 404 kartı) sayfanın içinde yaşanır. `prefers-color-scheme` ile renk değiştirilmez.

## Typography

Üç aile, üç rol:

- **Instrument Serif** gösterim yazısıdır: hero adı, vaka başlıkları, dev numaralar, istatistik rakamları, ilk harf büyütmesi. Gösterim başlıkları büyük harf ve sıkı satır aralığıyla dizilir. Bağlaç kelimeleri aynı ailenin italiğiyle araya girer ("Fikirleri *ajanlarla* yayınlanmış ürüne çeviriyorum"). Bir cümlede en fazla bir italik bağlaç olur.
- **Newsreader** gövde ve uzun okuma metnidir. Satır uzunluğu 45–72 karakter (`max-width: 62ch`); iki sütunlu editoryal blokta her sütun ayrı ayrı bu aralıkta kalır.
- **IBM Plex Mono** HUD ve meta veridir: büyük harf, geniş harf aralığı, 12 px altına inmez. Koordinat, saat, kayıt numarası, FIG etiketi, meta tablo başlığı ve düğme yazısı bu ailededir. Rakamlar `font-variant-numeric: tabular-nums` ile dizilir ki canlı saat titremesin.

Gösterim boyutları akışkandır; YAML'daki değerler 1440 px'deki üst sınırdır, alt sınırlar telefonda: `display-xl` 68 px, `display-l` 56 px, `numeral` 80 px, `heading` 30 px, `lede` 26 px, `stat` 44 px. `display-xl` adı tek satıra sığacak şekilde genişliğe bağlıdır: `calc((100vw - 2 × page-margin) / 6.95)`, 1440 px'de 193 px; 600 px altında ad iki satıra bölünür ("YİĞİT" / "DOĞANTEKİN"), sola hizalanır ve iki satır aynı boyutta kalır; uzun satır ("DOĞANTEKİN") ekran genişliğini doldurur. Türkçe büyük harflerin üst işaretleri (İ, Ğ) için satır yüksekliği 0,86'nın altına inmez ve başlığın üstünde en az 0,18 em boşluk kalır. `text-transform: uppercase` kullanılırken `lang="tr"` mutlaka tanımlıdır (i → İ dönüşümü için).

Başlıklarda `text-wrap: balance`, gövde paragraflarında `text-wrap: pretty`.

## Layout

12 sütunlu ızgara (masaüstü), 8 sütun (tablet), 4 sütun (telefon). Sayfa kenar boşluğu `page-margin`, sütun aralığı `gutter`. İçerik en geniş 1440 px'de durur; illüstrasyonlar ve mavi taşkın blokları tam genişliğe taşar.

Sayfa bir atlas gibi okunur: her ana bölüm bir **levha (pafta)**dır. Levhanın sol üst köşesinde mono kayıt numarası (`ENTRY_001`), sağ üst köşesinde bölüm adı durur; bölümler arası `s-10` (128 px) boşluk, levha içi bloklar arası `s-7` (48 px). Dev "01, 02, 03" numaralar yalnız gerçek sıralı içerikte kullanılır: seçili işler ve yöntem adımları. Dizin tablosu numarası (04–10) iş numarasının devamıdır.

HUD köşe etiketleri hero'da dört köşeye ve kenar ortalarına yerleşir, kenara `page-margin` uzaklıktadır. Telefonda yalnız koordinat ve saat kalır.

Kenarlarda dikey yazılmış koordinatlar (`writing-mode: vertical-rl`) yalnız Hakkımda ve 404 levhalarındadır.

## Elevation & Depth

Gölge yoktur; sayfa basılı bir levhadır. Derinlik iki yolla verilir: kobalt taşkın bloklarının kremi örtmesi ve ince çerçeve çizgileri. Tek istisna hap menüdür: krem %62 yarı saydam zemin, `backdrop-filter: blur(14px) saturate(140%)`, 1 px `kobalt-acik` kenar. Kaydırınca bulanıklık 20 px'e çıkar.

## Shapes

Köşeler düzdür (`rounded.none`). Yalnız hap menü ve canlı durum noktası yuvarlaktır. Düğmelerin köşeleri 6 px'lik pahlarla kesilir (bilet biçimi, `clip-path: polygon`); bu, sitenin tek dekoratif şekil imzasıdır ve yalnız düğmelerde kullanılır. FIG kartları 1 px kobalt çerçeve ve köşelerinde 8 px'lik artı (+) işaretleriyle çizilir; levhalar dışta 1 px, içte 6 px içeride ikinci 1 px çizgiyle çift çerçevelidir.

Ajan simgesi: merkez nokta ve ondan çıkan altı kolun ucunda altı nokta (altı kollu düğüm). Logo monogramında, favicon'da, dizin madde imlerinde ve hero takımyıldız düğümlerinde aynı geometri kullanılır.

## Components

- **Dolu düğme** (`button-primary`): sayfa başına tek birincil eylem; hero'da "İşleri gör". 48 px yükseklik, pahlı köşe, hover'da zemin `murekkep`e döner (200 ms), odakta 2 px `kobalt` dış çizgi 3 px aralıkla.
- **Çerçeveli düğme** (`button-secondary`): 1 px kobalt pahlı çerçeve (SVG ya da iki katmanlı clip-path ile; `border` pahı takip etmediği için). "CV indir", "Kopyala".
- **Hap menü** (`nav-pill`): üstte ortada, sabit. Bağlantılar arası `s-5`. Aktif bölüm kobalt metin ve altında 1 px çizgiyle gösterilir (renk tek başına yetmez).
- **FIG kartı** (`fig-card`): görsel + alt satırda `FIG.0X — AÇIKLAMA` mono etiket; isteğe bağlı olarak illüstrasyondaki bir noktaya ince çizgiyle (leader line) bağlanır.
- **HUD etiketi** (`hud-label`): `ANAHTAR` + değer çifti, ikisi de mono; anahtar `kobalt`, değer `murekkep`.
- **Meta tablo**: vaka levhalarının sağ sütunu. Satırlar 1 px `kobalt-acik` çizgiyle ayrılır; anahtar mono, değer mono.

## Motion

Hareket az ve amaçlıdır; sürekli dönen öğe ve abartılı paralaks yoktur.

| Belirteç | Değer | Kullanım |
|---|---|---|
| `dur-1` | 120 ms | Hover ve basma geri bildirimi |
| `dur-2` | 200 ms | Menü, odak, düğme durum geçişleri |
| `dur-3` | 320 ms | Hap menünün küçülmesi, sayfa içi geçiş |
| `dur-4` | 600 ms | Hero dither'ının kaba noktadan inceye netleşmesi, başlık harflerinin girişi |
| `dur-5` | 900 ms | FIG bağlantı çizgilerinin çizilmesi, takımyıldız çizgileri |
| `ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | Girişler, çizilen çizgiler |
| `ease-standard` | cubic-bezier(0.2, 0, 0, 1) | Durum geçişleri |

Sayfada tek bir düzenlenmiş açılış anı vardır (hero: dither netleşir, harfler alttan 0,18 em kayarak gelir, takımyıldız çizgileri çizilir). Kaydırma ile bölüm görselleri dither'dan gravüre geçer ve FIG çizgileri uzar; her biri bir kez oynar. Canlı saat saniyede bir güncellenir; durum noktası 2,4 s'lik yumuşak nabız atar. `prefers-reduced-motion: reduce` açıkken tüm süreler 0'a iner, görseller son hâlinde görünür, nabız durur.

## Do's and Don'ts

- Turuncu (`kivilcim`) yalnız Kıvılcım alevi ve durum noktasındadır; başka hiçbir yerde kullanılmaz.
- Referanslardaki logo, marka adı, metin ve illüstrasyonlar kopyalanmaz; yalnız kompozisyon ve doku dili alınır.
- Fotogerçekçi ve renkli görsel siteye girmez; her görsel kobalt-krem gravür ya da 1-bit dither'dır.
- Sahte müşteri yorumu, logo duvarı, "10K+ kullanıcı" gibi rozetler, "lorem ipsum" ve "yakında" bölümü yoktur.
- Kıvılcım için "mağazada" denmez (GitHub üzerinden yayınlandı); Jev için "kazandırdı" ya da "getiri" denmez (yalnız kâğıt modunda denendi).
- Gizli projelere (AI Odası, BAVT, Beyin Windows) kaynak kodu bağlantısı verilmez.

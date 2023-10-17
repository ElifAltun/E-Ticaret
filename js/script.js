//! Scroll button
window.onscroll = function() { scrollFunction() };
// !Bu satır, onscroll olayını dinleyen bir olay işleyici atanmıştır. Her kaydırma işleminde scrollFunction fonksiyonu çağrılacaktır.

function scrollFunction() {
    // ! Bu kod bloğu, scrollFunction adlı bir fonksiyonu tanımlar. Bu fonksiyon, kaydırma olayını yakalayarak düğmenin görünürlüğünü kontrol eder.
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("back-to-top-btn").style.display = "block";
    } else {
        document.getElementById("back-to-top-btn").style.display = "none";
    }
}

document.getElementById("back-to-top-btn").onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


// ! Acordion iconları açılır kapanır

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var accordionIn = this.nextElementSibling;
    if (accordionIn.style.display === "block") {
        accordionIn.style.display = "none";
    } else {
        accordionIn.style.display = "block";
    }
  });
}


// ! shopping cart sepet hesaplama 
$('.cart-up, .cart-down').click(function(e) {
    e.preventDefault();
    var input = $(this).siblings('.cart-input');
    var quantity = parseInt(input.val());

    if ($(this).hasClass('cart-up')) {
        quantity++;
    } else if (quantity > 1) {
        quantity--;
    }

    input.val(quantity);
    updateTotalPrice($(this).closest('tr'));
});
// !cart-up ile arttırma yaptım cart-down ilede azaltma yaptım
// ! e.preventDefault: bağlantıya tıklandığında sayfanın yeniden yüklenmesini önler.
// ! updateTotalPrice: Bu satır, tıklanan öğenin içinde bulunduğu <tr> (tablo satırı) öğesini bulur ve updateTotalPrice fonksiyonunu çağırır. Bu fonksiyon, sepetin toplam fiyatını güncellemek için kullanılır.
$('.fa-times').click(function(e) {
    e.preventDefault();
    $(this).closest('tr').remove();
    updateTotalPrice();
});
// !fa-times ile silme yaparız
// ! e.preventDefault:bağlantıya tıklandığında sayfanın yeniden yüklenmesini veya yukarı kaymasını önler.
// ! updateTotalPrice: fonksiyonu çağırarak toplam fiyatı günceller.
function updateTotalPrice(row) {
    if (row) {
        var price = parseFloat(row.find('td:nth-child(2)').text().replace('$', ''));
        // ! Bu satır, row içindeki .cart-input sınıfına sahip giriş alanının değerini alır. Bu değer ürün miktarını temsil eder. Tam sayıya dönüştürmek için parseInt kullanılır. Sonuç, quantity değişkenine atanır.
        var quantity = parseInt(row.find('.cart-input').val());
        var total = price * quantity;
          // ! Bu satır, birim fiyatı (price) ve ürün miktarını (quantity) çarparak toplam fiyatı hesaplar. Sonuç, total değişkenine atanır.
        row.find('.total').text('$' + total.toFixed(2));
        // !Bu satır, row içindeki .total sınıfına sahip hücrenin metnini toplam fiyatla (total) günceller. toFixed(2) kullanarak ondalık kısmı iki basamağa yuvarlar ve sonucu $ işaretiyle birleştirerek metin olarak ayarlar.
    }

    var subtotal = 0;
    // !Bu satır, bir değişken olan subtotali sıfıra başlatır. Bu değişken, ürünlerin toplam fiyatını temsil edecek.
    $('.total').each(function()
    // !.total sınıfına sahip tüm öğeleri döngüleyerek her birinin değerini işler.
    {
        subtotal += parseFloat($(this).text().replace('$', ''));
        // !her bir .total öğesinin metnini alır, içerisindeki $ işaretini kaldırır ve sayıya dönüştürür. Sonra subtotal değişkenine ekler. Bu, tüm ürünlerin toplam fiyatını biriktirir.
    });
    $('#subtotal').text('$' + subtotal.toFixed(2));

    var ecoTax = 2;
    // !Bu satır, ecoTax değişkenine 2 değerini atar.
    var shippingCost = 0;
    var finalTotal = subtotal + ecoTax + shippingCost;
    $('#total').text('$' + finalTotal.toFixed(2));

    // !Bu satır, #total id'sine sahip bir HTML öğesinin metnini, nihai toplam fiyat (finalTotal) ile günceller. toFixed(2) kullanarak ondalık kısmı iki basamağa yuvarlar ve sonucu $ işaretiyle birleştirerek metin olarak ayarlar.
}

// ! Sayfa içi ürün filtreleme


const autoSearch = document.getElementById("autoSearch");
autoSearch.addEventListener('keyup', e => {
    let currentValue = e.target.value.toLowerCase();
    // !e parametresi aracılığıyla olay nesnesine erişiriz.
    // ! arama kutusunda girilen değeri küçük harflere dönüştürerek currentValue adlı bir değişkene atar.
    let results = document.querySelectorAll('.card-text');
    results.forEach(result => {
        if (result.textContent.toLowerCase().includes(currentValue)) {
            result.parentNode.parentNode.style.display = 'block';
            // !result.parentNode.parentNode:seçer ve display stil özelliğini 'block' olarak ayarlar. Bu, sonucun bulunduğu kartın görünür hale gelmesini sağlar.
            if (currentValue === '') {
                result.style.color = 'black';
            } else {
                result.style.color = 'orange';
            }
            // !currentValue boş bir dize ise, sonucun metninin rengini siyah olarak ayarlar. Aksi takdirde, metnin rengini turuncu olarak ayarlar.

            result.parentNode.parentNode.scrollIntoView();
        } else {

            result.parentNode.parentNode.style.display = 'none';
            // !result.parentNode.parentNode:seçer ve display stil özelliğini 'none' olarak ayarlar. Bu, sonucun bulunduğu kartın gizlenmesini sağlar.

        }

    });
});

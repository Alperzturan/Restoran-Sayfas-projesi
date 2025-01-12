const navbarSec = 'nav#navbar'; //idsi navbar olan nav
const navbar = document.querySelector(navbarSec); //üstteki değişkeni navbara aktarır


function styleekle(sec) { //aşağı kaydırınca navbarın küçülmesi fonskiyonu
// seçilen elementin stilini
//dinamik olarak değiştirmek için bir style etiketi oluşturur ve sayfanın head kısmına ekler.
    const styles =`
    ${sec} {
        transition: height 0.3s ease-in-out
    }

    ${sec}.small {
        height: 75px
    }
`//transition geçiş yaparken efekt ile geçmesini sağlar 
//height küçülünce ne kadar küçüleceğini söyler

    const styleTag = document.createElement('style');//bir style etiketi oluşturulur
    styleTag.innerHTML = styles;//style etiketine tanımlanan css kodlarını ekler
    document.head.appendChild(styleTag);  //head kısmına ekler böylece dinamik çalışır

}

styleekle(navbarSec)//fonksiyonu çağırma

window.addEventListener('scroll', () =>{//sayfada ne kadar kaydırıldığının öğreninlmesi
    window.scrollY > 15
    ? navbar.classList.add('small') //eğer 15 biirmden fazlaysa navbarın küçülmesi
    : navbar.classList.remove('small') // azsa navbarın eski haline dönmesi
})
import {
    Product
} from '../components/product/product.js';

window.customElements.define('product-tag', Product);


//menu hover - js
let mainHeader = document.querySelector('.main-header');
let menuList = document.querySelector('.navbar-menu-list');
let blurScreenMenu = document.querySelector('.navbar-menu-list .blur-screen-menu');

function toggleHover(e) {
    if (e.target.hasAttribute('data-toggle') && window.innerWidth >= 768) {
        let hoverMenu = e.target.parentElement;
        let subMenu = hoverMenu.querySelector('.create-bg');

        mainHeader.classList.add('active');
        subMenu.classList.add('active');
        blurScreenMenu.classList.add('active');

        function showSubList() {
            subMenu.classList.add('active');
            mainHeader.classList.add('active');
            blurScreenMenu.classList.add('active');
        }

        function hideSubList() {
            subMenu.classList.remove('active');
            blurScreenMenu.classList.remove('active');

            if (window, scrollY === 0) {
                mainHeader.classList.remove('active');
            }
        }

        subMenu.addEventListener('mouseover', () => {
            showSubList();
        })
        subMenu.addEventListener('mouseleave', () => {
            hideSubList();
        })
        e.target.addEventListener('mouseleave', () => {
            hideSubList();
        })
    }
}

menuList.addEventListener('mouseover', toggleHover);

//show-hide bascketbox
let bascket = document.querySelector('.bascket-lbl')
let closeBascket = document.querySelector('.bascket-box .close')
let blurScreen = document.querySelector('.blur-screen')
let bascketBox = document.querySelector('.bascket-box')
let header = document.querySelector('header')
let register = document.querySelector('.register')

function showBascket() {
    blurScreen.classList.add('active');
    bascketBox.classList.add('active');
}

function hideBascket() {
    blurScreen.classList.remove('active');
    bascketBox.classList.remove('active');
}

bascket.addEventListener('click', showBascket);
closeBascket.addEventListener('click', hideBascket);

//show-hide searchbox
let searchBox = document.querySelector('.search-box');
let closeSearch = document.querySelector('.search-box .close');
let search = document.querySelector('.search-lbl');

function showSearch() {
    searchBox.classList.add('active');
    header.classList.add('searchActive');
}

function hideSearch() {
    searchBox.classList.remove('active');
    header.classList.remove('searchActive');
}

search.addEventListener('click', () => {
    if (window.scrollY === 0) {
        showSearch();
    }
});
closeSearch.addEventListener('click', hideSearch);


//show-hide country modal
let fullscreenCountry = document.querySelector('.fullscreen-country');
let locationBtn = document.querySelector('.location');
let closeLocation = document.querySelector('.close-location');
let cancle = document.querySelector('.cancle');
let saveBtn = document.querySelector('.save-btn');
let country = document.querySelector('.country');

function showCountry() {
    fullscreenCountry.classList.add('active');
}

function hideCountry() {
    fullscreenCountry.classList.remove('active');
}

function selectCountry() {
    locationBtn.innerHTML = country.value;
    document.querySelector('.navbar-menu-location').innerHTML = country.value;
    hideCountry();
}

locationBtn.addEventListener('click', showCountry);
document.querySelector('.navbar-menu-location').addEventListener('click', showCountry);
closeLocation.addEventListener('click', hideCountry);
cancle.addEventListener('click', hideCountry);
saveBtn.addEventListener('click', selectCountry);

//head background change>>>slider
let headerBg = document.querySelector('.header .background img');
let hrefs = ['images/haeder-bg1.jpg', 'images/header-bg2.jpg', 'images/header-bg3.jpg', 'images/header-bg4.jpg'];
let index = 1;
if (headerBg && window.innerWidth >= 768) {

    setInterval(() => {
        if (index > 3) {
            index = 0;
        }
        headerBg.setAttribute('src', hrefs[index]);
        index++;
    }, 5000);

    let choiceBg = document.querySelector('.choice-circle');

    function changeBg(e) {
        if (e.target.classList.contains('circle')) {
            headerBg.setAttribute('src', hrefs[e.target.dataset.number])
        }
    }

    choiceBg.addEventListener('click', changeBg);
}

// access to user's location

function setLocation() {
    const gettingLoc = (pos) => {
        const {
            latitude,
            longitude
        } = pos.coords;
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b1ffadbf679d4ad6967d55605ad14bc0`)
            .then(res => res.json())
            .then(data => {
                const countryName = data.results[0].components.country;
                locationBtn.innerHTML = countryName;
                document.querySelector('.navbar-menu-location').innerHTML = countryName;

            })
            .catch((e) => {
                locationBtn.innerHTML = 'country';
                document.querySelector('.navbar-menu-location').innerHTML = 'country';
            })
    }

    window.navigator.geolocation
        .getCurrentPosition(gettingLoc, console.log);
}

window.addEventListener('load', setLocation);

//menu on small devices(>768px)
let navbar = document.querySelector('.navbar-menu-list');
let hamburgerIcon = document.querySelector('.hamburger');
let navbarMenu = document.querySelector('.navbar-menu');
let blurScreenHamburger = document.querySelector('.blur-screen-hamburger');
let navbarMenuClose = document.querySelector('.navbar-menu-close');

function showList(e) {
    if (e.target.classList.contains('line')) {
        let plus = e.target.parentElement;
        let navItem = e.target.parentElement.parentElement;
        let toggleList = navItem.querySelector('.create-bg .sub-list');

        //for double click on plus
        if (plus.classList.contains('active')) {
            collapseList();
        } else {
            //for close other active items
            if (navbar.querySelector('.navbar-menu-item.active')) {
                collapseList();
            }
            //for show list
            plus.classList.add('active');
            navItem.classList.add('active');
            toggleList.style.height = toggleList.scrollHeight + 'px';
        }
    }
}

function collapseList() {
    navbar.querySelector('.navbar-menu-item.active .sub-list').removeAttribute('style');
    navbar.querySelector('.navbar-menu-item.active .plus').classList.remove('active');
    navbar.querySelector('.navbar-menu-item.active').classList.remove('active');
}

function resize() {
    if (navbar.querySelector('.navbar-menu-item.active')) {
        collapseList();
    }
    if (navbarMenu.classList.contains('active')) {
        toggLeMenu();
    }
    if (footerList.querySelector('.footer-list-item.active')) {
        collapseListFooter();
    }
}

function toggLeMenu() {
    navbarMenu.classList.toggle('active');
    blurScreenHamburger.classList.toggle('active');
}

hamburgerIcon.addEventListener('click', toggLeMenu);
navbarMenuClose.addEventListener('click', toggLeMenu);
navbar.addEventListener('click', showList);
window.addEventListener('resize', resize);

//hide-show nav with scroll
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY || document.documentElement.scrollTop;
    if (lastScrollY < scrollY) {
        mainHeader.classList.add('hide');
        hideSearch();
    } else {
        mainHeader.classList.remove('hide');
        mainHeader.classList.add('active');
        if (scrollY === 0) {
            mainHeader.classList.remove('active');
        }
    }
    lastScrollY = scrollY;
})

//slide product
let nextProduct = document.querySelector('.subsection2-text2');
let productImg = document.querySelector('.sliderProduct img');
let linkArray = ["images/endsection-img2.webp", "./images/category-image/9.jpg", "./images/category-image/22.jpg", "./images/category-image/31.jpg"]
let imgIndex = 1;
if (nextProduct) {

    function showNexProduct() {
        if (imgIndex > 3) {
            imgIndex = 0;
        }
        productImg.setAttribute('src', linkArray[imgIndex]);
        imgIndex++;
    }

    nextProduct.addEventListener('click', showNexProduct);
}
//toggle footer menu

let footerList = document.querySelector('.footer-list');

footerList.addEventListener('click', showListFooter)

function showListFooter(e) {
    if (e.target.classList.contains('line')) {
        let plus = e.target.parentElement;
        let menuList = e.target.parentElement.parentElement;
        let toggleList = menuList.querySelector('.hidden');

        if (plus.classList.contains('active')) {
            collapseListFooter();
        } else {
            //for close other active items
            if (footerList.querySelector('.footer-list-item.active')) {
                collapseListFooter();
            }
            //for show list
            plus.classList.add('active');
            menuList.classList.add('active');
            toggleList.style.height = toggleList.scrollHeight + 'px';
        }
    }
}

function collapseListFooter() {
    footerList.querySelector('.footer-list-item.active .hidden').removeAttribute('style');
    footerList.querySelector('.footer-list-item.active .plus').classList.remove('active');
    footerList.querySelector('.footer-list-item.active').classList.remove('active');
}
//add product to bascketshop

let gallery = document.querySelector('.collection-gallery');
let products = document.querySelector('.products');
let addProductModal = document.querySelector('.addProductModal');
if (gallery) {

    gallery.addEventListener('click', (e) => {
        if (e.target.tagName === 'PRODUCT-TAG') {
            let product = e.target;
            products.insertAdjacentHTML('beforeend', ` <div><div class="product">
            <div class="img">
                <img src="${product.getAttribute('src')}" alt="">
            </div>
            <div class="info">
                <div class="name">${product.getAttribute('name')}</div>
                <div class="price">$${product.getAttribute('price')}</div>
                <div>
                    <i class="fa fa-minus-square-o"></i>
                    <span id="number">1</span>
                    <i class="fa fa-plus-square-o"></i>
                </div>
            </div>
            <div class="delete"><i class="fa fa-trash"></i></div>
        </div>
        <span class="line"></span> </div>`);

            calcPrice(product.getAttribute('price'), 1);

            addProductModal.classList.add('active');

            setTimeout(() => {
                addProductModal.classList.remove('active');
            }, 2000);

            numOfAllProduct();

        }
    })
    products.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-trash')) {
            let product = e.target.parentElement.parentElement;
            let price = Number(product.querySelector('.price').innerHTML.slice(1));
            let number = Number(product.querySelector('#number').innerHTML);
            product.remove();
            calcPrice(price, -number);
            numOfAllProduct();
        }

        if (e.target.classList.contains('fa-minus-square-o')) {
            let number = e.target.nextElementSibling;
            let num = Number(number.innerHTML);
            if (num > 1) {
                num--;
                number.innerHTML = num;
                let price = Number(e.target.parentElement.parentElement.querySelector('.price').innerHTML.slice(1));
                calcPrice(price, -1);
            }
        }
        if (e.target.classList.contains('fa-plus-square-o')) {
            let number = e.target.previousElementSibling;
            let num = Number(number.innerHTML);
            num++;
            number.innerHTML = num;
            let price = Number(e.target.parentElement.parentElement.querySelector('.price').innerHTML.slice(1));
            calcPrice(price, 1);
        }

    })

    let totalPrice = document.getElementById('total-price');

    function calcPrice(price, num) {
        let lastPrice = Number(totalPrice.innerHTML.slice(1));
        lastPrice += (price * num);
        totalPrice.innerHTML = '$' + lastPrice;
    }

    let delAll = document.querySelector('.delAll');

    delAll.addEventListener('click', () => {
        products.innerHTML = '';
        totalPrice.innerHTML = '$0';
        bascket.innerHTML = '0';
    })

    let bascket = document.querySelector('.bascket');

    function numOfAllProduct() {
        let product = document.querySelectorAll('.product');
        let num = 0;
        product.forEach(pro => {
            num++;
        })
        bascket.innerHTML = num;
    }
}
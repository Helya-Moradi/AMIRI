let template = document.createElement('template');
template.innerHTML = ` 
<link rel="stylesheet" href="../components/product/product.css">
<div class="gallery-item">
<div class="gallery-img">
    <img src="" alt="" class="main-img">
    <img src="" alt="" class="hover-img">
</div>
<p class="gallery-item-text">3 STAR TRUCKER HAT <br> $ 320</p>
</div>`;

class Product extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
        this.shadowRoot.querySelector('.main-img').setAttribute('src', this.getAttribute('src'));
        this.shadowRoot.querySelector('.hover-img').setAttribute('src', this.getAttribute('srcHover'));
        this.shadowRoot.querySelector('.gallery-item-text').innerHTML = this.getAttribute('name') + '<br> $' + this.getAttribute('price');
    }

    static observedAttributes() {
        return ['src', 'srcHover', 'name', 'price'];
    }
}

export {
    Product
};
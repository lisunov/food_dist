import {getResource} from '../services/services';

function cards() {
  class MenuItem {
    constructor(image, alt, subtitle, description, price, ...classes) {
    this.image = image;
    this.alt = alt;
    this.subtitle = subtitle;
    this.description = description;
    this.price = +price;
    if (classes.length > 0) {
      this.classes = classes;
    } else {
      this.classes = ['menu__item'];
    }
    this.transfer = 27;
  }

  changeToUAH() {
    return this.price * this.transfer;
  }

  asHtml() {
    return `     <img src=${this.image} alt=${this.alt}>
                   <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                   <div class="menu__item-descr">${this.description}</div>
                   <div class="menu__item-divider"></div>
                   <div class="menu__item-price">
                       <div class="menu__item-cost">Цена:</div>
                       <div class="menu__item-total"><span>${this.changeToUAH()}</span> грн/день</div>
                   </div>`;
  }

  get element() {
    const element = document.createElement('div');
    this.classes.forEach((className) => {
      element.classList.add(className);
    });
    element.innerHTML = this.asHtml();
    return element;
  }
}



  const container = document.querySelector('.menu .container');
  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //       const menuItem = new MenuItem(img, altimg, title, descr, price);
  //       container.append(menuItem.element);
  //     })
  //   });

  axios.get('http://localhost:3000/menu')
    .then(data =>  {
    data.data.forEach(({img, altimg, title, descr, price}) => {
      const menuItem = new MenuItem(img, altimg, title, descr, price);
      container.append(menuItem.element);
    })
    });
}

export default cards;
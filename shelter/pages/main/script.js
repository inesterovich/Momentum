let sliderContainer = document.querySelector('.card__items')
let leftArrow = document.querySelector('.arrow__left');
let rightArrow = document.querySelector('.arrow__right');
let body = document.querySelector('body')
let slidesCollection = sliderContainer.children;

let petsHtml = generateHTMLContent(petsData);
let slides = randomizeHTML(petsHtml);

let menuBtn = document.querySelector('.menu__button');
let modals = document.querySelector('.modals');
let mobileLink = modals.querySelector('.list__item_link_active');

slides.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item));


let overlay = document.querySelector('.overlay');

for (let i = 0 ; i < slidesCollection.length; i++) {

  slidesCollection[i].classList.add('card__item_visible')
}

function getAbsoluteCoords(elem) {

  let box = elem.getBoundingClientRect();

return {
  top: box.top + pageYOffset,
  left: box.left + pageXOffset
}
}

function generateHTMLContent(data) {

  let result = []

  for (let i = 0; i < data.length; i++) {
    let template = `<div id="${i}" class="card__item">
    <div class="img__wrapper">
        <img src="${data[i].img}" alt="${data[i].type} ${data[i].name}" class="card__img">
    </div>
    <h4 class="card__title">${data[i].name}</h4>
    <a href="#" class="button card__button">Learn more</a>    
</div>
`

result.push(template)
  }
return result;
  
}


function randomizeHTML(HTMLColllection) {

  let browserWidth = window.innerWidth;
  let slideNumbers;
  let visibleSlides = document.querySelectorAll('.card__item_visible');
  let arrayVisibleIndex = [];
  
  for (let i = 0; i < visibleSlides.length; i++) {

    arrayVisibleIndex.push(+visibleSlides[i].id)
  }
  let HTMLArrayIndex = [];

  for (let i = 0; i < HTMLColllection.length; i++) {
    HTMLArrayIndex.push(i);
  }

   if (browserWidth >= 1280) {
     slideNumbers = 3;
   } else if (browserWidth >= 768 && browserWidth < 1280 ) {

    slideNumbers = 2;
   } else  {
     slideNumbers = 1;
   }

   let filtredArray = HTMLArrayIndex.filter(item => !arrayVisibleIndex.includes(item));
   let sortedArray = filtredArray.sort((a,b)=>Math.random()*2-1).slice(0, slideNumbers);

   let result = sortedArray.map(item => HTMLColllection[item]);

   return result;

}


function menu() {
 
  
  let modals = document.querySelector('.modals');
  let mobileMenu = modals.querySelector('.mobile__menu');
  let logo = document.querySelector('.logo');
  
  overlay.classList.toggle('overlay__active');
  menuBtn.classList.toggle('rotate');
  mobileMenu.classList.toggle('mobile__menu_hidden');
  logo.classList.toggle('logo__fixed');

 
}


function addModalContent(dataArray, id) {
  let template = ` <section class="pets__modal">

  <button class="close__modal" type="button">Закрыть</button>
  <div class="modal__container">
      
      <div class="img__wrapper">

          <div class="img">
              <img src="../../assets/images/pets-${dataArray[id].name}.png" alt="${dataArray[id].type} ${dataArray[id].name}">
          </div>
   </div>

  <div class="text__wrapper">
          <h3 class="text__header">
              ${dataArray[id].name}
              </h3>
          <b> ${dataArray[id].type} -  ${dataArray[id].breed}</b>

          <p class="text__item"> ${dataArray[id].description}</p>
          <ul>
              <li><span>Age:</span>  ${dataArray[id].age}</li>
              <li><span>Inoculations:</span>  ${dataArray[id].inoculations.join()}</li>
              <li><span>Diseases:</span>  ${dataArray[id].diseases.join()}</li>
              <li><span>Parasites:</span>  ${dataArray[id].parasites.join()}</li>
          </ul>

     

      
   </div>   
    


</div>
</section>
`

return template;
}



document.addEventListener ('click', (event) => {
  let targetDOM = event.target.classList;
  let targetArray = Array.from(targetDOM);
  
   if (targetArray.includes('menu__button')) {
    menu();
   }
  
   if (targetArray.includes('arrow')) {
    slides = randomizeHTML(petsHtml);
    slides.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item))
    for (let i = 0; i < slidesCollection.length; i++) {
        if (slidesCollection[i].classList.contains('card__item_visible')) {
         
          slidesCollection[i].remove();
          i--;
        } else {

          slidesCollection[i].classList.add('card__item_visible');
        }

    }
   }

   if (targetArray.includes('card__item')) {

    let targetCardId = event.target.id;
    let petsModalContent = addModalContent(petsData, targetCardId);
    modals.insertAdjacentHTML('beforeend', petsModalContent)
    let petsModal = modals.querySelector('.pets__modal');
   menuBtn.classList.add('hidden');
    body.classList.add('unscrollable');
   petsModal.classList.add('modal__active');
   overlay.classList.add('overlay__active');

   }


   if (targetArray.includes('card__button')) {
    event.preventDefault();
    let targetCardId = event.target.parentNode.id;
    let petsModalContent = addModalContent(petsData, targetCardId);
    modals.insertAdjacentHTML('beforeend', petsModalContent)
    let petsModal = modals.querySelector('.pets__modal');
   menuBtn.classList.add('hidden');
    body.classList.add('unscrollable');
   petsModal.classList.add('modal__active');
   overlay.classList.add('overlay__active');

   }


   if (targetArray.includes('close__modal') || targetArray.includes('pets__modal') || (targetArray.includes('overlay') &&
    modals.children.length > 1)) {
      let petsModal = modals.querySelector('.pets__modal');
     menuBtn.classList.remove('hidden');
    body.classList.remove('unscrollable');
    overlay.classList.remove('overlay__active');
   petsModal.classList.remove('modal__active');
   petsModal.remove();
   }

   if (targetArray.includes('overlay') && menuBtn.classList.contains('rotate')) {
     menu()
   }

   if (event.target === mobileLink) {
    menu()
  }

  
  
  })



 
 































'use strict'

let cardsConainer = document.querySelector('.card__items');
let paginationContainer = document.querySelector('.pagination__container');
let petsHtml = generateHTMLContent(petsData);
let cardsArry = generateRandomArray(petsHtml, 6).map(item => petsHtml[item]); 
let cardsPerPage = getCardPerPage();
let menuBtn = document.querySelectorAll('.menu__button');
let modals = document.querySelector('.modals')
let overlay = document.querySelector('.overlay');
let body = document.querySelector('body');
let mouseClick = new Event('click');

let mobileLink = modals.querySelector('.list__item_link_active');

generatePagination(cardsArry);
let cards = cardsArry.slice(0, cardsPerPage);

console.log(cardsArry.length)

cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item))
let setExample = generateSet(petsHtml);

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function generateSet(data) {

  let set = new Set();

  while (set.size < data.length) {
    let randomNumber = randomInteger(0, data.length - 1);
    set.add(randomNumber);
  }

  return set;
}

function getCardPerPage() {
  let browserWidth = window.innerWidth;
  let slidesPerPage;
  if (browserWidth >= 1280) {
      slidesPerPage = 8;
    } else if (browserWidth >= 768 && browserWidth < 1280 ) {
 
     slidesPerPage = 6;
    } else  {
      slidesPerPage = 3;
    }

    return slidesPerPage;
}


function getPages (array) {
    
    let cardsPerPage = getCardPerPage();
  
   
      let pages = array.length / cardsPerPage;

      return pages;
}


function generatePagination(array) {
  let pages = getPages(array);
 
  let currentPage = paginationContainer.querySelector('.pagination__item_active') ;

  if (currentPage === null) {

    currentPage = 1;
  }
  
  let template = `<button data-firstPage class="pagination__item pagination__item_disabled" >&lt;&lt;</button>
  <button data-previous  class="pagination__item pagination__item_disabled" >&lt;</button>
  <button data-current class="pagination__item pagination__item_active">${currentPage}</button>
  <button data-next class="pagination__item">&gt;</button>
  <button data-lastPage = "${pages}" class="pagination__item">&gt;&gt;</button>`


paginationContainer.insertAdjacentHTML('beforeend', template);

}

function generateRandomArray(data, repeatTimes) {

  let resultArray = [];

  for (let i = 0; i < repeatTimes; i++) {
    let set = generateSet(data);
    let setArray = Array.from(set);
    resultArray.push(setArray);
  }

  resultArray = resultArray.flat();

return resultArray;
}


function menu() {
 
  
  let modals = document.querySelector('.modals');
  let mobileMenu = modals.querySelector('.mobile__menu');
  let logo = document.querySelector('.logo');
  
  overlay.classList.toggle('overlay__active');
  menuBtn.forEach( item => item.classList.toggle('rotate'))

  mobileMenu.classList.toggle('mobile__menu_hidden');
  logo.classList.toggle('logo__hidden');

 
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


document.addEventListener('click', (event) => {

  console.log(event.target)
let paginationFirstPage = paginationContainer.querySelector('[data-firstPage]');
let paginationPrevious = paginationContainer.querySelector('[data-previous]');
let paginationCurrent = paginationContainer.querySelector('[data-current]');
let paginationNext = paginationContainer.querySelector('[data-next]');
let paginationLast = paginationContainer.querySelector('[data-lastPage]');
let cardsPerPage = getCardPerPage();
let currentPageNumber = Number(paginationCurrent.innerText);

let targetDOM = event.target.classList;
  let targetArray = Array.from(targetDOM);
  
   if (targetArray.includes('menu__button')) {
    menu();
   }
  
   let mobileBtn = menuBtn[1]

   if (targetArray.includes('overlay') && mobileBtn.classList.contains('rotate')) {
    menu();
  }

  if (targetArray.includes('card__button')) {
    event.preventDefault();
    let targetCardId = event.target.parentNode.id;
    let petsModalContent = addModalContent(petsData, targetCardId);
    modals.insertAdjacentHTML('beforeend', petsModalContent)
    let petsModal = modals.querySelector('.pets__modal');
   menuBtn[0].classList.add('hidden');
    body.classList.add('unscrollable');
   petsModal.classList.add('modal__active');
   overlay.classList.add('overlay__active');

   }

   if (targetArray.includes('card__item')) {

    let targetCardId = event.target.id;
    let petsModalContent = addModalContent(petsData, targetCardId);
    modals.insertAdjacentHTML('beforeend', petsModalContent)
    let petsModal = modals.querySelector('.pets__modal');
   menuBtn[0].classList.add('hidden');
    body.classList.add('unscrollable');
   petsModal.classList.add('modal__active');
   overlay.classList.add('overlay__active');

   }


   if (targetArray.includes('close__modal') || targetArray.includes('pets__modal') || (targetArray.includes('overlay') &&
    modals.children.length > 1)) {
      let petsModal = modals.querySelector('.pets__modal');
     menuBtn[0].classList.remove('hidden');
    body.classList.remove('unscrollable');
    overlay.classList.remove('overlay__active');
   petsModal.classList.remove('modal__active');
   petsModal.remove();
   }

   if (event.target === mobileLink) {
     menu()
   }


 
 

let pages = getPages(cardsArry);

if (event.target === paginationNext ) {

let nextPage = currentPageNumber + 1;

if (nextPage < pages) {
  cardsConainer.innerHTML = '';
  let startIndex = (nextPage - 1) * cardsPerPage;
  let endIndex = startIndex + cardsPerPage;
  cards = cardsArry.slice(startIndex, endIndex);
  cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item))

  paginationPrevious.classList.remove('pagination__item_disabled');
  paginationFirstPage.classList.remove('pagination__item_disabled');
  paginationCurrent.innerText = nextPage;
} 

if (nextPage === pages) {
  cardsConainer.innerHTML = '';
  let startIndex = (pages - 1) * cardsPerPage;
  let endIndex = startIndex + cardsPerPage;
  cards = cardsArry.slice(startIndex, endIndex);
  cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item))
  paginationNext.classList.add('pagination__item_disabled');
  paginationLast.classList.add('pagination__item_disabled');
  paginationCurrent.innerText = pages;
}

}


if (event.target === paginationLast) {
  cardsConainer.innerHTML = '';
  let startIndex = (pages - 1) * cardsPerPage;
  let endIndex = startIndex + cardsPerPage;
  cards = cardsArry.slice(startIndex, endIndex);
  cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item))
  paginationCurrent.innerText = pages;
  paginationPrevious.classList.remove('pagination__item_disabled');
  paginationFirstPage.classList.remove('pagination__item_disabled');
  paginationNext.classList.add('pagination__item_disabled');
  paginationLast.classList.add('pagination__item_disabled');
}

if (event.target === paginationPrevious) {
  let previousPage = currentPageNumber - 1;

  if (previousPage >= 1) {
    cardsConainer.innerHTML = '';

    let startIndex = (previousPage - 1) * cardsPerPage;
    let endIndex = startIndex + cardsPerPage;

    cards = cardsArry.slice(startIndex, endIndex);
    cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item))
    paginationNext.classList.remove('pagination__item_disabled');
    paginationLast.classList.remove('pagination__item_disabled');
    paginationCurrent.innerText = previousPage;

  }

  if (previousPage === 1) {

    paginationPrevious.classList.add('pagination__item_disabled');
    paginationFirstPage.classList.add('pagination__item_disabled');
  }

}

if (event.target === paginationFirstPage) {
   cardsConainer.innerHTML = '';
   let startIndex = 0;
   let endIndex = startIndex + cardsPerPage;
   cards = cardsArry.slice(startIndex, endIndex);
   cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item));

   paginationPrevious.classList.add('pagination__item_disabled');
  paginationFirstPage.classList.add('pagination__item_disabled');
  paginationNext.classList.remove('pagination__item_disabled');
  paginationLast.classList.remove('pagination__item_disabled');
  paginationCurrent.innerText = '1';

}

  

})







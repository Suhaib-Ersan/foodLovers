"use strict";

let ordersArray = [];

function getData(){
  let stringDataFromLS = localStorage.getItem('orders');

  if (stringDataFromLS !== null){
    let normalDataFromLS = JSON.parse(stringDataFromLS);
    ordersArray = normalDataFromLS;
  }

}
getData();

function setDataToLS() {
  let dataCheck = localStorage.getItem('orders');
  if (dataCheck !== null) {
    localStorage.removeItem('orders');
  }

  let dataToLS = JSON.stringify(ordersArray);
  localStorage.setItem('orders', dataToLS);
}




let formSubmit = document.getElementById("submitOrderForm");
formSubmit.addEventListener("submit", addOrder);

function addOrder(event) {
  event.preventDefault();

  let custName = event.target.children[0].children[1].value;
  let custChoice = event.target.children[0].children[5].value;

  let foodImg;
  if (custChoice === 'shawarma') {
    foodImg = "assets/food/shawarma.jpg";
  } else if (custChoice === 'burger') {
    foodImg = "assets/food/burger.jpg";
  } else {
    foodImg = "assets/food/pizza.jpg";
  }

  new Order(custName, custChoice, foodImg);

  render();
  setDataToLS();
}

function Order(name, food, foodImage) {
  this.name = name;
  this.food = food;
  this.foodImage = foodImage;
  
  ordersArray.push(this);
}

function render() {
  let tableEl = document.getElementById('listSectionTable');

  tableEl.innerHTML = '';

  // <tr>
  // <th>Order Image</th>
  //<th>Order Details</th>
  //</tr>

  let headerTrEl = document.createElement('tr');
  tableEl.appendChild(headerTrEl);

  let imageThEl = document.createElement('th');
  imageThEl.textContent = 'Order Image';
  headerTrEl.appendChild(imageThEl);

  let orderThEl = document.createElement('th');
  orderThEl.textContent = 'Order Details';
  headerTrEl.appendChild(orderThEl);

  for (let i = 0; i < ordersArray.length; i++) {
    let trEl = document.createElement('tr');
    tableEl.appendChild(trEl);

    let imgPath = ordersArray[i].foodImage;
    let imgEl = document.createElement('img');
    imgEl.setAttribute('src',imgPath);

    let imageTdEl = document.createElement('td');
    imageTdEl.setAttribute('class','foodImageTd');
    imageTdEl.appendChild(imgEl);
    trEl.appendChild(imageTdEl);
  


    let tdDetailsEl = document.createElement('td');
    trEl.appendChild(tdDetailsEl);
    
    let custName = ordersArray[i].name;
    let custNameField = `Customer Name: ${custName}`;
    let custNamePEl = document.createElement('p');
    custNamePEl.textContent = custNameField;

    tdDetailsEl.appendChild(custNamePEl);



    let foodChoice = ordersArray[i].food;
    let custFoodField = `Food Type: ${foodChoice}`;
    let custFoodPEl = document.createElement('p');
    custFoodPEl.textContent = custFoodField;
    
    tdDetailsEl.appendChild(custFoodPEl);



    let price = randomNumber(1,100);
    let priceField = `Food Price : ${price}`;
    let priceEl = document.createElement('p');
    priceEl.textContent = priceField;

    tdDetailsEl.appendChild(priceEl);

  }
}

function randomNumber(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let clearBtnEl = document.getElementById('clearStorage');
clearBtnEl.addEventListener('click',clearStorageFun);
function clearStorageFun() {
  localStorage.clear();
  getData();
  
  let tableEl = document.getElementById('listSectionTable');

  tableEl.innerHTML = '';

  let headerTrEl = document.createElement('tr');
  tableEl.appendChild(headerTrEl);

  let imageThEl = document.createElement('th');
  imageThEl.textContent = 'Order Image';
  headerTrEl.appendChild(imageThEl);

  let orderThEl = document.createElement('th');
  orderThEl.textContent = 'Order Details';
  headerTrEl.appendChild(orderThEl);
}

render();
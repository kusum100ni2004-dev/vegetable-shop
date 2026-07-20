
let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');  
    loginForm.classList.remove('active'); 
    cart.classList.remove('active');
}





let cart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    cart.classList.toggle('active');
    navbar.classList.remove('active');  
    searchForm.classList.remove('active');
    loginForm.classList.remove('active'); 
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');  
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active'); 
    searchForm.classList.remove('active');
    loginForm.classList.remove('active'); 
    cart.classList.remove('active');
}

window.onscroll=()=>{
    navbar.classList.remove('active');  
    searchForm.classList.remove('active');
    loginForm.classList.remove('active'); 
    cart.classList.remove('active');
}



let slides   = document.querySelectorAll('.home .slides-container .slide');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

 
 
    // Get search box and list items
    const searchBox = document.getElementById('searchBox');
    const items = document.querySelectorAll('#itemList li');

    // Run this whenever user types
    searchBox.addEventListener('keyup', function() {
      const searchText = searchBox.value.toLowerCase();

      items.forEach(item => {
        const text = item.textContent.toLowerCase();

        // If the list item includes the search text → show it, else hide
        if (text.includes(searchText)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }); 


    function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("output").innerHTML = "Geolocation not supported";
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  document.getElementById("output").innerHTML =
    
    `<br><a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank">
     Open in Google Maps</a>`;
}

function showError(error) {
  document.getElementById("output").innerHTML = "Permission denied or error";
}

let cart = [];

const plusBtns = document.querySelectorAll(".sum");
const minusBtns = document.querySelectorAll(".sub");
const products = document.querySelectorAll(".mat1");

plusBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {

        let name = products[index].querySelector("h1").innerText;
        let price = parseInt(
            products[index]
            .querySelector("h2")
            .innerText.replace("Rs", "")
        );

        let item = cart.find(p => p.name === name);

        if(item){
            item.qty++;
        } else {
            cart.push({
                name: name,
                price: price,
                qty: 1
            });
        }

        updateCart();
    });
});

minusBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {

        let name = products[index].querySelector("h1").innerText;

        let item = cart.find(p => p.name === name);

        if(item){
            item.qty--;

            if(item.qty <= 0){
                cart = cart.filter(p => p.name !== name);
            }
        }

        updateCart();
    });
});

function updateCart(){

    const cartList = document.getElementById("you");
    cartList.innerHTML = "";

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.qty;

        let li = document.createElement("li");

        li.innerHTML =
        `${item.name} | Qty:${item.qty} | ₹${item.price * item.qty}`;

        cartList.appendChild(li);
    });

    document.getElementById("item").innerHTML =
    `🛒 Cart (${totalItems})`;
}

function placeOrder(){

    if(cart.length === 0){
        alert("Cart Empty");
        return;
    }

    let allOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

    allOrders.push({
        date: new Date().toLocaleString(),
        items: cart
    });

    localStorage.setItem(
        "orders",
        JSON.stringify(allOrders)
    );

    alert("Order Placed Successfully");

    cart = [];

    updateCart();
}
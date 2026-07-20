let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');

    if(typeof navbar !== "undefined") navbar.classList.remove('active');
    if(typeof loginForm !== "undefined") loginForm.classList.remove('active');
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addButtons = document.querySelectorAll(".sum");
const subButtons = document.querySelectorAll(".sub");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productDiv = button.closest(".mat1");

        const name = productDiv.querySelector("h1").innerText;

        const priceText = productDiv.querySelector("h2").innerText;

        const price = parseInt(priceText.replace("Rs", ""));

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(name + " Added To Cart");
    });

});

subButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productDiv = button.closest(".mat1");

        const name = productDiv.querySelector("h1").innerText;

        const index = cart.findIndex(item => item.name === name);

        if (index !== -1) {

            cart[index].quantity--;

            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
        }

    });

});
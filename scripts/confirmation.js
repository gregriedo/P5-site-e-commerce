let totalPrice = localStorage.getItem("prixTotal");
let orderId = localStorage.getItem("orderId");

let userOrder = document.getElementById("order_id");
userOrder.innerHTML = orderId;
let somme = document.getElementById("order_total");
somme.innerHTML= totalPrice;

localStorage.clear();

let panier = JSON.parse(localStorage.getItem('panier'));
let tbody = document.getElementById("panier");
let totalPrices=0;


let products=[];
panier.forEach(element=>{
  displayCart(element);
  totalPrices=totalPrices + (element.prix*element.quantite);
  products.push(element.id);
})





function displayCart(element){
  let tr = document.createElement("tr");

  let td1 = document.createElement("td");
  td1.innerHTML=element.nom + "Lentilles :" +element.lenses;
  let td2 = document.createElement("td");
  td2.innerHTML=element.quantite;
  let td3 = document.createElement("td");
  td3.innerHTML = element.quantite * element.prix + "€";


  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tbody.appendChild(tr);

}


let tr = document.createElement("tr");

let th=document.createElement("td");
th.innerHTML="";


let td4=document.createElement("td");
td4.innerHTML = "Total de votre Commande :";


let td5=document.createElement("td");
td5.innerHTML = totalPrices +"€";


tr.appendChild(th);
tr.appendChild(td4);
tr.appendChild(td5);
tbody.appendChild(tr);





let form= document.querySelector('#contact');

let name=document.getElementById('lastname');
let firstName = document.getElementById('firstname');
let mail = document.getElementById('email');
let adresse = document.getElementById('adresse');
let ville = document.getElementById('ville');
let codePostal = document.getElementById('codepostal');

form.addEventListener('submit', e=>{
  e.preventDefault();

  let contact= {
    firstName: name.value,
    lastName: firstName.value,
    address: adresse.value,
    city: ville.value,
    email:  mail.value,
  }

  let order={contact, products};


  let url = "http://localhost:3000/api/cameras/order";

  fetch(url, {
        method: 'POST',
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(order)

        })
        .then(response=>{
        response.json().then(data=>{
          let orderId = data.orderId;
          console.log(data);
          if(response.ok){

            localStorage.removeItem("panier");
            localStorage.setItem("prixTotal",totalPrices);
            localStorage.setItem("orderId",orderId);

          }

        })




      });
  });

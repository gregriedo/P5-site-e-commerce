let panier = JSON.parse(localStorage.getItem('panier'));
let tbody = document.getElementById("panier");
let td6=document.createElement("td");
let totalPrices=0;


let products=[];

//Ajout des produits dans le tableau récapitulatif de la commande

  panier.forEach(element=>{
    totalPrices = totalPrices + (element.prix * element.quantite);
     displayCart(element);

     products.push(element.id);
   })
    subTotal(totalPrices,tbody);


let form= document.querySelector('#contact');

let name=document.getElementById('lastname');
let firstName = document.getElementById('firstname');
let mail = document.getElementById('email');
let adresse = document.getElementById('adresse');
let ville = document.getElementById('ville');
let codePostal = document.getElementById('codepostal');

// Validation du formulaire et envoie de la Commande

form.addEventListener('submit', e=>{
  e.preventDefault();

  let contact= {
    firstName: name.value,
    lastName: firstName.value,
    address: adresse.value,
    city: ville.value,
    email:  mail.value,
  }
  sendOrders(contact,products);

});

  // Création du tableau de la commande
  // A tester pour etre sur que le total prend bien compte le prix et la quantité

  function displayCart(element){
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerHTML=element.nom + "Lentilles :" +element.lenses;
    let td2 = document.createElement("td");
    td2.innerHTML=element.quantite;
    let button = document.createElement("button");
    button.innerHTML = "-";
    button.classList = "btn_quantity";
    button.id = element.id;
    let td3 = document.createElement("td");
    td3.innerHTML = element.quantite * element.prix+ "€";
    let td4 = document.createElement("td");

    td2.appendChild(button);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);

// Suppression article dans le panier

    button.addEventListener("click",e=>{
      e.preventDefault();
      totalPrices=0;
      arrayId = 0;
      panier.forEach(element=>{
          if(button.id==element.id){
            element.quantite--;
            td2.innerHTML=element.quantite;
            td2.appendChild(button);

            if(element.quantite<1){
              td2.parentNode.remove();
              td2.innerHTML=element.quantite;
              panier.splice(arrayId, 1);


            }

          }
          totalPrices = totalPrices + (element.prix * element.quantite);
        })

        localStorage.setItem('panier', JSON.stringify(panier));
        td6.innerHTML = totalPrices +"€";
      });
};


  // Fonction créant le Total de la commande
  function subTotal(totalPrices,tbody){
    let tr = document.createElement("tr");
    let th=document.createElement("td");
    th.innerHTML="";
    let td5=document.createElement("td");
    td5.innerHTML = "Total de votre Commande :";

    td6.innerHTML = totalPrices +"€";
    tr.appendChild(th);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tbody.appendChild(tr);
  };


// Fonction qui envoie la commande et les coordonnées au serveur
  function sendOrders(contact,products){
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
            sendOrder(orderId, totalPrices);
          })
          .catch(function (error) {
            console.log('Request failed', error);
        });
      });
  };


// Ajout dans le localStorage du prix Total, de l'order id et renvoi vers la page confirmation
  function sendOrder(orderId, totalPrices){
    localStorage.clear();
    localStorage.setItem("prixTotal",totalPrices);
    localStorage.setItem("orderId",orderId);
    window.location.href = "confirmation.html";
};

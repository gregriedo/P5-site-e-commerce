let url ="http://localhost:3000/api/cameras";
let main=document.getElementById("main");

//Récupération des données pour afficher les caméras
fetch(url)
.then( response=>{
    if (response.status !== 200) {
      console.log('Erreur avec le code: ' +
      response.status);
      return;
    }
    response.json().then(data=>{
      data.forEach(element =>{
        showCamera(element);

      })

    })
})

.catch(err=> {
  console.log('Message erreur', err);
});

//Fonction pour afficher les caméras
function showCamera (element){
  let div=document.createElement("div");
  div.classList='col-md-3';
  let a=document.createElement("a");
  a.href="produit.html?id="+element._id;
  a.innerHTML=element.name;
  let img=document.createElement("img");
  img.src=element.imageUrl;
  img.classList='w-100';
  let p=document.createElement("p");
  p.innerHTML=element.price + "€";
  div.appendChild(a);
  div.appendChild(img);
  div.appendChild(p);
  main.appendChild(div);

};

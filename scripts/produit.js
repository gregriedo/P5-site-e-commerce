let queryString = window.location.search;


let id= new URLSearchParams(queryString).get("id");

let url ="http://localhost:3000/api/cameras/"+id;
let main=document.getElementById("main");
fetch(url)
.then(
  function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
      response.status);
      return;
    }

    // Examine the text in the response
  response.json().then(function(element) {
    let div=document.createElement("div");
    let a=document.createElement("h2");
    a.href="produit.html?id="+element._id;
    a.style.fontWeight = "bold";
    a.innerHTML=element.name;
    let img=document.createElement("img");
    img.src=element.imageUrl;
    let title=document.createElement("h3");
    title.innerHTML="Prix";
    let p=document.createElement("p");
    p.innerHTML=element.price + "€";
    let title2=document.createElement("h3");
    title2.innerHTML="Description du produit";
    let p2=document.createElement("p");
    p2.innerHTML=element.description;


    let select=document.getElementById('lenses');

    let lenses=element.lenses;
    lenses.forEach(data=>{
      let option=document.createElement('option');
      option.innerHTML=data;
      select.appendChild(option);


    })
    let quantite =document.getElementById('quantite');

    let bouton=document.getElementById('submit-form');

        bouton.addEventListener("click", function(e) {
          e.preventDefault();
          let panier=[];
          let isExist=false;
          if(localStorage.getItem('panier')){
            panier= JSON.parse(localStorage.getItem('panier'));
            panier.forEach(element=>{
              if(element.id==id && element.lenses==select.value){
                element.quantite++;
                isExist=true;
              }
            })
          }
          if(!isExist){
            let camera={
              id: id,
              nom:element.name,
              prix:element.price,
              description:element.description,
              lenses:select.value,
              quantite:1,


            }
            panier.push(camera);
          }

          localStorage.setItem('panier', JSON.stringify(panier));
        alert("Votre article a été ajouté !!")
    });

    div.appendChild(a);
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(p);
    div.appendChild(title2);
    div.appendChild(p2);
    main.appendChild(div);


  });
}
)
.catch(function(err) {
console.log('Fetch Error :-S', err);
});

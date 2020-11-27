let url ="http://localhost:3000/api/cameras";
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
  response.json().then(function(data) {
    console.log(data);
    data.forEach(function(element){
      let div=document.createElement("div");
      div.classList='col-3';
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

    });
  });
}
)
.catch(function(err) {
console.log('Fetch Error :-S', err);
});

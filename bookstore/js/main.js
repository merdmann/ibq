
'use strict'

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Tree loaded')

  function main() {
    fetchData("https://api.myjson.com/bins/udbm5")
  }
  main();

   
          /*<div class="card" style="width: 18rem;">
                <div class="card" style="width: 18rem;">
                  <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <img id="book-front-cover" src="...." alt="book front cover" style="width:300px;">
                      </div>
                      <div class="flip-card-back">
                        <h1 id="book-autor-name"></h1> 
                        <p></p>
                      </div>
                    </div>
                  </div>
                <div class="card-body">
                  <h5 id="titel" class="card-title">Card title</h5>
                  <p id="card-text" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
              */

function placeCard( name, title ) {
        const root = document.getElementById(name);   
        console.log("***name: " & name & " " & root);
    

        var div0 = document.createElement("div");
        div0.classList.add("card");
        div0.setAttribute("style", "width: 18rem");
        var div1 = document.createElement("div");
        div1.classList.add( "flip-card");
        var div2 = document.createElement("div") 
        div2.classList.add( "flip-card-inner");
        div1.appendChild(div2);
        var div3= document.createElement("div");
        div0.appendChild(div3)
        div3.classList.add("flip-card-front")
        var img = document.createElement("img");
        div3.appendChild(img);
        var div4 = document.createElement("div");
        div4.classList.add("flip-card-back")
        div3.appendChild( div4 );
        

        var card_body = document.createElement("div")
        card_body.classList.add("card-body");
        div4.appendChild( card_body )
       
        var h5 =document.createElement("h5")        
        h5.setAttribute("id", "title");
        
        card_body.appendChild( h5 )
        h5.innerHTML = title;
        var p = document.createElement("p")
        p.setAttribute("id", "card-text")
        p.classList.add("card-title")
        card_body.appendChild(p);
        var a = document.createElement("a")
        a.classList.add( "btn-primry")
        a.setAttribute("href", "#"); 
        card_body.appendChild(a)    
        root.appendChild(div0);
    
        return root;
}
 

  function Show(elem){
        const frontCover = elem.portada;
        const moreInfo= elem.detallee;
        const title = elem.titolo;

        console.log(elem)

        placeCard("card1", elem.titolo);
        
        const _book_front_cover_ = document.getElementById("book-front-cover");
        _book_front_cover_.setAttribute("src", frontCover );  // put the image 
  

        const _book_autor_ = document.getElementById("book-autor-name");
        _book_autor_.innerHTML = elem.description;
        const _book_title_  = document.getElementById("book-title");
        _book_title_.innerHTML = elem.titulo;
        const _more_info_ = document.getElementById("more-info");
        _more_info_.setAttribute("href", elem.detallee);

        var _book_description_ = document.getElementById("#book-description");
        _book_description_.innerHTML = elem.description;
  };

  function ProcessAndRender( data ){
    const books = data["books"]

    Show( books[2])
  }

  // Needs to be refctored since it hides intention bhind a boolean,
  function fetchData (url) {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json'
        /* "X-API-Key": "wqmgqOHo1JMAkYIfh3sJr4FlUN3PCokyojEziJBK" */
      }
      /* mode: "cors" */
    })
      .then(function (response) {
        document.body.style.cursor = 'wait'
        return response.json()
      })
      .then(function (myJson) {
        console.log(myJson);
        document.body.style.cursor = 'auto'

        ProcessAndRender(myJson)
      })
      .catch(err => console.log(err))
  }

}) // DOMContentLoaded handler

'use strict'

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Tree loaded')

  function main() {
    fetchData("https://api.myjson.com/bins/udbm5")
  }

  main();

    
          /*<div class="card" style="width: 18rem;">
                <img id="card_image" class="card-img-top" src="..." alt="Card image cap">
                <div class="card-body">
                  <h5 id="titel" class="card-title">Card title</h5>
                  <p id="card-text" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
              */
function placeCard( name, title ) {
        const root = document.getElementById(name);   
        console.log(root);
    
        var div = document.createElement("div");
        div.setAttribute("class", "card");
        div.setAttribute("style", "width: 18rem");

        var card_body = document.createElement("div")
        card_body.setAttribute("class", "card-body");
        var h5 =document.createElement("h5")
        h5.setAttribute("id", "title");
        card_body.appendChild( h5 )
        h5.innerHTML = titel;
        var p = document.createElement("p")
        p.setAttribute("id", "card-text")
        p.setAttribute("class","card-title")
        card_body.appendChild(p);
        var a = document.creatElement("a")
        a.setAttribute("class", "btn-primry")
        a.setAttribute("href", "#"); 
        card_body.appendChild(a)    
        root.appendChild(div);
    
        return root;
}
    
    
  function ProcessAndRender( data ){
    const books = data["books"]

    books.forEach(function(elem){
        const frontCover = elem.portada;
        const backCover = elem.detalee;
        const title = elem.titolo;
        const card = document.getElementById("card1");
    
        console.log(data);
        
        var img = document.getElementById("card_image");
        img.setAttribute("src", frontCover );
        img.setAttribute("width", "70%");
        var card_text = document.getElementById("card-text");
        img.innerHTML = title;
            

        card.addEventListener("mouseover", function() {
            console.log("... flip ...");
        })
        console.log( data );
    });
  }

  // Needs to be refctored since it hides intention bhind a boolean,
  function fetchData (url) {
    console.log('connectionUrl = ' + url)

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

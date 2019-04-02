
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

function addElement( parent, elem, className, id, value) {
    var element = document.createElement(elem);
    if( className !== "")
        element.classList.add( className );
    
    if( id !== "")
        element.setAttribute( id, value);    
    
    parent.appendChild(element)
    
    return element;
}    
    
function placeCard( name, frontcover,title ) {
        const root = document.getElementById(name);   
        console.log("***name: " & name & " " & root);
    

        var div0 = addElement( root, "div", "card", "style", "width: 18rem" )
        var div1 = addElement( div0, "div", "flip-card", "","" )
        var div2 = addElement( div1, "div", "flip-card-inner", "", "")
        var div3 = addElwment( div2 ,"div", "flip-card-front", "", "")
        var img  = addElement( div3, "img", "", "src", frontcover)
        
        var div4 = addElememt( div3, "div", "flip-card-back", "", "")
        var h1   = addElement(  div3, "h1", "id", "book-autor-nam")
        var p    = addElement( div3, "p", "", "", "");
        var div5 = addElement( div0, "div", "card-body", "", "")
        var h5   = addElement( div0, "h5", "card-title", "id", "title");
        var pp   = addElement( div0, "p", "card-text", "id", "card-text");
        var a = addElement(div0, "a", "btn btn-primary", "href","#");
                             
    
        root.appendChild(div0);
    
        return root;
}
 

  function Show(elem){
        const frontCover = elem.portada;
        const moreInfo= elem.detallee;
        const title = elem.titolo;

        console.log(elem)

        placeCard("card1", elem.portada, elem.titolo);
        
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
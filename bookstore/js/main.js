
'use strict'

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Tree loaded')

  function main() {
    fetchData("https://api.myjson.com/bins/udbm5")
  }

  main();

  function ProcessAndRender( data ){
    const books = data["books"]

    books.forEach(function(elem){
        const frontCover = elem.portada;
        const backCover = elem.detalee;
        const title = elem.titolo;
    
        console.log(data);

        let cardImage = document.getElementById("card_image");
        cardImage.setAttribute("src", frontCover); 
        cardImage.addEventListener("mouseover", function() {
          console.log("... flip ...");
        });
        console.log( data )
    }) 
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

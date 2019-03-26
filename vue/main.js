
new Vue({
    el: '#app',
    data: {
        product,
        results
    },
    mounted: function () {
        console.log("***mounted****")
      // Code that will run only after the
      // entire view has been rendered
    }
})

  function fetchData(congress) {
    var url = "https://api.myjson.com/bins/1gqjt6"
    console.log(url)

    fetch(url, 
        { headers: { 
            "Content-Type": "application/json",
            /* "X-API-Key": "wqmgqOHo1JMAkYIfh3sJr4FlUN3PCokyojEziJBK" */},
            /* mode: "cors" */})
        .then( function(response) { 
            console.log( response )
            return response.json();
        }
        ).then( function(myJson) {
            results = myJson;
        }).catch(function(err) { console.log(err)})
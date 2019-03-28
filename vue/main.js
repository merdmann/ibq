

// function
        


new Vue({
    el: '#app',
    data: {
        product: [],
        results: [],
        states : [],
        selectedParty : [], 
    },
    methods: {

        dataChanged() {
            // this tells, the selected  party has changed.
            console.log("Data Changed****");
        },

        fetchData(){
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
                ).then( (myJson) => {
                    this.results = myJson.results[0].members;
                    this.results.forEach(item => {
                          if( !this.states.includes(item.state) ) { 
                              this.states.push(item.state);
                          }
                          
                          console.log( this );
                     })   
                }).catch(function(err) { console.log(err)})
        },
        properName( data ) {
            // calculate a valid name string
            var name = data.first_name + ' ' + (data.middle_name === null ? ' ' :data.middle_name) + ' ' + data.last_name;
            return name;
        },
    },
    mounted: function () {
        console.log("***mounted****")
        this.fetchData()
      // Code that will run only after the
      // entire view has been rendered
    },

    filters: {
        capitalize: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
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
    }
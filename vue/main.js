

// function
        


new Vue({
    el: '#app',
    data: {
        product: [],
        sorted : [],
        results: [],
        states : [],
        selectedParty : [],
        selectedState : "not set",
    },
    methods: {
        dataChanged() {
            // this tells, the selected  party has changed.
            console.log("*** Data changed selected party" + this.selectedParty);
            this.results.forEach(item => { 
                if(/* this.selectedParty.includes(item.party) */  item.state == selectedState ) {
                    console.log(item.state);
                    this.sorted.push(item);
                }
            })
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
        properName: function (value) {
          if (!value) return ''

          var name = value.first_name + ' ' + (value.middle_name === null ? ' ' :value.middle_name) + ' ' + value.last_name;
          
          return name;
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
/*
 * Refactored version 
 * After the currtenly opened page has been rendered depending on the page name 
 * the dcission is taken which data is oto be request from the the server. The data
 *  will be proceessed after  the data  has been received. 
 * 
 */
"use strict";

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Tree loaded');

    var filters = [];

    // Needs to be refctored since it hides intention bhind a boolean,
    function connectionUrl( house ) {
        return house ? "https://api.myjson.com/bins/16obo" : "https://api.myjson.com/bins/1gqjt6;"
    }
    
    //this function handles the dynamic comtents for title of s htnl pyges
    function HandleContents(data) {
        var docTitle = document.title;
        console.log("current page :" + docTitle);
        
        switch(docTitle) {
            case "Senate Data":
                    // Display the Senate data
                    fetchData(false)
            case "House Data":
                    // Display House dataq
                    fetchData(true);
                
            case "House attemdance":
            
            case "Senate attendance":
                    fetchData(false); // will trigger ProcessAndRender
                   
                
                
        }
    }
    HandleContents();

    function  ProcessAndRender(data) {
        let docTitle = document.title;
        console.log("ProceesAndReder current page :" + docTitle + " procesing records: " + data.length );
        let nbrOfMembers = {'D': 0.0, 'R':0.0,  'I': 0.0 };
        let votes_with = {'D': 0.0, 'R':0.0,  'I': 0.0 };
       
        switch(docTitle) {
            case "Senate Data":
                toTable(data,filters);  // renders the data into a table
                
            case "Senate attendance": 
                const by_missed_votes = function(a,b) { return a.missed_votes - b.missed_votes};

                data.forEach( function(item) {                  
                    nbrOfMembers[ item.party ] = nbrOfMembers[item.party] + 1; 
                    
                    votes_with[ item.party ] =+ item.votes_with_party_pct;
             
                });
                
                votes_with[ 'R'] = votes_with['R'] / nbrOfMembers['R'];
                votes_with[ 'D'] = votes_with['D'] / nbrOfMembers['D'];
                votes_with[ 'I'] = votes_with['I'] / nbrOfMembers['I'];
                
                console.log( data.length);
                console.log( nbrOfMembers);
                
                place_result(nbrOfMembers['D'], "D_Reps" );
                place_result(nbrOfMembers['R'], "R_Reps" );
                place_result(nbrOfMembers['I'], "I_Reps" );
                
                place_result(nbrOfMembers['I']+nbrOfMembers['R']+nbrOfMembers['D'], "Total_Reps" );

                place_result(votes_with['D'].toFixed(2), "D_VW" );
                place_result(votes_with['R'].toFixed(2), "R_VW" );
                place_result(votes_with['I'].toFixed(2), "I_VW" )
            
                data.sort( by_missed_votes);
        }
    }

    const DFilter = function (item) {
        return item.party === 'D';
    };
    const RFilter = function (item) {
        return item.party === 'R';
    };
    const IFilter = function (item) {
        return item.party === 'I';
    };
    const Default = function (item) {
        return true;
    };

    var filters = [];

    // execute the given filters by anding the result
    function applyAllFilters(data) {
        let result = true;

        filters.forEach( function(item){ result = result & item(data)} )

        console.log("applyAllFiters: " + filters.length + ",result: " + result);
        return result
    }


    function addFilter(aFilter, condition) {
        condition.push(aFilter);
        console.log("addFilter elements: ", condition.length);

        return condition;
    }

    //-------------- stuff needed for the state filter ------
    function createStatesSelector(list) {
        var result = list.sort()

        var select = document.getElementById('states')

        for (var i = 0; i < result.length; ++i) {
            var option = document.createElement('option')

            option.value = result[i]
            option.text = result[i]
            // console.log(result[i])
            select.appendChild(option)
        }
        select.appendChild(option)
    }

    // -------------- get the currently selected value ---------------
    function getState(list) {
        var option = document.getElementsByTagName('option');
        var select = document.getElementById('states');

        return option[select.selectedIndex].value;
    }

    // Put result
    function place_result(aString, aField) {
        var result = document.getElementById(aField);
        
        var text = document.createTextNode(aString);
        result.innerHTML = " "
        result.appendChild( text, )   
     }

// R.1 )the number of Democrats, Republicans and Independents
// R.2 how Democrats and Republicans compare, on average, for voting with their party
// R.3 which members most often do not vote with their party, which ones most often do vote with their party
// R.4 which members have missed the most votes, which have missed the least
// R.4 Display the result object in one table

// ------------------------------------------------------------------
function toTable(rows, filters) {
    var listOfStates = [];
    var tab = document.getElementById('root');
    var members = 0;
    var democrates = 0;
    var reps = 0;
    var independents = 0;
    var filters = [];
    // setup the initial data for the statics aspects
    // R.2 
    var votes_with       = {'D': 0.0, 'R': 0.0, 'I': 0.0 };
    var worst_voter_name = {'D': "",  'R': "",  'I': "" };
    var max_missed_votes = {'D': 0.0, 'R': 0.0, 'I': 0.0 };
    var nbrOfMembers     = {'D': 0.0, 'R':0.0,  'I': 0.0 };
    var missed_votes     = {'D': 0.0, 'R': 0.0, 'I': 0.0 };
    var min_with_votes   = {'D': 0.0, 'R': 0.0, 'I': 0.0 };
    var bad_voter        = {'D': "",  'R': "",  'I': "" }; // who is voting in most of the cases against his party
    var max_missed_name  = {'D': "",  'R': "",  'I': "" }; 
    var total_votes      = 0;
    var sampled = 0;
  
    const by_missed_votes = function(a,b) { return a.missed_votes - b.missed_votes};

    rows.sort( by_missed_votes ).forEach( function(data) {
        votes_with[data.party] += data.votes_with_party_pct; // not used

        console.log( data );

        nbrOfMembers[ data.party ] +=1; // R.2

        // calculate a valid name string
        var name = data.short_title+' '+data.first_name + ' ' + (data.middle_name === null ? ' ' :data.middle_name) + ' ' + data.last_name;

        // Req. R.4
        if (data.missed_votes > max_missed_votes[data.party]) {
            max_missed_votes[data.party] = data.missed_votes;
            worst_voter_name[data.party] = name;
        }

        if( data.votes_with_party_pct > min_with_votes[ data.party ] ) {
            min_with_votes[ data.party ] = data.votes_with_pct;
            bad_voter[ data.party ] = name;
        }
                
        total_votes += data.total_votes
        
        // who has the most missed votest
        if( data.missed_votes > max_missed_votes[ data.party ]) {
            max_missed_votes[ data.party ] = data.missed_votes;
            max_missed_name[ data.party ] = name;
        }
          
        if (applyAllFilters(data, filters)) {
            var row = tab.insertRow(-1)
            var td = row.insertCell(0)
            td.appendChild(document.createTextNode(members++))

            // storing the state before the filterss are applied only for alues we havnt seen before
            if (!listOfStates.includes(data.state))
                listOfStates.push(data.state)

            // ---------------------- col 1: first_name ---------------------------
            var td = row.insertCell(-1)

            // td.appendChild(document.createTextNode(name));

            var a = document.createElement('a')
            a.href = data.url
            a.title = 'some link to ' + name + ' page'
            a.innerHTML = name;
            td.appendChild(a);


            // ----------------------col 4: party ----------------------------------
            var td = row.insertCell(-1)
            td.appendChild(document.createTextNode(data.party))

            // ----------------------col 5: votes in percent -----------------------
            var td = row.insertCell(-1)
            td.appendChild(document.createTextNode(data.votes_with_party_pct + '%'))

            // -----------------------col 6: state ----------------------------------

            var td = row.insertCell(-1);
            td.appendChild(document.createTextNode(data.state));

            if(!listOfStates.includes(data.state))
                listOfStates.push(data.state)
            // ----------------------- link to homepage ----------------------------
            var td = row.insertCell(-1)

            var a = document.createElement('a')
            a.href = data.url
            a.title = 'some link to ' + name + ' page'
            a.innerHTML = data.url;
            td.appendChild(a);

            tab.appendChild(row);
        }
       
        leastEngaged( 'overview', rows.slice(5) ); 
        mostEngaged( 'overview', rows.slice( rows.length-5, rows.length));
    })
        
    createStatesSelector(listOfStates)
   
 //   console.log( nbrOfMembers );

    place_result(nbrOfMembers['D'], "R_Reps" );
    place_result(nbrOfMembers['R'], "D_Reps" );
    place_result(nbrOfMembers['I'], "I_Reps" );

    place_result( worst_voter_name['D'] + " with " + max_missed_votes['D'] + " missed votes", "result1");
    place_result( worst_voter_name['R'] + " with " + max_missed_votes['R'] + " missed votes", "result2");
    place_result( worst_voter_name['I'] + " with " + max_missed_votes['I'] + " missed votes", "result3");
    
    place_result(bad_voter['D'], "result11");
    place_result(bad_voter['R'], "result12");
    place_result(bad_voter['I'], "result13");

    //console.log( max_missed_name);

    place_result(max_missed_name['D'], "result21");
    place_result(max_missed_name['R'], "result22");
    place_result(max_missed_name['I'], "result23");

         
    leastEngaged( 'overview', rows.slice(5) ); 
    mostEngaged( 'overview', rows.slice( rows.length-5, rows.length)); 
};


function redraw(filter, filters) {
    // clear the screen and redraw all
    document.getElementById('root').remove();

    // restatore the root tag
    var tab = document.getElementById('data-table')
    var tbody = document.createElement('tbody')
    tbody.id = 'root'
    tab.appendChild(tbody);
    tbody.setAttribute("class", "table table-striped");
//    toTable(results.results[0].members, filters)
}

// --- democorates
var input = document.getElementsByTagName("input"); 

input[0].addEventListener('change', function () {
    if (input[0].checked) {
        filters = [];

        addFilter(DFilter, filters);
        fetchData();
    }
    redraw(filters);
})
// --- republicans
input[1].addEventListener('change', function () {
    if (input[1].checked) {
        filters = [];

        addFilter(RFilter, filters);
        fetchData();
    }
    redraw(filters);
})
// ----independant 
input[2].addEventListener('change', function () {
    if (input[2].checked) {
        filters = [];

        addFilter(IFilter, filters);
        fetchData();
    }
    redraw(filters);
})

// something has changed in the state selection
    const states = document.getElementById('states'); 
    states.addEventListener('change', function () {

    const  state = getState();

    const StateFilter = function (item) { 
        var result = item.state == state;
        console.log( "State: " + item.state + "/" + state);
        return result;
    };

    console.log("on change state=" + state);
    redraw(addFilter(StateFilter, filters));
});


// this function will take a list of names sorted accoring to engagment of the person.
function leastEngaged( root, tab ) {
    var tbdy= document.getElementById(root)
    if(tbdy == null)
        return;

    tab.forEach( function (item) {
        var tr = tbdy.insertRow(-1)
        var td = tr.insertCell(0)

        // name 
        console.log(item.last_name);
        td.appendChild(document.createTextNode(item.last_name));
        
        // missed votes
        td = tr.insertCell(-1)
        td.appendChild(document.createTextNode(item.missed_votes ))
            
        // missed votes in %
        td = tr.insertCell(-1)
        td.appendChild(document.createTextNode( (100 * item.missed_votes / item.total_votes).toFixed(2)));

        tbdy.appendChild(tr);
    });// end for each
}

function mostEngaged( root, tab ) { 
    var tbdy= document.getElementById(root)
    if(tbdy == null)
        return;

    tab.forEach( function (item) {
        console.log(item);
        var tbdy= document.getElementById(root)
        var tr = tbdy.insertRow(-1)
        var td = tr.insertCell(0)

        // name 
        console.log(item.last_name);
        td.appendChild(document.createTextNode(item.last_name));
        
        // missed votes
        td = tr.insertCell(-1)
        td.appendChild(document.createTextNode(item.missed_votes ))
            
        // missed votes in %
        td = tr.insertCell(-1)
        td.appendChild(document.createTextNode( (100 * item.missed_votes / item.total_votes).toFixed(2)));

        tbdy.appendChild(tr);
    });// end for each
}

function mostLoyal( root, tab ) { 
    var tbdy= document.getElementById(root)
    if(tbdy == null)
        return;
    tab.forEach( function (item) {
        console.log(item);
        var tbdy= document.getElementById(root)
        var tr = tbdy.insertRow(-1)
        var td = tr.insertCell(0)

        // name 
        console.log(item.last_name);
        td.appendChild(document.createTextNode(item.last_name));
        
        // missed votes
        td = tr.insertCell(-1)
        td.appendChild(document.createTextNode(item.missed_votes ))
            
        // missed votes in %
        td = tr.insertCell(-1)
        td.appendChild(document.createTextNode( (100 * item.missed_votes / item.total_votes).toFixed(2)));

        tbdy.appendChild(tr);
    });// end for each
}

function leastLoyal( root, tab ) { 
    var tbdy= document.getElementById(root)
    if(tbdy == null)
        return;
    tab.forEach( function (item) {
        console.log(item);
        var tbdy= document.getElementById(root)
        var tr = tbdy.insertRow(-1)
        var td = tr.insertCell(0)

        // name 
        console.log(item.last_name);
        td.appendChild(document.createTextNode(item.last_name));
        
        // missed votes
        td = tr.insertCell(-1)
        td.appendChild(document.createTextNode(item.missed_votes ))
            
        // missed votes in %
        td = tr.insertCell(-1)
        td.appendChild(document.createTextNode( (100 * item.missed_votes / item.total_votes).toFixed(2)));

        tbdy.appendChild(tr);
    });// end for each
}
//
// see also https://projects.propublica.org/api-docs/congress-api/members/
// 
    function fetchData(house) {
        var url = connectionUrl( house );
        console.log('connectionUrl = ' + url );

        fetch(url, 
            { headers: { 
                "Content-Type": "application/json",
                /* "X-API-Key": "wqmgqOHo1JMAkYIfh3sJr4FlUN3PCokyojEziJBK" */},
                /* mode: "cors" */})
            .then( function(response) {
                document.body.style.cursor = "wait"  
                return response.json();
            }
            ).then( function(myJson) {
                //console.log(myJson);
                document.body.style.cursor = "auto"  
            
                ProcessAndRender( myJson.results[0].members )
            }).catch(err => console.log(err));
    }
}) // DOMContentLoaded handler
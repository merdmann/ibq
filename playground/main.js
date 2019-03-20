"use strict";

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Tree loaded');

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

    // execute the given filters.
    function applyFilters(item) {
        var result = true;

        for (var i = 0; i < filters.length; ++i) {
            result = result & filters[i](item);
        }

        console.log("appl_all_fiters: " + filters.length + ",result: " + result);
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


    function place_result(aString, aField) {
        var result = document.getElementById(aField);
        
        var text = document.createTextNode(aString);
        result.appendChild(text);
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
    var sampled = 0;
  
    const on_missed_votes = function(a,b) { return a.missed_votes - b.missed_votes};

    rows.sort( on_missed_votes ).forEach( function(data) {
        votes_with[data.party] += data.votes_with_party_pct; // not used

        var snapshot = [];

        if( ++sampled < 10)
            snapshot.push( data );



        console.log( data );

        nbrOfMembers[ data.party ] +=1; // R.2

        // calculate a valid name string
        var name = data.first_name + ' ' + (data.middle_name === null ? ' ' :data.middle_name) + ' ' + data.last_name;

        // Req. R.4
        if (data.missed_votes > max_missed_votes[data.party]) {
            max_missed_votes[data.party] = data.missed_votes;
            worst_voter_name[data.party] = name;
        }

        if( data.votes_with_party_pct > min_with_votes[ data.party ] ) {
            min_with_votes[ data.party ] = data.votes_with_pct;
            bad_voter[ data.party ] = name;
        }

        if( data.missed_votes > max_missed_votes[ data.party ]) {
            max_missed_votes[ data.party ] = data.missed_votes;
            max_missed_name[ data.party ] = name;
        }
    
        // attendance_by_name[name] = data.total_present;    
        
        if (applyFilters(data, filters)) {
            var row = tab.insertRow(-1)
            var td = row.insertCell(0)
            td.appendChild(document.createTextNode(members++))

            // storing the state before the filterss are applied only for alues we havnt seen before
            if (!listOfStates.includes(data.state))
                listOfStates.push(data.state)

            // ---------------------- col 1: first_name ---------------------------
            var td = row.insertCell(-1)

            td.appendChild(document.createTextNode(name))
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
        
        onglance( 'at_a_glance', snapshot );
    })
        
    createStatesSelector(listOfStates)
   
 //   console.log( nbrOfMembers );

    place_result(nbrOfMembers['D'], "result01" );
    place_result(nbrOfMembers['R'], "result02" );
    place_result(nbrOfMembers['I'], "result03" );

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
};

toTable(results.results[0].members, addFilter(Default, filters))


function redraw(filter, filters) {
    // clear the screen and redraw all
    document.getElementById('root').remove();

    // restatore the root tag
    var tab = document.getElementById('data-table')
    var tbody = document.createElement('tbody')
    tbody.id = 'root'
    tab.appendChild(tbody);
    tbody.setAttribute("class", "table table-striped");
    toTable(results.results[0].members, filters)
}

// --- democorates
var input = document.getElementsByTagName("input"); 

input[0].addEventListener('change', function () {
    if (input[0].checked) {
        filters = [];

        addFilter(DFilter, filters);
    }
    redraw(filters);
})
// --- republicans
input[1].addEventListener('change', function () {
    if (input[1].checked) {
        filters = [];

        addFilter(RFilter, filters);
    }
    redraw(filters);
})
// ----independant 
input[2].addEventListener('change', function () {
    if (input[2].checked) {
        filters = [];

        addFilter(IFilter, filters);
    }
    redraw(filters);
})

// something has changed in the state selection
var states = document.getElementById('states'); states.addEventListener('change', function () {
    var state = getState();
    var CAFilter = function (item) {
        return item.state == state;
    };

    console.log("on change state=" + state);
    redraw(addFilter(CAFilter, filters));
})


// this function will take a list of names sorted accoring to engagment of the person.
function onglance( root, tab ) { 
    console.log( "on glance called " + tab.length)
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

}) // DOMContentLoaded handler
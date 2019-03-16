document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Tree loaded');

  var  DFilter = function (item) { return item.party == 'D'};
  var  RFilter = function (item) { return item.party == 'R'};
  var  IFilete = function (item) { return item.party == 'R'};
  var  Default = function (item) { return true };

  // execute the given filters.
  function applyFilters (item, filters) {
    var result = true;
    
    console.log("Apply all filters");

    for (i=0; i < filters.length;++i) {
      result = result & filters[i](item);
    }
    return result
  }

  function addFilter (aFilter) {
    var filters = [];

    filters.push(aFilter);

    return filters;
  }

  function createStatesSelector (list) {
    var result = list.sort()

    var select = document.getElementById('states')

    for (var i = 0; i < result.length; ++i) {
      var option = document.createElement('option')

      option.value = result[i]
      option.text = result[i]
      console.log(result[i])
      select.appendChild(option)
    }

    select.appendChild(option)
  }

/*  function getState (list) {
    var option = document.getElementsByTagName('option');
  
    var states = [];

    var select = document.getElementById('states')
    return option[select.selectedIndex].value; 

  }
  */

  // Display the result object in one table
  // ------------------------------------------------------------------
  function toTable (rows, filters) {
    var listOfStates = []
    var tab = document.getElementById('root')
    tab.setAttribute('class', 'table table-striped')
    var members = 0;

    for (var i = 0; i < rows.length; ++i) {
      if (applyFilters(rows[i], filters)) {
        var row = tab.insertRow(-1)
        if(!listOfStates.includes(rows[i].state))
          listOfStates.push(rows[i].state)
          
        var td = row.insertCell(0)
        td.appendChild(document.createTextNode(members++))

        // ---------------------- col 1: first_name ---------------------------
        var td = row.insertCell(-1)

        // calculate a valid name string
        var name = rows[i].first_name + ' ' + (rows[i].middle_name === null ? ' ' : rows[i].middle_name) + ' ' + rows[i].last_name;

        td.appendChild(document.createTextNode(name))
        // ----------------------col 4: party ----------------------------------
        var td = row.insertCell(-1)
        td.appendChild(document.createTextNode(rows[i].party))

        // ----------------------col 5: votes in percent -----------------------
        var td = row.insertCell(-1)
        td.appendChild(
          document.createTextNode(rows[i].votes_with_party_pct + '%')
        )

        // ----------------------- link to homepage ----------------------------

        var td = row.insertCell(-1)
        var a = document.createElement('a')
        a.href = rows[i].url
        a.title = 'some link to ' + name + ' page'
        a.innerHTML = rows[i].url
        td.appendChild(a)

        tab.appendChild(row)
      }
    }
    createStatesSelector(listOfStates)
    //getState(listOfStates);
  }

  toTable(results.results[0].members, addFilter( Default ))


  var input = document.getElementsByTagName("input");
  input[0].addEventListener('change', function() {
    var filters = [];
    if (input[0].checked){
      filters = addFilter( DFilter)
    } 

  // clear the screen and redraw all
     document.getElementById('root').remove()


    var tab = document.getElementById('data-table')
    var tbody = document.createElement('tbody')
     tbody.id = 'root'
 

    toTable(results.results[0].members, filters )
  })
  input[1].addEventListener('change', function() {})
  input[2].addEventListener('change', function() {})
  // something has changed in the state selection
  var states = document.getElementById('states');
  states.addEventListener('change', function () {
    getState();
 
    console.log("on change");
  })

})

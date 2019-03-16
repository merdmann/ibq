document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Tree loaded');

  // execute the given filters.
  function applyFilters (item, filters) {
    var result = true;
    
    console.log("Apply all filters");
    console.log(filters);

//    for (var i = 0; ++i; i < filters.length) {
      result = result & filters[0](item);
//    }
    return result
  }

  function createFilter ( ) {
    var filters = [];

    console.log("createFilter");
    
    var inputs = document.getElementsByTagName('input')
    var party = inputs[0].checked ? function (item) { return item.party == 'D' } : function (item) { return true };
        party = inputs[1].checked ? function (item) { return item.party == 'R'} : party;
        party = inputs[2].checked ? function (item) { return item.party == 'I'} : party;

    filters.push(party);

    console.log(filters);
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

  function getState () {
    select = document.getElementById('states')
    var opt = document.getElementsByTagName('opion')

    console.log(opt)
  }

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
  }

  toTable(results.results[0].members, createFilter())
  console.log(filters)

  // SUBMIT BUTTON PRESSED
  var submit = document.getElementById('btn-submit')
  submit.addEventListener('click', function () {
    console.log('submit pressed')

    // clear the screen and redraw all
    document.getElementById('root').remove()

    // undo the remove
    var tab = document.getElementById('data-table')
    var tbody = document.createElement('tbody')
    tbody.id = 'root'
    tab.appendChild(tbody)

    console.log('redrawing')
    toTable(results.results[0].members, createFilter())
  })
})

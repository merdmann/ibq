document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Tree loaded');

  var DFilter = function (item) { return item.party == 'D' };
  var RFilter = function (item) { return item.party == 'R' };
  var IFilter= function (item) { return item.party == 'I'};
  var Default = function (item) { return true };
  
  var filters =[];

  // execute the given filters.
  function applyFilters(item) {
      var result = true;

      for (i = 0; i < filters.length; ++i) {
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
          console.log(result[i])
          select.appendChild(option)
      }

      select.appendChild(option)
  }

  // -------------- get the currently selected value ---------------
  function getState (list) {
      var option = document.getElementsByTagName('option');
      var select = document.getElementById('states');
      
      return option[select.selectedIndex].value; 
  }
  

  // Display the result object in one table
  // ------------------------------------------------------------------
  function toTable(rows, filters) {
      var listOfStates = []
      var tab = document.getElementById('root');
      var members = 0;
      filters = [];

      for (var i = 0; i < rows.length; ++i) {
          if (applyFilters(rows[i], filters)) {
              var row = tab.insertRow(-1)
              var td = row.insertCell(0)
              td.appendChild(document.createTextNode(members++))

              // storing the state before the filterss are applied.
              if (!listOfStates.includes(rows[i].state))
              listOfStates.push(rows[i].state)

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
              td.appendChild(document.createTextNode(rows[i].votes_with_party_pct + '%'))

              // -----------------------col 6: state ----------------------------------
              
              var td = row.insertCell(-1);
              td.appendChild( document.createTextNode(rows[i].state));
              
               if (!listOfStates.includes(rows[i].state))
                  listOfStates.push(rows[i].state)
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

  toTable(results.results[0].members, addFilter(Default,filters) )

  
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
      if( input[0].checked) {
          filters = [];
          
          addFilter( DFilter, filters );
      }
      redraw(filters);
  })
  // --- republicans
  input[1].addEventListener('change', function () {
      if( input[1].checked) {
          filters = [];
          
          addFilter( RFilter, filters );
      }
      redraw( filters );
  })
  // ----independant 
  input[2].addEventListener('change', function () {  
      if( input[2].checked) {
          filters = [];
          
          addFilter( IFilter, filters );
      }
      redraw( filters);
  })


  // something has changed in the state selection
  var states = document.getElementById('states');
  states.addEventListener('change', function () {
      var state = getState();
      var CAFilter = function (item) {  return item.state == state;  };
      
      console.log("on change state=" + state);
      redraw(addFilter(CAFilter, filters ));
  })

})
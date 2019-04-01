/*
 * Refactored version
 * After the currtenly opened page has been rendered depending on the page name
 * the dcission is taken which data is oto be request from the the server. The data
 *  will be proceessed after  the data  has been received.
 *
 */
'use strict'

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Tree loaded')

  var filters = []

  // Needs to be refctored since it hides intention bhind a boolean,
  function connectionUrl (house) {
    return house
      ? 'https://api.myjson.com/bins/16obo'
      : 'https://api.myjson.com/bins/1gqjt6;'
  }

  // this function handles the dynamic comtents for title of s htnl pyges
  function HandleContents (data) {
    var docTitle = document.title
    console.log('current page :' + docTitle)

    switch (docTitle) {
      case 'Senate Data':
        // Display the Senate data
        fetchData(false)
        break
      case 'House Data':
        // fetch house data
        fetchData(true)
        break
      case 'House Loyalty':
        fetchData(true)
        break
      case 'House attemdance':
      case 'Senate attendance':
      case 'Senate Loyalty':
        fetchData(false) // will trigger ProcessAndRender
        break
      case 'House loyalty':
        fetchData(false)
        break
    }
  }
  HandleContents()

  function ProcessAndRender (data) {
    let docTitle = document.title
    console.log(
      'ProceesAndRender current page :' +
        docTitle +
        ' procesing records: ' +
        data.length
    )
    let nbrOfMembers = { D: 0.0, R: 0.0, I: 0.0 }
    let votes_with = { D: 0.0, R: 0.0, I: 0.0 }

    switch (docTitle) {
      case 'House Data':
      case 'Senate Data':
        toTable(data) // renders the data into a table and applys the filter criteria
        break

      case 'Senate attendance':
        const by_missed_votes = function (a, b) {
          return b.missed_votes - a.missed_votes
        }

        data.forEach(function (item) {
          nbrOfMembers[item.party] = nbrOfMembers[item.party] + 1

          votes_with[item.party] = +item.votes_with_party_pct
        })

        votes_with['R'] = votes_with['R'] / nbrOfMembers['R']
        votes_with['D'] = votes_with['D'] / nbrOfMembers['D']
        votes_with['I'] = votes_with['I'] / nbrOfMembers['I']

        place_result(nbrOfMembers['D'], 'D_Reps')
        place_result(nbrOfMembers['R'], 'R_Reps')
        place_result(nbrOfMembers['I'], 'I_Reps')

        place_result(
          nbrOfMembers['I'] + nbrOfMembers['R'] + nbrOfMembers['D'],
          'Total_Reps'
        )

        place_result(votes_with['D'].toFixed(2), 'D_VW')
        place_result(votes_with['R'].toFixed(2), 'R_VW')
        place_result(votes_with['I'].toFixed(2), 'I_VW')

        let most = data.sort(by_missed_votes).slice(1, 5)
        let least = data
          .sort(by_missed_votes)
          .slice(data.length - 5, data.length)

        FillTable('most_engaged', most)
        FillTable('least_engaged', least)
        break

      case 'Senate Loyalty':
        const by_with_votes = function (a, b) {
          return b.votes_with_party_pct - a.votes_with_party_pct
        }

        data.forEach(function (item) {
          nbrOfMembers[item.party] = nbrOfMembers[item.party] + 1
        })

        // this ithe part i need for the glamce table
        votes_with['R'] = votes_with['R'] / nbrOfMembers['R']
        votes_with['D'] = votes_with['D'] / nbrOfMembers['D']
        votes_with['I'] = votes_with['I'] / nbrOfMembers['I']

        place_result(nbrOfMembers['D'], 'D_Reps')
        place_result(nbrOfMembers['R'], 'R_Reps')
        place_result(nbrOfMembers['I'], 'I_Reps')

        place_result(
          nbrOfMembers['I'] + nbrOfMembers['D'] + nbrOfMembers['R'],
          'Total_Reps'
        )
        let mostLoyal = data.sort(by_with_votes).slice(1, 5)
        let leastLoyal = data
          .sort(by_with_votes)
          .slice(data.length - 5, data.length)

        FillTable('most_loyal', mostLoyal)
        console.log(mostLoyal)
        console.log(leastLoyal)
        FillTable('least_loyal', leastLoyal)

        break
    }
  }

  // the filters for the all Hopuse or all senate data  filters
  const DFilter = function (item) {
    return item.party === 'D'
  }
  const RFilter = function (item) {
    return item.party === 'R'
  }
  const IFilter = function (item) {
    return item.party === 'I'
  }
  const Default = function (item) {
    return true
  }

  var State_To_Filter_For = null

  // execute the given filters by anding the result
  function applyAllFilters (data) {
    var result = true
    var input = document.getElementsByTagName('input')

    if (input[0].checked) {
      result = data.party == 'D'
    }

    if (input[1].checked) {
      result = data.party == 'R'
    }

    if (input[2].checked) {
      result = data.party == 'I'
    }

    if (State_To_Filter_For != null) {
      result = data.state.charAt(0)== State_To_Filter_For.charAt(0) && data.state.charAt(1) == State_To_Filter_For.charAt(1)  /* && result */
      console.log(
        'State_To_Filter>' +
          State_To_Filter_For +
          '<result:' +
          result +
          '>' +
          data.state +
          '<*'
      )
    } else console.log(result)

    return result
  }

  function addFilter (aFilter) {
    filters.push(aFilter)
  }

  // -------------- stuff needed for the state filter ------
  function createStatesSelector (list) {
    var result = list.sort()

    var select = document.getElementById('states')

    for (var i = 0; i < result.length; ++i) {
      var option = document.createElement('option')

      option.value = result[i]
      option.text = result[i]
      // console.log(result[i])
      select.appendChild(option)
    }
    // select.appendChild(option)
  }

  // -------------- get the currently selected value ---------------
  function getState (list) {
    var option = document.getElementsByTagName('option')
    var select = document.getElementById('states')

    return option[select.selectedIndex].value
  }

  // Put result
  function place_result (aString, aField) {
    console.log('place result')
    var result = document.getElementById(aField)

    if (result == null) console.log(aField)

    var text = document.createTextNode(aString)
    // result.innerHTML = " "
    result.appendChild(text)
  }

  function properName (data) {
    // calculate a valid name string
    return (
      data.short_title +
      ' ' +
      data.first_name +
      ' ' +
      (data.middle_name === null ? ' ' : data.middle_name) +
      ' ' +
      data.last_name
    )
  }
  // R.1 )the number of Democrats, Republicans and Independents
  // R.2 how Democrats and Republicans compare, on average, for voting with their party
  // R.3 which members most often do not vote with their party, which ones most often do vote with their party
  // R.4 which members have missed the most votes, which have missed the least
  // R.4 Display the result object in one table

  // ------------------------------------------------------------------
  function toTable (rows) {
    var listOfStates = []
    var tab = document.getElementById('root')
    var members = 0
    var democrates = 0
    var reps = 0
    var independents = 0
    // setup the initial data for the statics aspects
    // R.2
    var votes_with = { D: 0.0, R: 0.0, I: 0.0 }
    var worst_voter_name = { D: '', R: '', I: '' }
    var max_missed_votes = { D: 0.0, R: 0.0, I: 0.0 }
    var nbrOfMembers = { D: 0.0, R: 0.0, I: 0.0 }
    var missed_votes = { D: 0.0, R: 0.0, I: 0.0 }
    var min_with_votes = { D: 0.0, R: 0.0, I: 0.0 }
    var bad_voter = { D: '', R: '', I: '' } // who is voting in most of the cases against his party
    var max_missed_name = { D: '', R: '', I: '' }
    var total_votes = 0
    var sampled = 0

    const by_missed_votes = function (a, b) {
      return a.missed_votes - b.missed_votes
    }

    rows.sort(by_missed_votes).forEach(function (data) {
      votes_with[data.party] += data.votes_with_party_pct // not used

      nbrOfMembers[data.party] += 1 // R.2

      // calculate a valid name string
      var name =
        data.short_title +
        ' ' +
        data.first_name +
        ' ' +
        (data.middle_name === null ? ' ' : data.middle_name) +
        ' ' +
        data.last_name

      // Req. R.4
      if (data.missed_votes > max_missed_votes[data.party]) {
        max_missed_votes[data.party] = data.missed_votes
        worst_voter_name[data.party] = name
      }

      if (data.votes_with_party_pct > min_with_votes[data.party]) {
        min_with_votes[data.party] = data.votes_with_pct
        bad_voter[data.party] = name
      }

      total_votes += data.total_votes

      // who has the most missed votest
      if (data.missed_votes > max_missed_votes[data.party]) {
        max_missed_votes[data.party] = data.missed_votes
        max_missed_name[data.party] = name
      }

      if (applyAllFilters(data)) {
        console.log('Insert' + data.state)

        var row = tab.insertRow(-1)
        var td = row.insertCell(0)
        td.appendChild(document.createTextNode(members++))

        // storing the state before the filterss are applied only for alues we havnt seen before
        if (!listOfStates.includes(data.state)) listOfStates.push(data.state)

        // ---------------------- col 1: first_name ---------------------------
        var td = row.insertCell(-1)

        // td.appendChild(document.createTextNode(name));

        var a = document.createElement('a')
        a.href = data.url
        a.title = 'some link to ' + name + ' page'
        a.innerHTML = name
        td.appendChild(a)

        // ----------------------col 4: party ----------------------------------
        var td = row.insertCell(-1)
        td.appendChild(document.createTextNode(data.party))

        // ----------------------col 5: votes in percent -----------------------
        var td = row.insertCell(-1)
        td.appendChild(document.createTextNode(data.votes_with_party_pct + '%'))

        // -----------------------col 6: state ----------------------------------

        var td = row.insertCell(-1)
        td.appendChild(document.createTextNode(data.state))

        if (!listOfStates.includes(data.state)) listOfStates.push(data.state)
        // ----------------------- link to homepage ----------------------------
        var td = row.insertCell(-1)

        var a = document.createElement('a')
        a.href = data.url
        a.title = 'some link to ' + name + ' page'
        a.innerHTML = data.url
        td.appendChild(a)

        tab.appendChild(row)
      }
    })

    createStatesSelector(listOfStates)

    //   console.log( nbrOfMembers );
  }

  function redraw () {
    // clear the screen and redraw all
    document.getElementById('root').remove()

    // restatore the root tag
    var tab = document.getElementById('data-table')
    var tbody = document.createElement('tbody')
    tbody.id = 'root'
    tab.appendChild(tbody)
    tbody.setAttribute('class', 'table table-striped')
    //  toTable(results.results[0].members)
    //  location.reload(false);
    HandleContents()
  }

  // --- democorates
  var input = document.getElementsByTagName('input')

  input[0].addEventListener('change', function () {
    if (input[0].checked) {
      input[1].checked = false
      input[2].checked = false
      redraw()
    }
  })
  // --- republicans
  input[1].addEventListener('change', function () {
    if (input[1].checked) {
      input[0].checked = false
      input[2].checked = false
      redraw()
    }
  })
  // ----independant
  input[2].addEventListener('change', function () {
    if (input[2].checked) {
      input[0].checked = false
      input[1].checked = false
      redraw()
    }
  })

  // something has changed in the state selection
  const states = document.getElementById('states')
  states.addEventListener('change', function () {
    State_To_Filter_For = getState()

    redraw()

    console.log('on change state=' + State_To_Filter_For)
  })

  // this function will take a list of names sorted accoring to engagment of the person.
  function FillTable (root, tab) {
    var tbdy = document.getElementById(root)
    if (tbdy == null) return

    tab.forEach(function (item) {
      var tr = tbdy.insertRow(-1)
      var td = tr.insertCell(0)

      // name
      console.log(item.last_name)
      td.appendChild(document.createTextNode(properName(item)))

      // missed votes
      td = tr.insertCell(-1)
      td.appendChild(document.createTextNode(item.missed_votes))

      // missed votes in %
      td = tr.insertCell(-1)
      td.appendChild(document.createTextNode(item.votes_with_party_pct))

      tbdy.appendChild(tr)
    }) // end for each
  }

  //
  // see also https://projects.propublica.org/api-docs/congress-api/members/
  //
  function fetchData (house) {
    var url = connectionUrl(house)
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
        // console.log(myJson);
        document.body.style.cursor = 'auto'

        ProcessAndRender(myJson.results[0].members)
      })
      .catch(err => console.log(err))
  }
}) // DOMContentLoaded handler

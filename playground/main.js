document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM Tree loaded");

    // Display the result object in one table
    //------------------------------------------------------------------
    function toTable(rows, filter) {

        var tab = document.getElementById("root");
        tab.setAttribute("class", "table table-striped");

        for (var i = 0; i < rows.length; ++i) {
            if ( filter != null && filter(rows[i].party)) {
                var row = tab.insertRow(-1);

                //---------------------- col 1: first_name ---------------------------
                var td = row.insertCell(0);

                // calculate a valid name string 
                var name = rows[i].first_name + " " + ((rows[i].middle_name === null) ? " " : rows[i].middle_name) + " " + rows[i].last_name;

                td.appendChild(document.createTextNode(name));
                //----------------------col 4: party ----------------------------------
                var td = row.insertCell(-1);
                td.appendChild(document.createTextNode(rows[i].party));

                //----------------------col 5: votes in percent -----------------------
                var td = row.insertCell(-1);
                td.appendChild(document.createTextNode(rows[i].votes_with_party_pct + "%"));

                //----------------------- link to homepage ----------------------------

                var td = row.insertCell(-1);
                var a = document.createElement("a");
                a.href = rows[i].url;
                a.title = "some link to " + name + " page";
                a.innerHTML = rows[i].url;
                td.appendChild(a);

                tab.appendChild(row);
            }
        }
    }

    toTable(results.results[0].members, function(data) { return true });
    console.log("Test");

    // SUBMIT BUTTON PRESSED
    var submit = document.getElementById("btn-submit");
    submit.addEventListener('click', function () {
        console.log("submit pressed");
        var inputs = document.getElementsByTagName("input");
        var party = inputs[0].checked ? function (party) {
            return party == "D"
        } : null;
        party = inputs[1].checked ? function (party) {
            return party == "R"
        } : party;
        party = inputs[2].checked ? function (party) {
            return party == " "
        } : party;

        console.log("filter :" + party);

        // clear the screen and redraw all              
        document.getElementById("root").remove();


        // undo the remove
        var tab = document.getElementById("data-table");
        var tbody = document.createElement("tbody")
        tbody.id = "root";
        tab.appendChild(tbody);

        console.log("redrawing");
        toTable(results.results[0].members, party);
    });



});

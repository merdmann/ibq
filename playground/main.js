document.addEventListener('DOMContentLoaded',function() {
            console.log("DOM Tree loaded");

            // Display the result object in one table
            //------------------------------------------------------------------
		    function toTable( rows ) {
		
				var tab = document.getElementById("root");
				tab.setAttribute("class", "table table-striped");
				
			    for (var i=0; i<rows.length; ++i) {
					var tr = document.createElement("tr");
				    var row  = tab.insertRow(-1);
					  
					//---------------------- col 1: first_name ---------------------------
					var  td = row.insertCell(0);
					
					// calculate a valid name string 
					var name = rows[i].first_name + " " + ((rows[i].middle_name === null) ? " " : rows[i].middle_name) + " " + rows[i].last_name;
	
					td.appendChild(document.createTextNode(name));  								 
					//----------------------col 4: party ----------------------------------
					var  td = row.insertCell(-1);
					td.appendChild(document.createTextNode(rows[i].party));

					//----------------------col 5: votes in percent -----------------------
					var  td = row.insertCell(-1);
					td.appendChild(document.createTextNode(rows[i].votes_with_party_pct + "%"));
					
					//----------------------- link to homepage ----------------------------

					var  td = row.insertCell(-1);
					var a = document.createElement("a");
					a.href = rows[i].url;
					a.title="some link to " + name + " page";
					a.innerHTML = rows[i].url;
					td.appendChild(a);

				    tab.appendChild(tr);
                } /* end for */ 			function submit() {
				console.log("Submit....");
			}
            }; /* end toTable */			function submit() {
				console.log("Submit....");
			}

            toTable( results.results[0].members );
			console.log("Test");

			var submit = document.getElementById("btn-submit");
			submit.addEventListener('click', function (){ 
				var inputs = document.getElementsByTagName("input");
				console.log(inputs);
			});

});

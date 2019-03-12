document.addEventListener('DOMContentLoaded',function(){
            console.log("DOM Tree loaded");

            //------------------------------------------------------------------
		    function toTable( rows ) {
			    var root = document.getElementById("root");
			    var tab = document.createElement("table");
		
				var tr = document.createElement("tr");		// row 0 where the header goes

				var th = document.createElement("th");
				var text = document.createTextNode("Last Name");
				th.appendChild( text );
				tr.appendChild(th);

				var th = document.createElement("th");
				var text = document.createTextNode("First Name");
				th.appendChild( text );
				tr.appendChild(th);

				var th = document.createElement("th");
				var text = document.createTextNode("Party");
				th.appendChild( text );
				tr.appendChild(th);

				var th = document.createElement("th");
				var text = document.createTextNode("Seniority");
				th.appendChild( text );
				tr.appendChild(th);

				tab.appendChild(tr)
				
			    for(var i=0; i<rows.length; ++i) {
				    var tr = document.createElement("tr");

				    // building a single table row

				    // create  a cell for the first_namd
                    var td = document.createElement("td");
                    var text = document.createTextNode(rows[i].first_name);
				    td.appendChild( text );
				    tr.appendChild(td);

				    // create a cell for the last name
				    var td = document.createElement("td");
				    var text = document.createTextNode(rows[i].last_name);
				    td.appendChild( text );
				    tr.appendChild(td);

				    // create a cell with the party
				    td = document.createElement("td");
				    text = document.createTextNode(rows[i].party);
				    td.appendChild(text);
				    tr.appendChild(td);

				    // create a cell with the seniorty 
				    td = document.createElement("td");
				    text = document.createTextNode(rows[i].seniority);
				    td.appendChild( text );
				    tr.appendChild(td);
				
				    // create a cell for the missed votes.
				    td = document.createElement("td");
				    text = document.createTextNode(rows[i].missed_votes);
				    td.appendChild( text );
					tr.appendChild(td);
					
					// create a cell for the missed votes.
					td = document.createElement("td");
					var a = document.createElement("a");
					a.href = rows[i].url;
					a.title="some link to " +rows[i].last_name + " page";
					a.innerHTML = rows[i].url;
					//a.appendChild(text);
					td.appendChild(a);
					td.appendChild(text);
					tr.appendChild(td);

            	    // end of cells, append the row to the table.
				    tab.appendChild(tr);
                } /* end for */ 
                root.appendChild(tab);    
            }; /* end toTable */

            toTable( result.results[0].members );
            console.log("Test");
});

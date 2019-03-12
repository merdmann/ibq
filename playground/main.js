document.addEventListener('DOMContentLoaded',function(){
            console.log("DOM Tree loaded");

       
            //------------------------------------------------------------------

            function addBand(root, bands) {
                elem = document.getElementById (root);  

                for(var i=0; i<bands.length; ++i) {
                    var p = document.createElement("p");
                    var t = document.createTextNode(bands[i]);
                    p.appendChild(t);

                    elem.appendChild(p);
                }
            }
            addBand("root", ["U2", "Adele", "Vangelis" ]);

            //------------------------------------------------------------------
		    function toTable( rows ) {
			    var root = document.getElementById("root");
			    var tab = document.createElement("table");
		
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

            	    // end of cells, append the row to the table.
				    tab.appendChild(tr);
                } /* end for */ 
                root.appendChild(tab);    
            }; /* end toTable */

            toTable( result.results[0].members );
            console.log("Test");
});

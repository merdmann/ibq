document.addEventListener('DOMContentLoaded',function(){
			console.log("DOM Tree loaded");
			


            //------------------------------------------------------------------
		    function toTable( rows ) {
		
				var tab = document.getElementById("root");
				tab.setAttribute("class", "table table-striped");
				
			    for(var i=0; i<rows.length; ++i) {
					var tr = document.createElement("tr");
				    var row  = tab.insertRow(-1);
					  
					//---------------------- col 1: first_name ---------------------------
					var  td = row.insertCell(0);
					var  name = "";

					if(rows[i].middle_name === null) {
						name = rows[i].first_name + " " + rows[i].last_name;	
					} 
					else {
						name = rows[i].first_name + " " + rows[i].middle_name + " " + rows[i].last_name;
					}
				
					td.appendChild(document.createTextNode(name));  				
					 
					//----------------------col 4: party ----------------------------------
					var  td = row.insertCell(-1);
					td.appendChild(document.createTextNode(rows[i].party));

					var  td = row.insertCell(-1);
					td.appendChild(document.createTextNode(rows[i].votes_with_party_pct));
					
					//----------------------- link to homepage ----------------------------

					var  td = row.insertCell(-1);
					var a = document.createElement("a");
					a.href = rows[i].url;
					a.title="some link to " + name + " page";
					a.innerHTML = rows[i].url;
					td.appendChild(a);

				    tab.appendChild(tr);
                } /* end for */ 
                root.appendChild(tab);    
            }; /* end toTable */

            toTable( result.results[0].members );
            console.log("Test");
});

document.addEventListener('DOMContentLoaded',function(){
			console.log("DOM Tree loaded");
			


            //------------------------------------------------------------------
		    function toTable( rows ) {
		
				var tab = document.getElementById("root");
				tab.setAttribute("class", "table table-striped");
				
			    for(var i=0; i<rows.length; ++i) {
				    var tr = document.createElement("tr");
				    var row  = tab.insertRow(-1);
					  
					var  td = row.insertCell(0);
 					td.appendChild(document.createTextNode(rows[i].first_name));  				
					var  td = row.insertCell(-1);
					td.appendChild(document.createTextNode(rows[i].last_name));
					
					var  td = row.insertCell(-1);
					td.appendChild(document.createTextNode(rows[i].party));

					var  td = row.insertCell(-1);
					td.appendChild(document.createTextNode(rows[i].seniority));



					var  td = row.insertCell(-1);
					var a = document.createElement("a");
					a.href = rows[i].url;
					a.title="some link to " +rows[i].last_name + " page";
					a.innerHTML = rows[i].url;
					td.appendChild(a);

				    tab.appendChild(tr);
                } /* end for */ 
                root.appendChild(tab);    
            }; /* end toTable */

            toTable( result.results[0].members );
            console.log("Test");
});

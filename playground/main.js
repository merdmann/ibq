 
            // excersice 1; revert numbers
            function revert(x) {
                var tmp = x;
                var result="";

                // repeat until no digits are available    
                while( Math.floor(tmp) > 0 ) {
                    var a = Math.floor(tmp %10);

                    result = result + a;
                    tmp = tmp / 10;         // next digit
                }
              
                return result;
            }

            
            (function(){
                var test = (revert(12345)=="54321") &&
                           (revert(10000)=="00001") &&
                           (revert(32443)=="34423");
                console.log("Exercise 1: test success: " + test); 

            })();
            //-------------------------------------------------------------------------------

            function ssort( aString ) {
                result = aString.split().sort();
                result = result.join();
                return result;
            }

            (function(){
                console.log( ssort( "webmaster") );
            })();

            //--------------------------------------------------------------------------------
            function UpperCaseParagraph( aString ) {
                var text = aString.split(' ');

                for(var i=0; i < text.length; i++ ) {
                    text[0] = Character.ToUpperCase(text[0]); 
                }

                return text;

            }
            //---------------------------------------------------------------------------------
            
            // Sorting an Array - Exercise 1
            function sortByNames( names ) {
                names.sort();

                return names;
            }
            
            var input = ['Richelyn', 'Zach', 'Malia', 'Michael', 'Alex', 'Mike']

            sortByNames( input );

            (function () {
                var result= sortByNames(input);
                var test = result[0] === "Alex" &&
                           result[1] === "Malia";
                console.log(" Sorting an Array - Exercise 1; success = " + test );
            })();

            //--------------------------------------------------------------------------------------
      
            age = [ 25,28,22,45,38,35 ];

            function iterateArray( ages ) {
                var result = [];
                var length = ages.length;

                for ( var i=0; i<length; ++i) {
                    var age = ages[i];

                    if(!((age & 1 == 1))) { // even number
                        console.log( age );
                        result.push( age );
                    }
                }

                return result;
            }

            var test = iterateArray( age ) == [ 28, 22, 38];

            //-------------------------------------------------------------------------------------

            function findLowest( values ) {  
                var lowest = values[0];
                var result = 0;

                for(var i = 0; i < values.length; ++i){
                    if( values[i] < lowest )
                        result = values[i]; 
                }

                return result;
            }

            
            //---------------------------------------------------------------------------------------

            var test = findLowest( [20, 150, 33, 12, 234, 3812345] ) === 12;
            console.log("findLowest() .... success=" + test ); 
            
            //-----------------------------------------------------------------------------

            function findHighest( values ) {  
                var highest = values[0];
                var result = 0;

                for(var i = 0; i < values.length; ++i){
                    if( values[i] > highest) {
                        result = values[i];
                        highest = result; 
                    }
                }

                return result;
            }

            var test = findHighest( [20, 150, 33, 12, 234, 3812345] ) === 3812345
            console.log("finHigest .... success=" + test );

            // ----------------------------------------------------------------------------
            function at( aArray, position) {
                return aArray[position]
            }

            //     0    1   2   3    4   5
            at(  [20, 150, 33, 12, 234, 3812345], 3 ) == 12;

            var test = at(  [20, 150, 33, 12, 234, 3812345], 3 ) == 12;
            if( test )
                    console.log( "acceess a array, sucess = " + test);

            //-----------------------------------------------------------------------------
            // find duplicate numbers 
            function findDup( aArray ) {
                var result = [];

                // this function check the existnance of a number
                function exists( aValue, first ) {
                    for(var i=first; i<aArray.length; ++i)
                        if(aArray[i] == aValue)
                            return true;
                    return false;
                }   

                for( var i=0; i < aArray.length; i++) { 
                    if( exists( aArray[i], i+1 ) ) { 
                              console.log( "Duplictate " + aArray[i])
                              result.push( aArray[i]);
                    }
                }

                return result;
            }
            

            var result = findDup([7,1,2,3,4,6,7,7])

            test = result[ 0 ] === 7 && 
                   result[ 1 ] === 3 &&
                   result[ 2 ] === 7;
            if( test ) {
                console.log("FindDup scuccess =" + test );
            }

            //------------------------------------------------------------------

            function addBand(root, bands) {
                elem = document.getElementById (root);  

                for(var i=0; i<bands.length; ++i) {
                    var p = document.createElement("p")
                    var t = document.createTextNode(bands[i]);
                    p.appendChild(t);

                    elem.appendChild(p)
                }
            }

            document.addEventListener("DOMContentLoaded", function(event) {
                console.log("DOM fully loaded and parsed");
                
                addBand("TheBand", ["U2", "Adele" ])

              });


	document.addEventListener('DOMContentLoaded',function(){
		console.log("DOM Tree loaded");

		function toTable( rows ) {
			var root = document.getElementById("root");
			var tab = document.createElement("table");
		
			for(var i=0; i<rows.length; ++i) {
				var tr = document.createElement("tr");

				// building a single table row

				// create  a cell for the first_namd
				var td = document.createElement("td");
				td.appendChild( document.createTextNode(rows[i].first_name));
				tr.appendChild(td);

				// create a cell for the last name
				td = document.createElement("td");
				text = document.createTextNode(rows[i].last_name)
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

				// end of cells, append rhe row to the table.
				tab.appendChild(tr);
			}
			
			root.appendChild(tab);
		}

		toTable( result.results[0].members );
		
})
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM loaded");
    
console.log("%c ////////////JS EXERCISES/////////////", 'background: white; color: red');

console.log("%c Exercise 1 ", 'background: #222; color: #bada55');

//Write a for loop to show in the console all the elements in the given array

var givenArray = ["Phi", "Isabel", "Vanya", "Yuri", "Weko", "Nico"];

//Your code here

for(var i; i< givenArray.length; ++i)
    console.log(givenArray[i]);





//Write a for loop to show in the console only the elements that starts with "A"

    let fruits = ["Apple", "WaterMelon", "Peach", "Grape", "Ananas", "Lemon", "PineApple"];

//Yor code here
    console.log("%c Exercise 2 ", 'background: #222; color: #bada55');
    
    document.body.style.backgroundColor = "#222";
    document.body.style.color = "#bada55";
    
    var root = document.getElementById("root");
    
    for(var i=0; i<fruits.length; ++i ) {
        var f = fruits[i];
        if(f[0] === "A") {
            console.log(f)
            root.appendChild(document.createTextNode(f+" "))
        }
    }                





console.log("%c Exercise 3 ", 'background: #222; color: #bada55');
    
    document.body.style.backgroundColor = "#222";
    document.body.style.color = "#bada55";
     

//Write a function that shows an alert with the sum of the given numbers

//For example sumNumbers(3,4) have to shows 7
    function sumNumbers(a,b) {
        var result = a+b;
        alert( result );
    }
//Your code here
    sumNumbers(3,4);



console.log("%c Exercise 4 ", 'background: #222; color: #bada55');

    document.body.style.backgroundColor = "#222";
    document.body.style.color = "#bada55";

//Create a function that creates a <li> with every element inside this array and put the value inside the <li> to see it in the HTML

    let elements = ["Green", "Red", "Yellow", "Blue", "Purple"];

//Your code here

    var root = document.getElementById("root");
    
    for(var i=0; i<elements.length; ++i ) {
        var li = document.createElement("li");
        var text = document.createTextNode(elements[i])
        li.appendChild(text);
        
        root.appendChild(li);
        
        console.log( elements[i]);
    }



console.log("%c Exercise 5 ", 'background: #222; color: #bada55');


//Create a function that returns the multiplication of all the numbers of a given array.

//For example: multNumbers([2,3,4,5]) returns 120

let numbers = [5, 6, 20];

//Your code here
    
    function multAll( aArray ) {
        var result = aArray[0];
        
        for( var i=0; i<aArray.length; ++i )
            result = result * aArray[i];
        
        return result;
    }

    
    console.log( multAll( [2,3,4,5] ));


//------------------------------------------------------------------



console.log("%c Exercise 6 ", 'background: #222; color: #bada55');


//Discomment this code and define the function to make this works

console.log(average(10, 30)); //Output: 20
console.log(average(6, 10)); //Output: 8

//Your code here


function average(a,b) {
    return (a+b)/2
}

//--------------------------------------------------------------------


console.log("%c Exercise 7 ", 'background: #222; color: #bada55');
    
//Your code here

function duplicate(nbr) {
    var result = [];
    
    for(i=0; i<nbr.length; ++i ) {
        for(j=i+1; j<nbr.length; ++j)
            if(nbr[i]===nbr[j])
                result.push(nbr[i]);
    }
    
    return result;
}   

console.log( "Duplicates: " + duplicate( [2, 3, 4, 3, 2, 2, 1] ));


// --------------------------------------------------------------
console.log("%c Exercise 8 ", 'background: #222; color: #bada55');

//Why this console.log shows 'undefined'?

console.log(showMeTheResult(8, 9));

function showMeTheResult(a, b) {

  a * b;

}







console.log("%c Exercise 9 ", 'background: #222; color: #bada55');

//Create a table with JS and put inside a <tr> element for every element inside this array.
//Later put every text inside this rows.

let arrayOfRows = ["This is Row 1", "This is Row 2", "This is Row 3", "This is Row 4", "This is Row 5"];

//Your code here






console.log("%c Exercise 10 ", 'background: #222; color: #bada55');

//Create a function for the desired Output. Think about that.

//myFunctionMakesSomething([1,2,3,4,5]) //Desired Output: [120, 60, 40, 30, 24]
    
    
});
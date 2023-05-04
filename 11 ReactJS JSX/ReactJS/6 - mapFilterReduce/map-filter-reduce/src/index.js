// Note: results can be seen in the browser console
var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.
/*
function double(x) {
    return 2*x;
}
var doubledNumbers = numbers.map(double);
console.log(doubledNumbers);                            // View results in developer tools

    // Alternative: using forEach() (BUT: map is more concise.)                       
    var newNumbers = [];
    numbers.forEach(function(x) {
        newNumbers.push(x*2);
    });                            
    console.log(newNumbers);

    // Alternative: More concise version using map with an anonymous function
    const newerNumbers = numbers.map(function(x) {
        return x * 2;
    });
    console.log(newerNumbers);
*/
    // Alternative: Even more concise using arrow functions
    // const newestNumbers = numbers.map( (x) => { return x * 2; });
    // const newestNumbers = numbers.map( x => { return x * 2; });          // Alt
    const newestNumbers = numbers.map( x => x * 2 );                        // Alt
    console.log(newestNumbers);

//Filter - Create a new array by keeping the items that return true.
/*
const filteredArr = numbers.filter(function(num){           // Shown using anonymous function as an example
    return num > 4;     // condition to check if true
});
console.log(filteredArr);

    // Alternative: using forEach() (BUT: filter is more concise)
    var newNumbers = [];
    numbers.forEach(function(num) {
        if (num > 4) {
            newNumbers.push(num);
        }
    });
    console.log(newNumbers);
*/

//Reduce - Accumulate a value by doing something to each item in an array.
/*
var sumTot = numbers.reduce(function(accumulator, currentNum) {
    console.log("accumulator " + accumulator);
    console.log("currentNum " + currentNum);
    return accumulator + currentNum; 
});
console.log(sumTot);

    // Alternative: using forEach (but reduce is more concise)
    var sum = 0;
    numbers.forEach(function(currentNum){
        sum += currentNum;
    });
    console.log(sum);
*/

//Find - find the first item that matches from an array.
/*
const foundNum = numbers.find(function(num){
    return num > 10;                            // return the first number in the array that is greater than 10
});
console.log(foundNum);

//FindIndex - find the index of the first item that matches.
const foundIndex = numbers.findIndex(function(num){
    return num > 10;                            // return the first number in the array that is greater than 10
});
console.log(foundIndex);
*/

// Challenge: Create a new array with the 'meaning' from the emojipedia file but truncate the text to the first 100 characters
/*
import emojipedia from "./emojipedia";

var meanings = emojipedia.map(function(emojiObj){
    return emojiObj.meaning.substring(0, 100);
});
console.log(meanings);
*/


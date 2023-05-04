function randNum(start, end) {
    // Produce a random number between start and end
    s = parseInt(start);    // convert input string to integer
    e = parseInt(end);      // convert input string to integer
    var n = Math.random(); // random number between 0 and 1 (never reaches 1 though ...)
    var randNum = s + Math.round(n*(e - s));      // Random number between start and end
    return randNum; 
}

/*
var s = prompt("Enter a start of range for random number: ");
var e = prompt("Enter end of range for random number: ") 
console.log("The random number between " + s + " and " + e + " is: " + randNum(s, e));
*/

function bmiCalculator (weight, height) {
    var BMI = Math.round(weight / height**2); 
    if (BMI > 24.9) {
        interpretation = "\"Your BMI is " + BMI + ", so you are overweight.\"";
    } else if (BMI <= 24.9 && BMI >= 18.5) {
        "\"Your BMI is " + BMI + ", so you have a normal weight\"";
    } else {
        interpretation = "\"Your BMI is "+ BMI + ", so you are underweight.\"";
    }
    return interpretation;
}

// console.log("Resulting interpretations given BMI fo 60Kg, 2m is --> " + bmiCalculator(60, 2)); 

function isLeapYear(year) {
    if (((year % 4) === 0) && ((year % 100) != 0)) { 
        return true; 
    } else if (((year % 4) === 0) && ((year % 100) === 0) && ((year % 400) === 0)) {
        return true;
    } else {
        return false;
    }
}

// var year = 1948; 
// console.log("Is " + year + " a leap year: " + isLeapYear(year)); 

function checkGuest(name) {
    var guestList = ["Michael", "Scott", "So-Ra", "Ali"];
    if(guestList.includes(name)) {
        console.log("Welcome " + name);
    } else {
        console.log("Sorry, " + name + " you are not on the list");
    }
}

// var person = prompt("What is your name? ");
// checkGuest(person);

function fizzBuzz() {
    var arr = [];  // Equivalent to: var arr = new Array();  
    var output; 
    for (var i = 1; i <= 100; i++) {
        if (i % 3 === 0) {
            output = "Fizz";
        } else if (i % 5 === 0) {
            output = "Buzz"; 
        } else if ((i % 3 === 0) && (i % 5) === 0 ) {
            output = "FizzBuzz"; 
        } else {
            output = i; 
        }
        arr.push(output);
    }
    return arr; 
}

// var a = fizzBuzz(); 
// console.log(a);

function whosPaying(names) {
    var randomIndex = Math.floor(names.length * Math.random()); // Index starts at 0 so use floor
    return names[randomIndex]; 
}

// namesArr = ["Michael", "Ali", "Mark", "John", "Shelly", "Anne", "Jesse"];
// console.log("The lucky person paying the bill is: " + whosPaying(namesArr)); 

function fibonacci(n) {
    var arr = [];
    if (n === 0) {
        return arr;
    } else if (n === 1) {
        arr = [0];
        return arr;
    } else if (n === 2) {
        arr = [0, 1];
        return arr;
    } else if(n > 2) {
        arr = [0, 1];
        for(var i = 1; i <= n - 2; i++) {    // i is index of last item in the array. arr has 2 items already so number of items is n-2 
            arr.push(arr[i-1] + arr[i]);     // push to next index (i.e. i+1). 
        }
        return arr; 
    }
}

console.log(fibonacci(10));

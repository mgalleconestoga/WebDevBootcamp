function test() {
    var a = "3"; 
    var b = "8";

    console.log("Before swap\n");
    console.log("a is " + a);
    console.log("b is " + b);

    // Swap a and b
    var temp = a; 
    a = b; 
    b = temp; 

    console.log("After swap\n");
    console.log("a is " + a);
    console.log("b is " + b);
}

function stringLength() {
    var enteredString = prompt("Enter a string: ");
    alert("The length of your string is: " + enteredString.length + " and the first letter is: " + enteredString[0].toUpperCase().toLowerCase());
}

function changeHeading() {
    var el = document.getElementById('heading1');
    el.textContent = 'Goodbye';
}

function sliceString() {
    var a = "This is a nice string I will slice up";
    alert("The first word is: " + a.slice(0, 4));
    alert("The second word is: " + a.slice(5, 7));
}

function capitalizeName() {                     // Capitalize first letter of name and make sure rest of letters are lower case
    var name = prompt("What is your first name? ");
    var greetingText = "Welcome, " + name[0].toUpperCase() + name.slice(1, name.length).toLowerCase();
    alert(greetingText);
}

function dog2HumanAge() {
    var dogYears = prompt("How old is your dog?")
    var humanYears = 4*(dogYears - 2) + 21; 
    alert("Your dog is " + humanYears + " in human years");
}

function numBottles (cash, pricePerBottle = 1.5) {
    let numBottles = Math.floor(cash/pricePerBottle);
    console.log("You can buy " + numBottles + " bottles.");
    console.log("Your change will be " + (cash % pricePerBottle) + " dollars");
    return(numBottles); 
}

function lifeInWeeks(age, lifeExpectancy) {
    var ageInWeeks = age * 52; 
    var maxAgeInWeeks = lifeExpectancy * 52; 
    var weeksLeft = maxAgeInWeeks - ageInWeeks; 
    console.log("You only have " + weeksLeft + " weeks left to live"); 
}

function BMIcalc(weightInLbs, heightInInches) {
    const KgsPerLb = 0.453592;
    const InchesPerMeter = 39.3701; 
    var BMI = (weightInLbs* KgsPerLb ) / (heightInInches / InchesPerMeter)**2; 
    var normalWeight; 
    console.log("Your BMI is: " + Math.round(BMI)); 
    console.log("A normal BMI is 24.9"); 
    normalWeight = Math.round((24.9 * ((heightInInches / InchesPerMeter)**2)) / KgsPerLb);   // Could use Math.pow(a, b)
    console.log("Normal weight for you is: " + normalWeight); 
    console.log("So you should lose " + Math.round(weightInLbs - normalWeight) + " pounds to be healthy."); 
    return Math.round(BMI);  
}

// test();
// stringLength();
// setTimeout(function(){changeHeading()}, 2000);   // delay 2 seconds before calling changeHeading()
// sliceString();
// capitalizeName();
// dog2HumanAge();
// numBottles(11, 1.5);
// alert("You can buy " + numBottles(11) + " bottles.");
// lifeInWeeks(39.8, 90);
// BMIcalc(220, 67);

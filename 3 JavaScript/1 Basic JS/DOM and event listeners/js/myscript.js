document.querySelector("h1").innerText = "Goodbye";   // innerHTML
document.getElementById("title").innerHTML = "Hello again";
document.getElementsByClassName("heading")[0].innerHTML = "Goodbye again";
document.querySelectorAll(".heading")[0].innerHTML = "Well now, that was weird";
document.querySelectorAll("#title")[0].innerHTML = "Well now, that was weird AGAIN";
document.querySelector("#title").innerText = "Goodbye"; 
document.querySelector("#title").textContent = "Welcome"; 

/* querySelector and querySelectorAll are the most used */ 

var el = document.querySelector("li a");
el.setAttribute("style", "font-size: 3rem");    // one way to change properties <- This may be better since the string is the same
el.style.color = "green";                       // another way to change properties

el = document.querySelector("h1");
el.setAttribute("style", "background-color: grey; color: white;");  


/* ClassLists */
el = document.querySelector("#second-item"); 
el.classList.remove("red");                     // Add or remove a class using CSS styles 
el.classList.add("green"); 
el.classList.toggle("green"); 


/* Atributes */ 
el = document.querySelector("li a");
console.log(el.attributes);                     // All attributes (properties) 
console.log(el.getAttribute("href"));           // Funtion to return a specific named attribute
el.setAttribute("href", "http://www.yahoo.com");
console.log(el.getAttribute("href"));           // Funtion to return a specific named attribute
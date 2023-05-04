var header = document.querySelector("h1");
var third = document.querySelectorAll(".list")[2];
var first = document.querySelector("li a");
var btn = document.querySelector("button");

header.innerHTML = "<h1>Good bye</h1>"
third.innerHTML = "<li>This is great</li>"
first.textContent = "Wow this is awesome!";
//btn.style.backgroundColor = "yellow";           // Better to separate concerns and use CSS to change styles !!!! So change class via JS

btn.classList.add("blue");
btn.classList.remove("blue");
btn.classList.toggle("blue");

console.log(first.attributes);
console.log(first.getAttribute("href"));
first.setAttribute("href", "https://www.yahoo.com");

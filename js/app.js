let visitors = document.getElementById("visitors");
let counter;
let counterInt;


if(!localStorage.getItem("counter")){
    localStorage.setItem("counter",0);
}

window.addEventListener("load",() =>{
    counter = localStorage.getItem("counter");
    counterInt = parseInt(counter);
    counterInt++;
    localStorage.setItem("counter",counterInt);
    visitors.innerHTML = `¡Bienvenidos/as a Guifos.com! ——————Donde los gifs están.////// Número de visitas: ${localStorage.getItem("counter")}`
});


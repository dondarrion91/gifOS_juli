const API_KEY = 'b2g4JRv7IfUVGikP56CQaZrkvuwWNQnn';

async function getSearchResults(search) {
        try{
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}`)
            let data = await response.json();
            let arrayData = data.data;
            return arrayData; 
        }catch(e){
            return e;
        }  
}

async function getTagsSuggestion(key) {
    try{
        const response = await fetch(`https://api.giphy.com/v1/tags/related/${key}?api_key=${API_KEY}`)
        let data = await response.json();
        let arrayData = data.data;
        return arrayData; 
    }catch(e){
        return e;
    }  
}



async function getRandomResults() {
    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
                                                                                    
        let data = await response.json();
        
        let arrayData = data.data;
        
        return arrayData;
    }catch(e){
        return e;
    }  
}

async function getSuggestedSearch(search){
    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${search}`)
        let data = await response.json();        
        return data; 
    }catch(e){
        return e;
    }  
}


async function getSuggest(){
    let suggestArray = [];
    for(let i=0;i<=3;i++){
        try{
            const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=G`);
            let data = await response.json();
            suggestArray.push(data);
            
        }catch(e){
            console.log(e);
        }
    }
    return suggestArray;
    
}





function mostrarTendencias(){

    let contenedorGif = document.getElementById("tendecias_content");    
    getRandomResults()
        .then(data => data.map((element,index) => {                           
            let tags = element.title.split(' ');  
            if((index+1)%5 === 0){
                contenedorGif.innerHTML += `
                <div class="tendencias_content_gif" style="grid-column: span 2">
                    
                    <img class="tendencias_content_gif_image" src="${element.images.original.url}" alt="">
                    <div class="tendencias_content_gif_header">                    
                        <p>#${tags[0]} #${tags[1]} #${tags[2]} #${tags[3]}</p>
                        
                    </div>
                </div>
                `
            }else{
                contenedorGif.innerHTML += `
                <div class="tendencias_content_gif">
                    
                    <img class="tendencias_content_gif_image" src="${element.images.original.url}" alt="">
                    <div class="tendencias_content_gif_header">                    
                        <p>#${tags[0]} #${tags[1]} #${tags[2]} #${tags[3]}</p>
                        
                    </div>
                </div>
                `
            }                                         
            
    }));    
}

mostrarTendencias();

let sugerencia = document.getElementsByClassName("sugerenciaGif");
let sugerenciaTitle = document.getElementsByClassName("sugerencias_content_gif_header_text");
// for(let i=0;i<sugerencia.length;i++){
//     console.log(sugerencia[i])
// }

// console.log(sugerenciaTitle)

getSuggest()
        .then(data => {            
            for(let i=0;i<sugerencia.length;i++){                
                sugerencia[i].src = data[i].data.images.original.url;
                if(data[i].data.title.replace("GIF","").replace("by","") === ""){
                    sugerenciaTitle[i].innerHTML = "GIF";            
                }else{
                    sugerenciaTitle[i].innerHTML = data[i].data.title.replace("GIF","").replace("by","");            
                }
                
            }
            
            // sugerencia.src = data.data.images.original.url,
            // sugerenciaTitle.innerHTML = data.data.title,
            // console.log(sugerenciaTitle)
        })
        .catch(e => console.log(e))    
        

let formSearch = document.getElementById("formSearch");
let search = document.getElementById("search");

search.addEventListener("keyup",e =>{
    if (event.keyCode === 13) {
        
        e.preventDefault();
        mostrarData(search.value);
        
      }
})



formSearch.addEventListener("submit",e => {
    e.preventDefault();
    
})

function mostrarData(searchValue){    
    let sugerenciasContainer = document.getElementsByClassName("sugerencias")[0];
    let tendenciasImage = document.getElementsByClassName("tendencias_content_gif_image");
    let tendenciasTitle = document.getElementsByClassName("tendencias_content_gif_header");
    let tendenciasHeader = document.getElementsByClassName("tendencias_header_text")[0];
    contenedorGif = document.getElementById("tendecias_content");
    
    sugerenciasContainer.style.display = "none";
    tendenciasHeader.innerHTML = "Resultado de la busqueda";
    buscadorLista.style.display = "";        
    getSearchResults(searchValue)
        .then(data => {
            
            contenedorGif.style.display = "none";
            for(let i=0;i<tendenciasImage.length;i++){
                
                tendenciasImage[i].src = data[i].images.original.url;
                tendenciasTitle[i].innerHTML = data[i].title;
                
            }
        },setTimeout(() =>{
            contenedorGif.style.display = "grid";
        },3000))

        .catch(e => console.log(e))

}

let inputBusqueda = document.getElementById("search");
let buscadorLista = document.querySelector(".buscadorLista");


inputBusqueda.addEventListener('keydown',e => {            
    
    buscadorLista.innerHTML = ''; 
    botonesSuggestion.innerHTML = '';       

    if(inputBusqueda.value !== ""){

        // Botones de sugerencias
        getTagsSuggestion(inputBusqueda.value)
        .then(element => {       
            console.log("========")         
            for(let i=0;i<5;i++){                
                try{
                    if(element[i].name !== undefined){
                        console.log(element[i].name)
                        botonesSuggestion.innerHTML += `
                            <li class="botonSugerencia" onclick="mostrarData('${element[i].name}')">#${element[i].name}</li>
                        `
                    }                  
                }catch(e){
                    botonesSuggestion.innerHTML = "";
                }               
            }                         
        })
       

        buscadorLista.style.display = "block";    
        let listaBusquedasSugeridas = getSuggestedSearch(e.target.value);
        listaBusquedasSugeridas
        .then(elem => {
            elem.data.forEach(obj => {
                buscadorLista.innerHTML += `<li><p onclick="mostrarData('${obj.name}')">${obj.name}</p></li>`                
            });                        
        })
    }else{
        buscadorLista.style.display = ""; 
        botonesSuggestion.innerHTML = "";   
    }


});

if(!localStorage.getItem("misGifos")){
    localStorage.setItem("misGifos","[]");
}

// Mis guifos
let mis_guifos = document.getElementsByClassName("mis_guifos")[0];
let misGuifosBody = document.getElementsByClassName("misGuifosBody")[0];

async function getMisGifos() {
  let MisGifosIds = JSON.parse(localStorage.getItem("misGifos")); 
  let  arrayData= [];
  try{
    for(let i=0;i<MisGifosIds.length;i++){
      const response = await fetch(`https://api.giphy.com/v1/gifs/${MisGifosIds[i]}?api_key=${API_KEY}`)
      let data = await response.json();
      let Gifdata = data.data;      
      arrayData.push(Gifdata); 
    }      
    
    return arrayData;
  }catch(e){
      return e;
  }  
}


mis_guifos.addEventListener("click",() => {
    let sugerencias = document.getElementsByClassName("sugerencias")[0];
    let tendencias_header_text = document.getElementsByClassName("tendencias_header_text")[0];
    sugerencias.style.display = "none";         
    tendecias_content.innerHTML = "";
    tendencias_header_text.innerHTML = "Mis Guifos";
    getMisGifos()
    .then(element => {              
        if(element.length == 0){
            tendecias_content.innerHTML = `<h2 style="grid-column:2 /span 2;text-align:center">
                                                No tienes gifos!! <br>
                                                Crea uno!!
                                            </h2>`
        }else{
            element.forEach(elem => {                
                tendecias_content.innerHTML += `
                <div class="tendencias_content_gif">
                    
                    <img class="tendencias_content_gif_image" src="${elem.images.original.url}" alt="">
                    <div class="tendencias_content_gif_header">
                        <p>#${elem.title}</p>                        
                    </div>
                </div>
            `
            });
        }                 
    })
});


// Boton X
let times = document.getElementsByClassName("times");
timesArray = [...times];
timesArray.forEach(element => {
    element.addEventListener("click",e => {
        e.target.parentElement.parentElement.style.display = "none";
    });
});

// Boton Ver mas 
let verMas = document.getElementsByClassName("verMas");
let tendencias_header_text = document.getElementsByClassName("tendencias_header_text")[0];
verMasArray = [...verMas];
verMasArray.forEach(element => {            
    element.addEventListener("click",e => {                    
        tendecias_content.innerHTML = "";     
        tendencias_header_text.innerHTML = e.target.parentElement.firstElementChild.textContent.trim();        
        getSearchResults(e.target.parentElement.firstElementChild.textContent.trim())
            .then((elementoArreglo) => {
                
                elementoArreglo.forEach((elem,index) => {                    
                    if((index+1)%5 === 0){
                        tendecias_content.innerHTML += `
                        <div class="tendencias_content_gif" style="grid-column:span 2">                    
                            <img class="tendencias_content_gif_image" src="${elem.images.original.url}" alt="">
                            <div class="tendencias_content_gif_header">
                                <p>#${elem.title}</p>                    
                            </div>
                        </div>
                        `     
                    }else{
                        tendecias_content.innerHTML += `
                        <div class="tendencias_content_gif">                    
                            <img class="tendencias_content_gif_image" src="${elem.images.original.url}" alt="">
                            <div class="tendencias_content_gif_header">
                                <p>#${elem.title}</p>                    
                            </div>
                        </div>
                        `  
                    }                      
                });                            
            })
    });
});

let botonesSuggestion = document.querySelector(".botonesSuggestion");
let botonSugerencia = document.querySelectorAll("botonSugerencia");
let bodyElement = document.querySelector("body");

bodyElement.addEventListener("click",() => {
    buscadorLista.style.display = "none";
});

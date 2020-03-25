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



async function getRandomResults() {
    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
                                                                                    
        let data = await response.json();
        
        let arrayData = data.data;
        console.log(arrayData);
        return arrayData;
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
        .then(data => data.map(element => {
            contenedorGif.innerHTML += `
            <div class="tendencias_content_gif">
                
                <img class="tendencias_content_gif_image" src="${element.images.original.url}" alt="">
                <div class="tendencias_content_gif_header">
                    <p>#${element.title}</p>
                    
                </div>
            </div>
        `
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
                console.log(data[i]);
                sugerencia[i].src = data[i].data.images.original.url;
                sugerenciaTitle[i].innerHTML = data[i].data.title;
                
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
        mostrarData();
        
      }
    
})



formSearch.addEventListener("submit",e => {
    e.preventDefault();
    
})

function mostrarData(){

    let searchValue = document.getElementById("search").value;
    let sugerenciasContainer = document.getElementsByClassName("sugerencias")[0];
    let tendenciasImage = document.getElementsByClassName("tendencias_content_gif_image");
    let tendenciasTitle = document.getElementsByClassName("tendencias_content_gif_header");
    let tendenciasHeader = document.getElementsByClassName("tendencias_header_text")[0];
    contenedorGif = document.getElementById("tendecias_content");
    
    sugerenciasContainer.style.display = "none";
    tendenciasHeader.innerHTML = "Resultado de la busqueda"
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







const API_KEY = 'b2g4JRv7IfUVGikP56CQaZrkvuwWNQnn';

async function getSearchResults(search) {
        try{
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}`)
            let data = await response.json();
            return data; 
        }catch(e){
            return e;
        }  
}

async function getRandomResults() {
    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
        let data = await response.json();
        let arrayData = data.data;
        let arrayUrl = []; 
        arrayData.map(element => {
            arrayUrl.push(element);
        });
        return arrayUrl;
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

async function getSuggestion(){
    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=hola`);
        let data = await response.json();
        return data;
    }catch(e){
        console.log(e);
    }
}

function mostrarTendencias(){
    let contenedorGif = document.getElementById("tendecias_content");
    getRandomResults()
        .then(data => data.map(element => {
            contenedorGif.innerHTML += `
            <div class="tendencias_content_gif">
                
                <img src="${element.images.original.url}" alt="">
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
for(let i=0;i<sugerencia.length;i++){
    console.log(sugerencia[i])
}

console.log(sugerenciaTitle)

getSuggest()
        .then(data => {
            for(let i=0;i<sugerencia.length;i++){
                sugerencia[i].src = data[i].data.images.original.url;
                sugerenciaTitle[i].innerHTML = data[i].data.title;
                
            }
            
            // sugerencia.src = data.data.images.original.url,
            // sugerenciaTitle.innerHTML = data.data.title,
            // console.log(sugerenciaTitle)
        })
        .catch(e => console.log(e))    
        
        


function mostrarData(){
    let search = document.getElementById("search").value;
    
    getSearchResults(search)
        .then(data => console.log(data))
        .catch(e => console.log(e))

    getSuggestion()
        .then(data => console.log(data))
        .catch(e => console.log(e))
}







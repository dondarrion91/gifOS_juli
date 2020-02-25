const API_KEY = 'b2g4JRv7IfUVGikP56CQaZrkvuwWNQnn';

async function getSearchResults(search) {
        try{
            const response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}`)
            let data = await response.json();
            return data; 
        }catch(e){
            return e;
        }  
}

function mostrarData(){
    let search = document.getElementById("search").value;
    getSearchResults(search)
        .then(data => console.log(data)); 
}



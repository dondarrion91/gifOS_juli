let themeMenu = document.getElementsByClassName("drop-container-menu")[0];
let body = document.getElementsByTagName("body")[0];
let crearGifos = document.getElementsByClassName("crear")[0];
let titulo = document.getElementById("tituloImagen");
let temaGifos = document.getElementsByClassName("tema")[0];
let dropButton = document.getElementById("dropButton");



if(localStorage.getItem("dark") == "true"){
    
    body.style.backgroundColor = "#110038";
    crearGifos.style.backgroundColor = "#EE3EFE";
    titulo.src = "/img/gifOF_logo_dark.png";
    temaGifos.style.backgroundColor = "#EE3EFE";
    dropButton.style.backgroundColor = "#EE3EFE";
}else if(localStorage.getItem("dark") == "false"){
    body.style.backgroundColor = "#FFF4FD";
    crearGifos.style.backgroundColor = "#F7C9F3";
    temaGifos.style.backgroundColor = "#F7C9F3";
    dropButton.style.backgroundColor = "#F7C9F3";
    titulo.src = "/img/gifOF_logo.png";
}




function mostrarMenu(){
    
    if(themeMenu.style.display == ""){
        themeMenu.style.display = "flex";
    }else if(themeMenu.style.display == "flex"){
        themeMenu.style.display = "";
    }
    
}

function darkTheme(){
    
    if(localStorage.getItem("dark") == "false"){
        
        
        body.style.backgroundColor = "#110038";
        crearGifos.style.backgroundColor = "#EE3EFE";
        titulo.src = "/img/gifOF_logo_dark.png";
        temaGifos.style.backgroundColor = "#EE3EFE";
        dropButton.style.backgroundColor = "#EE3EFE";
        localStorage.setItem("dark",true);
    }
    
}

function ligthTheme(){
    if(localStorage.getItem("dark") == "true"){
        
        body.style.backgroundColor = "#FFF4FD";
        crearGifos.style.backgroundColor = "#F7C9F3";
        temaGifos.style.backgroundColor = "#F7C9F3";
        dropButton.style.backgroundColor = "#F7C9F3";
        titulo.src = "/img/gifOF_logo.png";
        localStorage.setItem("dark",false);
        
    }
    
}

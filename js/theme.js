let themeMenu = document.getElementsByClassName("drop-container-menu")[0];
let body = document.getElementsByTagName("body")[0];

let darkButton = document.getElementsByClassName("darkButton"); // Devuelve un objeto que contiene los elementos con la
                                                                // clase dark button
let misGifos = document.getElementsByClassName("mis_guifos")[0];                                                                
let verMasTheme = document.getElementsByClassName("verMas");
let header = document.getElementsByTagName("header");
let searchSubmit = document.getElementById("searchSubmit");
let headerTrending;
let headerSuggest;


// for(i=0;i<darkButton.length;i++){
//     console.log(darkButton[i]);
// }



let titulo = document.getElementById("tituloImagen");


if(!localStorage.getItem("dark")){
    localStorage.setItem("dark",false);
}

function onLoadTheme(){
  
    headerTrending = document.getElementsByClassName("tendencias_content_gif_header");
    headerSuggest = document.getElementsByClassName("sugerencias_content_gif_header");
    
    if (localStorage.getItem("dark") == "true") {
  
      for(let i=0;i<header.length;i++){
        
        header[i].classList.remove("headerDark");
        header[i].classList.add("headerLight");
      }
    
      for(let i=0;i<headerTrending.length;i++){
        
        headerTrending[i].classList.remove("headerDark");
        headerTrending[i].classList.add("headerLight");
    
      }
      
      for(let i=0;i<headerSuggest.length;i++){
        
        headerSuggest[i].classList.remove("headerDark");
        headerSuggest[i].classList.add("headerLight");
    
      }

      body.style.backgroundColor = "#FFF4FD";
      titulo.src = "./img/gifOF_logo.png";
    
      for (i = 0; i < darkButton.length; i++) {
        darkButton[i].style.backgroundColor = "#F7C9F3";
        darkButton[i].style.color = "#110038";
      }

      for (i = 0; i < verMasTheme.length; i++) {          
        verMasTheme[i].style.backgroundColor = "#4180F6";
        verMasTheme[i].style.color = "#FFFFFF";
      }

      searchSubmit.addEventListener("click",() => {
        searchSubmit.style.backgroundColor = "#F7C9F3";
      });
      
      misGifos.style.color = "#110038";
    
    
    }else if (localStorage.getItem("dark") == "false") {
    
      for(let i=0;i<header.length;i++){
        header[i].classList.remove("headerLight");
        header[i].classList.add("headerDark");
      }
    
      for(let i=0;i<headerTrending.length;i++){
        headerTrending[i].classList.remove("headerLight");
        headerTrending[i].classList.add("headerDark");
      }

      for(let i=0;i<headerSuggest.length;i++){
        headerSuggest[i].classList.remove("headerLight");
        headerSuggest[i].classList.add("headerDark");
      }
    
      body.style.backgroundColor = "#110038";
      titulo.src = "./img/gifOF_logo_dark.png";
    
      for (i = 0; i < darkButton.length; i++) {
        darkButton[i].style.backgroundColor = "#EE3EFE";
        darkButton[i].style.color = "#FFFFFF";
      }

      for (i = 0; i < verMasTheme.length; i++) {          
        verMasTheme[i].style.backgroundColor = "#EE3EFE";
        verMasTheme[i].style.color = "#FFFFFF";
      }

      searchSubmit.addEventListener("click",() => {
        searchSubmit.style.backgroundColor = "#EE3EFE";
      });
    
      misGifos.style.color = "#FFFFFF";
    }
  
  
}


  function mostrarMenu() {
    if (themeMenu.style.display == "") {
      themeMenu.style.display = "flex";
    } else if (themeMenu.style.display == "flex") {
      themeMenu.style.display = "";
    }
  }



  function darkTheme() {
    headerTrending = document.getElementsByClassName("tendencias_content_gif_header");
    headerSuggest = document.getElementsByClassName("sugerencias_content_gif_header");    
    if (localStorage.getItem("dark") == "true") {

        for(let i=0;i<header.length;i++){
          header[i].classList.remove("headerLight");
          header[i].classList.add("headerDark");
        }

        for(let i=0;i<headerTrending.length;i++){
          headerTrending[i].classList.remove("headerLight");
          headerTrending[i].classList.add("headerDark");
        }

        for(let i=0;i<headerSuggest.length;i++){
          headerSuggest[i].classList.remove("headerLight");
          headerSuggest[i].classList.add("headerDark");
        }
        
        body.style.backgroundColor = "#110038";

        titulo.src = "./img/gifOF_logo_dark.png";

        for (i = 0; i < darkButton.length; i++) {
          darkButton[i].style.backgroundColor = "#EE3EFE";
          darkButton[i].style.color = "#FFFFFF";
        }

        for (i = 0; i < verMasTheme.length; i++) {          
          verMasTheme[i].style.backgroundColor = "#EE3EFE";
          verMasTheme[i].style.color = "#FFFFFF";
        }
        
        searchSubmit.addEventListener("click",() => {
          searchSubmit.style.backgroundColor = "#EE3EFE";
        });

        misGifos.style.color = "#FFFFFF";

        localStorage.setItem("dark", false);


      }


  }



  function ligthTheme() {
    headerTrending = document.getElementsByClassName("tendencias_content_gif_header");
    headerSuggest = document.getElementsByClassName("sugerencias_content_gif_header");
    if (localStorage.getItem("dark") == "false") {

        for(let i=0;i<header.length;i++){
          header[i].classList.remove("headerDark");
          header[i].classList.add("headerLight");
        }
        
        for(let i=0;i<headerTrending.length;i++){
      
          headerTrending[i].classList.remove("headerDark");
          headerTrending[i].classList.add("headerLight");
      
        }


        for(let i=0;i<headerSuggest.length;i++){
      
          headerSuggest[i].classList.remove("headerDark");
          headerSuggest[i].classList.add("headerLight");
      
        }

        body.style.backgroundColor = "#FFF4FD";
  
        titulo.src = "./img/gifOF_logo.png";
  
        for (i = 0; i < darkButton.length; i++) {
          darkButton[i].style.backgroundColor = "#F7C9F3";
          darkButton[i].style.color = "#110038";
        }

        for (i = 0; i < verMasTheme.length; i++) {          
          verMasTheme[i].style.backgroundColor = "#4180F6";
          verMasTheme[i].style.color = "#FFFFFF";
        }

        misGifos.style.color = "#110038";

        searchSubmit.addEventListener("click",() => {
          searchSubmit.style.backgroundColor = "#F7C9F3";
        });
        
        localStorage.setItem("dark", true);


      }
    
  }


  onLoadTheme()

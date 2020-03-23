let themeMenu = document.getElementsByClassName("drop-container-menu")[0];
let body = document.getElementsByTagName("body")[0];

let darkButton = document.getElementsByClassName("darkButton"); // Devuelve un objeto que contiene los elementos con la
                                                                // clase dark button


// for(i=0;i<darkButton.length;i++){
//     console.log(darkButton[i]);
// }



let titulo = document.getElementById("tituloImagen");


if(!localStorage.getItem("dark")){
    localStorage.setItem("dark",false);
}


if (localStorage.getItem("dark") == "true") {

    
  body.style.backgroundColor = "#FFF4FD";

  titulo.src = "./img/gifOF_logo.png";

  for (i = 0; i < darkButton.length; i++) {
    darkButton[i].style.backgroundColor = "#F7C9F3";
    darkButton[i].style.color = "#110038";
  }


}else if (localStorage.getItem("dark") == "false") {
  body.style.backgroundColor = "#110038";

  titulo.src = "./img/gifOF_logo_dark.png";

  for (i = 0; i < darkButton.length; i++) {
    darkButton[i].style.backgroundColor = "#EE3EFE";
    darkButton[i].style.color = "#FFFFFF";
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
    if (localStorage.getItem("dark") == "true") {
      

        body.style.backgroundColor = "#110038";

        titulo.src = "./img/gifOF_logo_dark.png";

        for (i = 0; i < darkButton.length; i++) {
          darkButton[i].style.backgroundColor = "#EE3EFE";
          darkButton[i].style.color = "#FFFFFF";
        }

        localStorage.setItem("dark", false);


      }


  }



  function ligthTheme() {
    if (localStorage.getItem("dark") == "false") {
        
        body.style.backgroundColor = "#FFF4FD";
  
        titulo.src = "./img/gifOF_logo.png";
  
        for (i = 0; i < darkButton.length; i++) {
          darkButton[i].style.backgroundColor = "#F7C9F3";
          darkButton[i].style.color = "#110038";
        }
        
        localStorage.setItem("dark", true);


      }
    
  }


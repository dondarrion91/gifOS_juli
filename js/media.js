const API_KEY = 'b2g4JRv7IfUVGikP56CQaZrkvuwWNQnn';

// async function getMedia() {  
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({video:{height:{max:480},width:867},audio:false});
//         const video =  document.querySelector('video');
//         video.srcObject = stream;
//         video.play();
        
//         let recorder = await RecordRTC(stream, {
//           type: 'gif',
//           frameRate: 1,
//           quality: 10,
//           width: 360,
//           hidden: 240,
//           onGifRecordingStarted: function() {
//            console.log('started')
//          },
//         });
        
//         recorder.startRecording();

//         let form = new FormData();
//         console.log(form)

//         const stop = document.getElementById("capturar");
//         stop.addEventListener("click",async function getId(){
//           recorder.stopRecording();
//           console.log("stop")
//           video.srcObject = null;
//           form.append('file',recorder.getBlob(),'myGif.gif');
          
//           let file = form.get('file');
//           let url = URL.createObjectURL(file);
//           let trueUrl = url.slice(5,);
//           form.append("source_image_url",trueUrl);
//           const API_KEY = 'b2g4JRv7IfUVGikP56CQaZrkvuwWNQnn';
//           console.log(form);
          
//           try{
//             let response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`,{
//               method: "POST",
//               body: form
//             });
//             let data = await response.json();
//             console.log(data);
            
//             localStorage.setItem('myGif',JSON.stringify(data));


//           }catch(e){
//             console.log("ERRORRRRRRRRR");
//           }

          
//         })
        
        



//     } catch(err) {
//       return err;
//     }
// }

// -------------- Creacion de GIFS -------------------------//
let reproductor = document.getElementById("reproductor");
let cancelarButton = document.querySelector("#cancelarButton");
let video = document.querySelector("#video");
let camaraContainer = document.querySelector("#camaraContainer");
let precheck = document.querySelector("#precheck");
let botonGrabar = document.getElementById("botonGrabar");
let botonGrabarText = document.querySelector("#botonGrabarText");
let icon_container = document.querySelector(".icon_container");
let iconImg = document.getElementById("iconImg");
let containerRecord = document.getElementById("containerRecord");
let repetirButton = document.getElementById("repetirButton");
let subirButton = document.getElementById("subirButton");
let subida = document.getElementsByClassName("subida")[0];
let startRecordButtons = document.getElementById("startRecordButtons");
let bloque = document.getElementsByClassName("bloque");
let bloqueArray = [...bloque];
let barraProgresoProgress = document.getElementById("barraProgresoProgress");
let barraProgresoPlay = document.getElementById("barraProgresoPlay");
let barraProgreso = document.querySelector(".barraProgreso");
let gif = document.getElementById("gif");
let subidaNone = document.getElementsByClassName("subidaNone");
let subidaNoneArray = [...subidaNone];
let progreso = document.getElementsByClassName("progreso");
let cancelarBotonPost = document.getElementById("cancelarBotonPost");
let abortarPost = document.getElementById("abortarPost");
let video_container_header_media_theme = document.querySelectorAll('.video_container_header');
let uploadedGifHeaderMediaTheme = document.querySelectorAll(".uploadedGifHeader");

let gifUrl;
let blob;
barraProgreso.style.display = "none";


//=====TIMER VAR=======//
let horas = parseInt(document.getElementById("horas").innerHTML);
let minutos = parseInt(document.getElementById("minutos").innerHTML);
let segundos = parseInt(document.getElementById("segundos").innerHTML);
let milisegundos = parseInt(document.getElementById("milisegundos").innerHTML);


// boton cancelar
cancelarButton.addEventListener("click",() => {
  reproductor.style.display = "none";
});

/**
 * FUNCION INICIAR CAMARA
 */
function iniciarCamara(){
// Iniciar camara
navigator.mediaDevices.getUserMedia({audio:false,video:true})
  .then(play)
  .catch(err => {
    console.log(err)
  });
}

/**
 * FUNCION CAMBIAR ESTILOS DEL BOTON Capturar
 */
function changeButton(){
  botonGrabar.style.display = "none";
  botonGrabarListo.style.display = "block";
  botonGrabarListo.style.backgroundColor = "#FF6161";
  icon_container.style.backgroundColor = "#FF6161";  
  iconImg.src = "./img/recording.svg"  
  botonGrabarText.style.color = "#fff";
}

/**
 * FUNCION VOLVER AL BOTON ORIGINAL
 */
function originalButton(){
  botonGrabar.style.display = "block";
  botonGrabarListo.style.display = "none";
  botonGrabarListo.style.backgroundColor = "#F7C9F3";
  icon_container.style.backgroundColor = "#F7C9F3";  
  iconImg.src = "./img/camera.svg"  
  botonGrabarText.style.color = "#0000";
}

// Boton comenzar 
document.querySelector("#comenzarButton").addEventListener("click",e => {
  // DOM changes
  for(let i=0;i<video_container_header_media_theme.length;i++){
    if(!JSON.parse(localStorage.getItem("dark"))){
      // uploadedGifHeaderMediaTheme[i].style.backgroundImage= "linear-gradient(270deg, #EE3EFE 0%, #2E32FB 100%)";
      video_container_header_media_theme[i].style.backgroundImage= "linear-gradient(270deg, #EE3EFE 0%, #2E32FB 100%)";
    }else{
      video_container_header_media_theme[i].style.backgroundImage= "linear-gradient(270deg, #F7C9F3 0%, #4180F6 100%)";
      // uploadedGifHeaderMediaTheme[i].style.backgroundImage= "linear-gradient(270deg, #F7C9F3 0%, #4180F6 100%)";
    }    
  }
  precheck.style.display = "none";
  camaraContainer.style.display = "block";
  iniciarCamara();
});

/**
 * BOTON REPETIR CAPTURA
 */
document.querySelector("#repetirButton").addEventListener("click",e => {  
  containerRecord.style.display = "none";
  startRecordButtons.style.display = "flex";
  containerRecord.style.display = "none";
  barraProgreso.style.display = "none";
  originalButton();
});

/**
 * BOTON SUBIR CAPTURA
 */
let abort;
subirButton.addEventListener("click",() => {  
  abort = true;
  video.style.display = "none";
  subida.style.display = "flex";
  subidaNoneArray.forEach(element => {    
    element.style.display = "none";
  });
  cancelarBotonPost.style.display = "flex";   
  barraSubida(postGif);  
});

// Boton cancelar subida de GIF
abortarPost.addEventListener("click",() => {
  abort = false;  
  video.style.display = "block";
  cancelarBotonPost.style.display = "none";
  subida.style.display = "none";  
  subidaNoneArray.forEach(element => {
    element.style.display = "flex";
  });
  for(let i=0;i<bloque.length;i++){
    if(JSON.parse(localStorage.getItem("dark"))){
      bloque[i].classList.remove("activo");
    }else{
      bloque[i].classList.remove("activoDark");
    }  
  }
  barraProgreso.style.display = "none";
  containerRecord.style.display = "none";  
  setTimeout(() => {
    barraProgreso.style.display = "flex";
    containerRecord.style.display = "flex"; 
  },3000);
  startRecordButtons.style.display = "none";
});

/**
 * BOTON CAPTURAR
 */
botonGrabar.addEventListener("click",() => {
  
  //DOM CHANGES
  changeButton();
  
  // TIMER
  
  milisegundos=0;
  segundos=0;
  minutos=0;
  horas=0;
  let timer = setInterval(timerFunction, 1000);
  botonGrabarListo.addEventListener("click",() => {
    clearInterval(timer);    
    startRecordButtons.style.display = "none";
    containerRecord.style.display = "flex";
    barraProgreso.style.display = "flex";
  });
  
 

  // Iniciar camara  
  navigator.mediaDevices.getUserMedia({audio:false,video:true})
    .then(record)
    .catch(err => {
      console.log(err)
    });
  
});
/**
 * FIN BOTON CAPTURA
 */



// funciones

//Barra de Carga
function barraDeCarga(url){  
  
    containerRecord.style.display = "none";

    bloqueArray.forEach(element=>{      
      if(JSON.parse(localStorage.getItem("dark"))){
        element.classList.remove("activo");
      }else{
        element.classList.remove("activoDark");
      }  
    });
    

    // reproduccion del gif
    gif.style.display = "block";
    gif.src = `${url}`;
    video.style.display = "none";

    i=0;
    let progreso = setInterval(() => {
      if(bloque[i] != undefined){ 
        if(JSON.parse(localStorage.getItem("dark"))){
          bloque[i].classList.add("activo");
        }else{
          bloque[i].classList.add("activoDark");
        }                    
        i++;
      }else{        
        clearInterval(progreso);
        containerRecord.style.display = "flex";
        gif.style.display = "none";
        video.style.display = "block";        
      }
    }, 200);        
}    

function barraSubida(cb){
  for(let i=0;i<progreso.length;i++){
    if(JSON.parse(localStorage.getItem("dark"))){
      progreso[i].classList.remove("lleno");
    }else{
      progreso[i].classList.remove("llenoDark");
    }  
    
  } 

  i=0;
  let ProgresoBarra = setInterval(() => {
    if(progreso[i] != undefined){        
      if(JSON.parse(localStorage.getItem("dark"))){
        progreso[i].classList.add("lleno");
      }else{
        progreso[i].classList.add("llenoDark");
      }  
      i++;
    }else{        
      clearInterval(ProgresoBarra);  
      if(abort){
        cancelarBotonPost.style.display = "none";
        for(let i=0;i<uploadedGifHeaderMediaTheme.length;i++){
          if(!JSON.parse(localStorage.getItem("dark"))){
            uploadedGifHeaderMediaTheme[i].style.backgroundImage= "linear-gradient(270deg, #EE3EFE 0%, #2E32FB 100%)";          
          }else{          
            uploadedGifHeaderMediaTheme[i].style.backgroundImage= "linear-gradient(270deg, #F7C9F3 0%, #4180F6 100%)";
          }   
        }        
        cb();   

      }else{
        console.log("Post abort")
      }          
    }
  }, 200);    
}

/**
 * Funcion Gif subido con exito
 */
let uploadedGifElement = document.getElementById("uploadedGifElement");
let uploadedVideo = document.getElementById("uploadedVideo");
function uploadedGif(){
  uploadedVideo.style.display = "grid";
  camaraContainer.style.display = "none";
  uploadedGifElement.src = gifUrl;
  descargarEnlace.href = gifUrl;
}

/**
 * Copiar enlace
 */
let copiarEnlace = document.getElementById("copiarEnlace");
copiarEnlace.addEventListener("click",() => {
  navigator.clipboard.writeText(gifUrl)
    .then(() =>{
      console.log("copiado al portapapeles")
    })
});

/**
 * Boton de Listo
 */
let listoButton = document.getElementById("listoButton");
listoButton.addEventListener("click",() => {
  location.reload();
});


//Funcion tiempo del timer
function timerFunction(){   
  milisegundos++;
  document.getElementById("milisegundos").innerHTML = parseInt(milisegundos);
  if(milisegundos == 1000){
    segundos++;
    document.getElementById("segundos").innerHTML = parseInt(segundos);
    milisegundos=0;
    if(segundos == 60){
      minutos++;
      document.getElementById("minutos").innerHTML = parseInt(minutos);
      segundos=0;
      if(minutos == 60){
        horas++;
        document.getElementById("horas").innerHTML = parseInt(horas);
        minutos=0;
      }
    }
  }
  
}

function play(stream){
  video.srcObject = stream;
}

let chunks = [];

function record(stream){
  video.srcObject = stream;

  let mediaRecorder = new RecordRTC(stream,{
    type: 'gif',
    frameRate: 1,
    quality: 10,
    ondataavailable: function(blob) {
      chunks.push(e.data);
    },
  });
  
  

  mediaRecorder.startRecording(); 
  
  botonGrabarListo.addEventListener("click",() => {
        
    mediaRecorder.stopRecording(() => {                       
      
      blob = new mediaRecorder.getBlob(chunks);
      
      gifUrl = URL.createObjectURL(blob);            
      // download(blob);
  
    })  
  });
  
}

//Inicio de barra de carga
barraProgresoPlay.addEventListener("click",() => {
  barraDeCarga(gifUrl);      
});

/**
 * GUARDAR EN LOCAL STORAGE MIS GIFS
 * 
 */
if(!localStorage.getItem("misGifos")){  
  localStorage.setItem("misGifos","[]");
}



/**
 * SUBIR GIF
 */
async function postGif(){  
  let form = new FormData();    
  form.append('file',blob,'myGif.gif');
  let file = form.get('file');
  let formUrl = URL.createObjectURL(file);
  form.append("source_image_url",formUrl);
  try{
    let response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`,{
      method: "POST",
      body:form,      
    });
    let data = await response.json();
    let arrayID = JSON.parse(localStorage.getItem("misGifos"));
    arrayID.push(data.data.id);
    localStorage.setItem("misGifos",JSON.stringify(arrayID));    
    uploadedGif();
  }catch(e){
    console.error("ERRORRRRRRRRR");
  }  
}


// function download(blob){
//   let link = document.createElement("a");
//   link.href = window.URL.createObjectURL(blob);
//   link.setAttribute("download","video_recorder.gif");
//   link.style.display = "none";

//   document.body.appendChild(link);

//   link.click();

//   link.remove();
// }



// -------------- Renderizados de MISGIFS ------------------//

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


getMisGifos()
        .then(data => data.map(element => {
          misGuifosBody.innerHTML += `
            <div class="misGuifosBodyElement">                
                <img class="misGuifosBodyElementImage" src="${element.images.original.url}" alt="">                
            </div>
        `
    }));    



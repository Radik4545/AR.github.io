let buttonEnter = document.getElementById("buttonEnter");
let uiDivIn = document.getElementById("uiDivIn");

AFRAME.registerComponent("cursor-listener", {
    
  init: function () {
      
    let colorBlue = "blue";
    let model = document.querySelector("#modelID");   
    let imageButtonPlay = document.getElementById("imageButtonPlay");
    
    this.el.addEventListener('mouseenter', function() {
      
      this.setAttribute('scale', "1.6 1.6 1.6");
      
    });
    
    this.el.addEventListener('mouseleave', function() {
      
      this.setAttribute('scale', "1.5 1.5 1.5");

    });
        
    this.el.addEventListener('click', function() {
           
      this.setAttribute('material', 'color', colorBlue); 
      document.getElementById('audio').play();
      this.emit("start2");
      this.emit("start3");
      model.emit("start1");
      model.setAttribute("class", "data-raycastable");
      this.removeAttribute("class");
        
    });
        
    model.addEventListener("click", function () {
            
      this.emit("pause1");
      this.setAttribute("rotation", "0 -90 0");
      let colorWhite = "white";
      imageButtonPlay.setAttribute("class", "data-raycastable");
      imageButtonPlay.setAttribute('scale', "1.5 1.5 1.5");
      imageButtonPlay.setAttribute('material', 'color', colorWhite);   
      this.removeAttribute("class");
        
    });
  }
})
let uiDiv = document.getElementById("uiDiv");
uiDiv.style["pointer-events"] = "auto";
buttonEnter.style.cursor = "pointer";

let fadeIn = function() {
    
  uiDiv.style["pointer-events"] = "none";
  buttonEnter.parentNode.remove(buttonEnter);
  uiDivIn.parentNode.remove(uiDivIn);
  uiDiv.style["backdrop-filter"] = "none";
  uiDiv.style["transition"] = "background-color 1000ms linear";
  let aScene = document.querySelector("#aScene");
  aScene.setAttribute("visible", "true");
  
}

buttonEnter.addEventListener('touchstart', fadeIn);
buttonEnter.addEventListener('mousedown',  fadeIn);  

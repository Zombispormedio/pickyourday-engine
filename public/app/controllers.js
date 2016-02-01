controller._3dController=function($engine){
    var canvas=document.getElementById("3dView");
  $engine.configure(canvas);
  $engine.render();
};
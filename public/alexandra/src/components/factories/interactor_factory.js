angular.module('alexandra')
    .factory('$alexandraInteractor', function(){

    var element, camera, 
        dragging=false,
        x=0, y=0, lastX=0, lastY=0, 
        button=0, ctrl=false, key=0,
        dstep=0,
        MOTION_FACTOR=10.0;
    


    var OnMouseUp=function(ev){
        dragging=false;
    }

    var OnMouseDown=function(ev){
        dragging=true;
        x=ev.clientX;
        y=ev.clientY;
        button=ev.button;

        var c_position=camera.getPosition();

        dstep=Math.max(c_position[0], c_position[1], c_position[2])/100;
    }


    var OnMouseMove=function(ev){
        lastX=x;
        lastY=y;
        x=ev.clientX;
        y=ev.clientY;
        if(!dragging)return;
        ctrl=ev.ctrlKey;
        alt=ev.altKey;
        
        var dx=x-lastX;
        var dy=y-lastY;
        
        if(button===0){
            
           rotate(dx, dy);  
            
        }
        
        
    }
    
    function rotate(dx, dy){
        
       
        var delta_elevation=-20.0/element[0].height;
        var delta_azimuth=-20.0/element[0].width;
        
        var nAzimuth=dx*delta_azimuth*MOTION_FACTOR;
        var nElevation=dy*delta_elevation*MOTION_FACTOR;
        
        camera.changeAzimuth(nAzimuth);
        camera.changeElevation(nElevation);
        
    }







    return function(e, c){
        element=e;
        camera=c;
        element.bind("mousedown", OnMouseDown);
        element.bind("mouseup", OnMouseUp);
        element.bind("mousemove", OnMouseMove);
    }

});
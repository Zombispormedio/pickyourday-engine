angular.module('alexandra')
    .factory('$alexandraInteractor', function($window,   $rootScope){

    return function(e, c, t){

        var element=e, camera=c, tree=t, 
            dragging=false,
            x=0, y=0, lastX=0, lastY=0, 
            button=0, ctrl=false, key=0,
            dstep=0, dloc=0,
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

            select(ev);

        }

        var select=function(ev){
            var s_x, s_y, top=0, left=0, obj=tree.getCanvas();

            while(obj && obj.tagName!=="BODY"){
                top+obj.offsetTop;
                left+=obj.offsetLeft;
                obj=obj.offsetParent;
            }

            left+=window.pageXOffset;
            top-=window.pageYOffset;

            s_x=ev.clientX-left;
            s_y=tree.getCanvas().height-(ev.clientY-top);

            console.log(s_x, s_y)
            console.log(tree.select({x:174, y:99}));
            console.log(tree.select({x:s_x, y:s_y}));



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
                if(ctrl){
                    dolly(dx, dy);
                }else{
                    rotate(dx, dy); 
                }
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


        function dolly(dy){
            if(dy>0){
                dloc+=dstep;
            }else{
                dloc-=dstep;
            }
            camera.zoom(dloc);
        }


        var OnKeyDown=function(ev){
            key=ev.keyCode;
            ctrl=ev.ctrlKey;

            if(!ctrl){
                if(key===38){
                    camera.setPositionY(10);
                }
                else if(key===40){
                    camera.setPositionY(-10);
                }
                else if(key===37){
                    camera.setPositionX(-10);
                }
                else if(key===39){
                    camera.setPositionX(10);
                }
            }

        }

        var OnKeyUp=function(ev){
            if(ev.keyCode==17){
                ctrl=false;
            }
        }

        var OnWheel=function(ev){
            dolly(ev.wheelDeltaY);
        }




        element.bind("mousedown", OnMouseDown);
        element.bind("mouseup", OnMouseUp);
        element.bind("mousemove", OnMouseMove);
        element.bind("wheel", OnWheel);


        var $=angular.element($window);
        $.bind("keydown", OnKeyDown);
        $.bind("keyup", OnKeyUp);


    }

});
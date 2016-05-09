angular.module('alexandra')
    .value('LightValue',{

    default:{
        direction: [0.0, -1.0, -1.0],
        ambient: [0.03, 0.03, 0.03, 1.0],
        diffuse: [1.0, 1.0, 1.0, 1.0],
        specular: [1.0, 1.0, 1.0, 1.0],
        position:[0.0,1.0, 1.0]    
    }

});
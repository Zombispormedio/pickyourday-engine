angular.module('alexandra')
    .value('LightValue',{

    default:{
        direction: [0.0, -1.0, -1.0],
        ambient: [0.03, 0.03, 0.03, 1.0],
        diffuse: [1.0, 1.0, 1.0, 1.0],
        specular: [1.0, 1.0, 1.0, 1.0],
        position:[0.0,1.0, 1.0]    
    },
    red:{
        direction: [0.0, -2.0, -.1],
        ambient: [0.03, 0.03, 0.03, 1.0],
        diffuse: [1.0, 0.0, 0.0, 1.0],
        specular: [1.0, 1.0, 1.0, 1.0],
        position:[0,7, 3]    
    },
     green:{
        direction: [-0.5, 1.0, -.1],
        ambient: [0.03, 0.03, 0.03, 1.0],
        diffuse: [0, 1.0, .0, 1.0],
        specular: [1.0, 1.0, 1.0, 1.0],
        position:[4,3, 3]    
    },
    blue:{
        direction: [-.5, 1.0, -.1],
        ambient: [0.03, 0.03, 0.03, 1.0],
        diffuse: [0, 0, 1.0, 1.0],
        specular: [1.0, 1.0, 1.0, 1.0],
        position:[-4,3, 3]    
    }

});
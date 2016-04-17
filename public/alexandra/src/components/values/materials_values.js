angular.module('alexandra')
    .value('MaterialValue',{

    default:{
        ambient:[1,1,1,1],
        diffuse:[0.5,0.8,0.1,1],
        shininess:230,
        specular:[1,1,1,1]
    },
    variable:{
        ambient:[1,1,1,1],
        shininess:230,
        specular:[1,1,1,1]
    }


});

angular.module('alexandra')
    .factory('$alexandraStore', function (SphereValue, CylinderValue, WallValue, ConeValue, CubeValue, MaterialValue, CameraValue, LightValue, TextureValue) {
    
    
    
    return {
        models:{
            sphere:SphereValue,
            cylinder:CylinderValue,
            wall:WallValue,
            cone:ConeValue,
            cube: CubeValue
        },
        materials:MaterialValue,
        cameras:CameraValue,
        lights:LightValue,
        textures:TextureValue
        
    }
    
    
    
});
var app = angular.module('alexandraExample', ["alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($scope, $interval, $timeout) {



    var JustPosition = generate(function() {
        return { position: RandPosition() };
    }, 80);

    function Data() {
        $scope.data = JustPosition();
    }

    Data();

    var particle_type=["fire",
                       "flower",
                       "fog",
                       "light",
                       "spark",
                       "spatial",
                       "star", 
                       "warning",
                       "acid",
                       "fireball",
                       "firebust",
                       "flash",
                       "starbust",
                       "fire2",
                       "aura",
                       "bolt",
                       "energy",
                       "energy2",
                       "energy3",
                       "misc",
                       "misc2",
                       "pink",
                       "plasma",
                       "plasma2",
                       "purple",
                       "ray",
                       "smoke",
                       "water",
                       "water2",
                      "drops", "star"]
    $scope.config={
        type:"particle",
        fullpage:true,
        particle:{
            type:"drop",
            size:14
        }


    };

    /*var type_pos=0;

    $interval(function(){
        $scope.config.particle.type=particle_type[type_pos];
        type_pos++;
        if(type_pos>particle_type.length){
            type_pos=0;
        }

    }, 500)*/
});
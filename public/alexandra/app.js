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
                       "starbust"]
    $scope.config={
        type:"particle",
        fullpage:true,
        particle:{
            type:"star",
            size:10
        }


    };

    var type_pos=0;

    $interval(function(){
        $scope.config.particle.type=particle_type[type_pos];
        type_pos++;
        if(type_pos>particle_type.length){
            type_pos=0;
        }
        console.log(type_pos)
    }, 1000)
});
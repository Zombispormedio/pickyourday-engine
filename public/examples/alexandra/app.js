var app = angular.module('alexandraExample', ["alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($scope, $interval, $timeout) {


        var JustPosition = generate(function() {
            return { position: RandPosition() };
        });


        function Data_1() {
            $scope.data_1 = JustPosition();
        }

        Data_1();

        $interval(Data_1, 1000);

        $scope.config_1 = {
            streaming: true
        };
    

        $scope.config_3 = {
			type:"cube",
            colortype: "variable"
        };

        var ColorSizePosition = generate(function() {
            return {
                position: RandPosition(),
                color: RandColor(),
               size: RandSize({ min: 4, max: 8, fixed: 1 }),
            rotation:RandRotation()
            };
        });
        function Data_2() {
            $scope.data_2 = ColorSizePosition();
        }
        Data_2();
		
		
		
	 $scope.config_4 = {

            colortype: "variable"
        };
	
	
		

    });
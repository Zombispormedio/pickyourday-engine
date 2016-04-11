var app = angular.module('alexandraExample', ["alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($scope, $interval, $timeout) {

        function RandPosition(v) {
            var range = v || { min: 0, max: 100 };
            var x = chance.floating(range);
            var y = chance.floating(range);
            var z = chance.floating(range);
            return [x, y, z];
        }

        function RandColor(v) {
            var rangeColor = v || { min: 0, max: 1, fixed: 2 };
            var r = chance.floating(rangeColor);
            var g = chance.floating(rangeColor);
            var b = chance.floating(rangeColor);
            return [r, g, b, 1];
        }

        function RandSize(v) {
            var range = v || range;
            var size = chance.floating({ min: 0, max: 2, fixed: 1 });
            return [size, size, size];
        }

        function generate(fn) {
            return function() {
                var count = chance.integer({ min: 0, max: 100 });
                return Array.apply(0, Array(count)).map(fn);
            };
        }


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
            colortype: "variable"
        };

        var ColorSizePosition = generate(function() {
            return {
                position: RandPosition(),
                color: RandColor(),
                size: RandSize()
            };
        });
        function Data_2() {
            $scope.data_2 = ColorSizePosition();
        }
        Data_2();

    });
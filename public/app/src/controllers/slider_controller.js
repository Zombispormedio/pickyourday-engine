angular.module('Application')
    .controller('SliderCtrl', function ($scope, CompanyService, $alexandraUtils) {

        var profile;


        $scope.loading = true;



        $scope.config = {
            type: "custom",
            engine:"phong_positional",
            colortype:"variable",
            axis: true,
            axisLength: 500,
            streaming: true,
            background: [0.3, 0.3, 0.3],
            grid: true,
            gridConfig: {
                lines: 60,
                dim: 500
            }
        };

        var color=RandColor();

        var ApplyText = function (text) {
            var model = $alexandraUtils.Text(text, {
                size: 10,
                height: 0.5,
                curveSegments: 30,
                bevelEnabled: true,
                bevelThickness: 1.5,
                bevelSize: 0.5
            });
            $scope.data = {
                mesh: model,
                position: [50, 50,150],
                rotation:{
                    angle:45,
                    axis:[0,1,0]
                },
                color:color

            }

        };

        var GetProfile = function () {
            CompanyService.Profile().get(function (res) {
                if (res.error) return console.log(res.error);
                profile = res.data;
                $scope.loading =false;
                ApplyText(profile.name);

            });
        }

        GetProfile();




    });
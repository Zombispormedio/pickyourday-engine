angular.module('Application')
    .controller('HeightMapCtrl', function($scope, CompanyService, CompanyService, StatsService, $alexandraModel, $alexandraStore){


    $scope.loading=true;

    $scope.selected={
        statType:"no",
        "engine":"phong"
    };

    $scope.config = {
        type: "custom",
        engine:"phong_positional",
        axis: true,
        fullWidth:true,
        axisLength: 500,
        streaming: true,
        background: [0.3, 0.3, 0.3],
        grid: true,
        gridConfig: {
            lines: 60,
            dim: 500
        },
        light:{
            direction:[-1.0, -1.0, -1]
        },
        colortype:"variable",
        permitEffects:true,
        LabelXConfig:{
            offset:15
        },
        LabelYConfig:{
            offset:15
        },
        LabelZConfig:{
            offset:15
        },
        lightSequence:[
            $alexandraStore.lights.blue,
            $alexandraStore.lights.green,
            $alexandraStore.lights.red
        ]
    };

    var plane={};

    $scope.index=1;

    $scope.select=function(){
        applyPlane();
    }
    var color=RandColor();

    var applyPlane=function(){
        var calendar=plane.vertices;
        var index=$scope.index-1;
        var current_day=calendar[index];


        $scope.data={
            mesh:$alexandraModel.Plane({
                height:plane.height,
                width:plane.width,
                w_s:plane.vWidth,
                h_s:plane.vHeight
            }, function(prev, item, index){
                var x=item.x, y=item.z, z=item.y;

                var c_p=_.find(current_day, function(i){
                    return i.key==index; 
                });

                if(c_p){
                    y=c_p.y;
                }

                prev.push(x);
                prev.push(y);
                prev.push(z);
                return prev;
            }),
            position:[50,0,50],
            color:color
        }



    }



    var ApplyText = function (text) {
        var model = $alexandraModel.Text(text, {
            size: 10,
            height: 0.1
        });
        $scope.data = {
            mesh: model,
            position: [50, 50,150],
            rotation:{
                angle:45,
                axis:[0,1,0]
            },
            color:RandColor()

        }

    };

    var Title=function(){
        CompanyService.Profile().get(function (res) {
            if (res.error) return console.log(res.error);
            profile = res.data;
            $scope.loading =false;
            ApplyText(profile.name);

        });
    }

    Title();

    var fetch=function(data){
        $scope.loading=false;
        plane=data.plane;

        console.log(plane);

        applyPlane();

        $scope.config.LabelX=data.legend.x;
        $scope.config.LabelY=data.legend.y;
        $scope.config.LabelZ=data.legend.z;


    }




    $scope.changeStatType=function(){
        $scope.loading=true; 
        $scope.statsTime=true;
        switch($scope.selected.statType){
            case "pick":
                StatsService.Picks(fetch);
                break;
            case "score":
                StatsService.ScoreServices(fetch);
                break;
            case "money":
                StatsService.MoneyResources(fetch);
                break;
            case "work":
                StatsService.WorkResources(fetch);
                break;

            case "origin":
                StatsService.OriginPicks(fetch);
                break;
        }
    }




});
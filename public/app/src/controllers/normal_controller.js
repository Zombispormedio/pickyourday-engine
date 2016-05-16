angular.module('Application')
    .controller('NormalCtrl', function($scope, CompanyService, StatsService, $alexandraModel,  $alexandraStore, $alexandraForest){

    $scope.loading=true;
    $scope.data=[];
    $scope.selectedInfo={};
    $scope.selected={
        statType:"no",
        "engine":"phong"
    };
    


    $scope.statsTime=false;
    var calendar=[];

    $scope.config={
        colortype:"variable",
        type:"custom",
        axis:true,
        axisLength:500,
        streaming:true,
        fullWidth:true,
       
        permitEffects:true,
        background:[0.3,0.3,0.3],
        grid:true,
        gridConfig:{
            lines:60,
            dim:500
        },
        selector:true, 
        onSelected:function(data){
            if(data)
                $scope.selectedInfo=data;
        },
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
        calendar=Immutable.List(data.stats);
        $scope.data=_.clone(calendar.get(0));
        $scope.loading=false; 

        $scope.config.LabelX=data.legend.x;
         $scope.config.LabelY=data.legend.y;
         $scope.config.LabelZ=data.legend.z;
       console.log( $alexandraForest. getTree("view_1"));

    }




    $scope.changeStatType=function(){
        $scope.config.type="sphere";
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
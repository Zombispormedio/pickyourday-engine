angular.module('Application')
    .controller('PlayerCtrl', function($scope, CompanyService, $timeout, StatsService, $alexandraModel,  $alexandraStore, $alexandraForest){

    $scope.loading=true;
    $scope.data=[];
    $scope.selectedInfo={};
    $scope.selected={
        statType:"no",
        "engine":"phong"
    };

    $scope.index=1;



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
        $scope.data=_.cloneDeep(calendar.get($scope.index-1));
        $scope.loading=false; 

        $scope.config.LabelX=data.legend.x;
        $scope.config.LabelY=data.legend.y;
        $scope.config.LabelZ=data.legend.z;


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



    var PLAYER_TIME=2000;
    var EMPTY_TIME=500;
    $scope.playing=false;


    var tween=null;



    function animateCalendar(step,c, n, cb){

        var inter_data=c.reduce(function(prev,item, index){
            var c_pos=item.position;
            var n_pos=n[index].position;

            if(!_.isEqual(c_pos, n_pos)){
                prev.length++;
                prev.current["x_"+index]=c_pos[0];
                prev.current["y_"+index]=c_pos[1];
                prev.current["z_"+index]=c_pos[2];

                prev.next["x_"+index]=n_pos[0];
                prev.next["y_"+index]=n_pos[1];
                prev.next["z_"+index]=n_pos[2];

            }
            return prev;

        }, {
            current:{},
            next:{},
            length:0
        });
        $scope.index=step+1;

        if(inter_data.length>0){

            tween = new TWEEN.Tween(inter_data.current)
                .to(inter_data.next, PLAYER_TIME)
                .onUpdate(function() {

                var self=this;

                if(!$scope.$$phase){
                    $scope.$apply(function(){ 

                        if($scope.playing==false){
                            tween.stop();
                            return;
                        }



                        var inter_array=Object.keys(self).reduce(function(prev, item){
                            var value=self[item];
                            var keys=item.split("_");
                            var param=keys[0];
                            var index=keys[1];


                            prev[index]=prev[index]||{}

                            prev[index][param]=value;
                            return prev;

                        },{});

                        var clone_data=_.cloneDeep($scope.data);

                        Object.keys(inter_array).forEach(function(item){
                            var value=inter_array[item];

                            clone_data[item].position=[value.x, value.y, value.z];

                        });

                        $scope.data=clone_data;


                    });
                }



            })
                .onComplete(function(){
                cb();
            })
                .onStop(function(){
                console.log("hello")
                cb();
            })
                .interpolation( TWEEN.Interpolation.Bezier ).easing( TWEEN.Easing.Linear.None ).delay( 250 )
                .start()


        }else{
            $timeout(cb, EMPTY_TIME);
        }






    }



    $scope.play=function(){
        $scope.playing=true;
        function iter(i){

            if(i<calendar.count()-1 && $scope.playing){
                var current=_.cloneDeep(calendar.get(i));
                var next=_.cloneDeep(calendar.get(i+1));
                animateCalendar(i, current, next, function(){
                    iter(i+1);
                });

            }else{



                $scope.playing=false;
                $scope.index=1;
                $scope.data=[];

                $scope.data=_.cloneDeep(calendar.get(0));    


            }

        }

        iter(0);
    }


    $scope.stop=function(){

        $scope.playing=false;

    }



    requestAnimationFrame(InterpolationTime);


    function InterpolationTime(time) {

        requestAnimationFrame(InterpolationTime);
        TWEEN.update(time);


    }












});
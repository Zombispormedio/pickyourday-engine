angular.module('Application')
    .controller('PlayerCtrl', function($scope, CompanyService, $timeout){

    var PLAYER_TIME=2000;
    var EMPTY_TIME=500;

    $scope.loading=true;
    $scope.playing=false;
    $scope.data=[];
    var calendar=[];
    var tween=null;

    $scope.values={
        index:1};

    $scope.config={
        colortype:"variable",
        engine:"phong_positional",
        axis:true,
        axisLength:500,
        streaming:true,
        background:[0.3,0.3,0.3],
        grid:true,
        gridConfig:{
            lines:60,
            dim:500
        }

    };




    CompanyService.Pick().stats(function(res){
         $scope.loading=false; 
        if(res.error)return console.log(res.error);
        calendar=Immutable.List(res.data.stats);
        $scope.data=_.cloneDeep(calendar.get(0));
       
    });


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
        $scope.values.index=step+1;

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
                $scope.values.index=1;
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
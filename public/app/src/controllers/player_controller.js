angular.module('Application')
    .controller('PlayerCtrl', function($scope, CompanyService, $timeout){

    var PLAYER_TIME=1000;

    $scope.loading=true;
    $scope.data=[];
    var calendar=[];
    $scope.values={
        index:1};

    $scope.config={
        colortype:"variable",
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
        calendar=Immutable.List(res.data);
        $scope.data=_.clone(calendar.get(0));
        $scope.loading=false; 
    });


    function animateCalendar(step,c, n, cb){

        var inm_inter_array=c.reduce(function(prev,item, index){
            var c_pos=_.clone(item.position);
            var n_pos=_.clone(n[index].position);


            if(!_.isEqual(c_pos, n_pos)){
                
                
                
                prev=prev.push({
                    index:index,
                    current: {x: c_pos[0], y: c_pos[1],z: c_pos[2]},
                    next: {x: n_pos[0], y: n_pos[1],z: n_pos[2]}
                });

            }


            return prev;

        }, {
            current:{},
            next:{}
        });
        $scope.values.index=step+1;

       



        if(inter_array.length>0){

    

                var tween = new TWEEN.Tween(current)
                .to(item.next, PLAYER_TIME)
                .onUpdate(function() {
                    var index=item.index;
                    var self=this;

                    if(!$scope.$$phase){
                        $scope.$apply(function(){ 
                            var clone_data=_.clone($scope.data);
                            clone_data[index].position=[self.x, self.y, self.y];  
                            $scope.data=clone_data;
                        });
                    }



                })
                .onComplete(function(){
                    
                    cb();
                })
                .start()
                

        }else{
            $timeout(cb, PLAYER_TIME);
        }




    }



    $scope.play=function(){


        function iter(i){
            console.log(i);

            if(i<calendar.count()-1){
                var current=_.clone(calendar.get(i));
                var next=_.clone(calendar.get(i+1));
                animateCalendar(i, current, next, function(){
                    iter(i+1);
                });

            }

        }

        iter(0);


    }

    requestAnimationFrame(InterpolationTime);


    function InterpolationTime(time) {

        requestAnimationFrame(InterpolationTime);
        TWEEN.update(time);


    }



});
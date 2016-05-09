angular.module('Application')
    .controller('HeightMapCtrl', function($scope, CompanyService, $alexandraUtils){

    $scope.loading=true;

    $scope.config = {
        type: "custom",
        axis: true,
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
    };

    var plane={};

    $scope.index=1;

    CompanyService.Pick().stats(function(res){
        $scope.loading=false;
        plane=res.data.plane;

        applyPlane();

    });
    
    $scope.select=function(){
        applyPlane();
    }
	var color=RandColor();

    var applyPlane=function(){
        var calendar=plane.vertices;
        var index=$scope.index-1;
        var current_day=calendar[index];

        $scope.data={
            mesh:$alexandraUtils.Plane({
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




    });
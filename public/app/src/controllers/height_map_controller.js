angular.module('Application')
    .controller('HeightMapCtrl', function($scope, CompanyService, $alexandraUtils){

    //$scope.loading=true;

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
        }
    };


    $scope.data={
        mesh:$alexandraUtils.Plane({
            height:100,
            width:100,
            w_s:5,
            h_s:8
        }, function(prev, item, index){
            var x=item.x, y=0, z=item.y;

            if((x<50 && x>-50)&&(z<50 && z>-50)){
                y=chance.integer({min:0, max:30});
            }
            
            prev.push(x);
            prev.push(y);
            prev.push(z);
            return prev;
        }),
        position:[50,0,50]
    }

});
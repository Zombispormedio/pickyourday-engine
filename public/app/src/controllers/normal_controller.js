angular.module('Application')
    .controller('NormalCtrl', function($scope, CompanyService){

    $scope.loading=true;
    $scope.data=[];
	$scope.selectedInfo={};
	
    var calendar=[];

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
        },
		selector:true, 
        onSelected:function(data){
			if(data)
            $scope.selectedInfo=data;
        }

    };


    var fetch=function(){
        CompanyService.Pick().stats(function(res){
            calendar=Immutable.List(res.data);
            $scope.data=_.clone(calendar.get(0));
            $scope.loading=false; 
        });
    }
    
    fetch();
});
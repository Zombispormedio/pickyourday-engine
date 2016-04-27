angular.module('Application')
    .controller('SliderCtrl', function($scope){
    
  var coords = { x: 0, y: 0, z:0 };

    var tween = new TWEEN.Tween(coords)
    .to({ x: 100, y: 50, z:70 }, 10000)
    .onUpdate(function() {
        var self=this;
        $scope.$apply(function(){
             $scope.coords={x:self.x, y:self.y, z:self.z};
               console.log( $scope.coords)
        })
           

    })
    .start()

    requestAnimationFrame(animate);
	

    function animate(time) {
        
            requestAnimationFrame(animate);
            TWEEN.update(time);
        

    }
});
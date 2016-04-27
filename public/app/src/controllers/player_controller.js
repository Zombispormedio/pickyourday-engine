angular.module('Application')
    .controller('PlayerCtrl', function($scope, $interval){


    var completed=false;
    
    var coords = { x: 0, y: 0 };

    var tween = new TWEEN.Tween(coords)
    .to({ x: 100, y: 100 }, 10000)
    .onUpdate(function() {
        var self=this;
        $scope.$apply(function(){
             $scope.coords={x:self.x, y:self.y};
               console.log( $scope.coords)
        })
           
        console.log()
    })
    .onComplete(function(){
        completed=true;
    })
    .start()

    requestAnimationFrame(animate);

    function animate(time) {
        if(!completed){
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }

    }






});
angular.module('alexandra')
    .directive('alexandraView', function($alexandraUtils, $alexandraView) {
    return {
        restrict: 'A',
        compile:function(tElement){
            var fullPage=$alexandraUtils.fullPage(tElement[0]);

            fullPage()
            window.addEventListener('resize', fullPage, false);

            $alexandraView.inc();
        }
    };
});
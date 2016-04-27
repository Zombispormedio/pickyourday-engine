(function(module) {
try {
  module = angular.module('Application');
} catch (e) {
  module = angular.module('Application', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/login.html',
    '<div>\n' +
    '    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore consectetur, recusandae suscipit exercitationem repellendus, voluptates quasi reiciendis placeat excepturi culpa voluptas consequuntur natus voluptatem officiis, nihil ratione enim harum libero!\n' +
    '</div>');
}]);
})();

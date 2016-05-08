(function(module) {
try {
  module = angular.module('Application');
} catch (e) {
  module = angular.module('Application', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/main.html',
    '\n' +
    '<md-toolbar class="md-accent md-whiteframe-1dp">\n' +
    '    <div class="md-toolbar-tools">\n' +
    '\n' +
    '\n' +
    '        <md-menu flex="5">\n' +
    '            <md-button aria-label="Type Stats" class="md-icon-button button-stats" ng-click="openMenu($mdOpenMenu, $event)">\n' +
    '                <md-icon md-menu-origin md-font-icon="mdi-chart-areaspline" class="mdi"></md-icon>\n' +
    '            </md-button>\n' +
    '            <md-menu-content width="4">\n' +
    '                <md-menu-item>\n' +
    '                    <md-button ui-sref="app.normal">\n' +
    '                        <md-icon md-font-icon="mdi-chart-bubble" class="mdi"></md-icon>\n' +
    '                        Normal\n' +
    '                    </md-button>\n' +
    '                </md-menu-item>\n' +
    '                <md-menu-item>\n' +
    '                    <md-button  ui-sref="app.slider">\n' +
    '                        <md-icon md-font-icon="mdi-clock-start" class="mdi"></md-icon>\n' +
    '                        Slider\n' +
    '                    </md-button>\n' +
    '                </md-menu-item>\n' +
    '                <md-menu-divider></md-menu-divider>\n' +
    '                <md-menu-item>\n' +
    '                    <md-button  ui-sref="app.player">\n' +
    '                        <md-icon md-font-icon="mdi-play-box-outline" class="mdi"></md-icon>\n' +
    '                        Player\n' +
    '                    </md-button>\n' +
    '                </md-menu-item>\n' +
    '            </md-menu-content>\n' +
    '        </md-menu>\n' +
    '\n' +
    '        <h2>\n' +
    '            <span>Pickyourday 3D</span>\n' +
    '        </h2>\n' +
    '        <span flex></span>\n' +
    '        <md-button aria-label="logout" class="md-icon-button button-power" style="margin-right: 0px;" ng-click="logout()">\n' +
    '            <md-icon md-font-icon="mdi-power" class="mdi"></md-icon>\n' +
    '        </md-button>\n' +
    '    </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '\n' +
    '<div ui-view="content"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('Application');
} catch (e) {
  module = angular.module('Application', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/login/main.html',
    '<div layout="column" layout-align="center center">\n' +
    '\n' +
    '\n' +
    '\n' +
    '    <md-card>\n' +
    '        <md-card-title>\n' +
    '            <md-card-title-text>\n' +
    '                <span class="md-headline">Pickyourday 3D</span>\n' +
    '\n' +
    '            </md-card-title-text>\n' +
    '\n' +
    '        </md-card-title>\n' +
    '        <md-card-content layout="column">\n' +
    '\n' +
    '\n' +
    '            <md-input-container class="md-primary md-raised md-hue-2">\n' +
    '                <label>Email</label>\n' +
    '                <input ng-model="user.email" type="email">\n' +
    '            </md-input-container>\n' +
    '\n' +
    '            <md-input-container class="md-primary md-raised md-hue-2">\n' +
    '                <label>Password</label>\n' +
    '                <input ng-model="user.password" type="password">\n' +
    '            </md-input-container>\n' +
    '        </md-card-content>\n' +
    '        <md-card-actions layout="row" layout-align="center center">\n' +
    '            <md-button class="md-primary  md-raised md-hue-2" ng-click="login()">Login</md-button>\n' +
    '\n' +
    '        </md-card-actions>\n' +
    '    </md-card>\n' +
    '\n' +
    '\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('Application');
} catch (e) {
  module = angular.module('Application', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/normal/main.html',
    '<md-progress-linear md-mode="indeterminate" ng-if="loading"></md-progress-linear>\n' +
    '<div class="player-content" layout="row">\n' +
    '<canvas alexandra-view data-id="view_1" alexandra-config="config" alexandra-source="data" width="800" height="600"></canvas>\n' +
    '  <div flex="35" layout="column" layout-align="center center">\n' +
    '	<p>X: {{selectedInfo[0]||\'N/A\'}}</p>\n' +
    '	<p>Y: {{selectedInfo[1] || \'0\'}}</p>\n' +
    '	<p>Z: {{selectedInfo[2]||\'N/A\'}}</p>\n' +
    '  </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('Application');
} catch (e) {
  module = angular.module('Application', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/player/main.html',
    '<md-progress-linear md-mode="indeterminate" ng-if="loading"></md-progress-linear>\n' +
    '<div class="player-content" layout="row">\n' +
    '    <canvas alexandra-view data-id="view_1" alexandra-config="config" alexandra-source="data" width="800" height="600"></canvas>\n' +
    '    <div flex="35" layout="column" layout-align="center strech">\n' +
    '        <div flex layout="row" layout-align="center center">\n' +
    '            <md-button ng-click="play()" ng-if="!loading">\n' +
    '                <md-icon md-font-icon="mdi-play" class="mdi"></md-icon>\n' +
    '                Play\n' +
    '            </md-button>\n' +
    '        </div>\n' +
    '\n' +
    '        <div flex>\n' +
    '            <div ng-repeat="vm in data">\n' +
    '                {{vm.position}}\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div>\n' +
    '            <md-slider-container>\n' +
    '               <span class="md-body-1">{{values.index}}</span>\n' +
    '                <md-slider class="md-primary" md-discrete step="1" min="1" max="30" aria-label="rating" ng-show="!loading" ng-model="values.index" ng-disabled="true">\n' +
    '                </md-slider>\n' +
    '            </md-slider-container>\n' +
    '        </div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('Application');
} catch (e) {
  module = angular.module('Application', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/slider/main.html',
    '<md-progress-linear md-mode="indeterminate" ng-if="loading"></md-progress-linear>\n' +
    '<div class="player-content" layout="row">\n' +
    '    <canvas alexandra-view data-id="view_1" alexandra-config="config" alexandra-source="data" width="800" height="600"></canvas>\n' +
    '</div>');
}]);
})();

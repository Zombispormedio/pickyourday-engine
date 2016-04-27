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
    '            <md-button aria-label="Type Stats" class="md-icon-button" ng-click="openMenu($mdOpenMenu, $event)">\n' +
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
    '        <md-button aria-label="logout" class="md-icon-button" style="margin-right: 0px;" ng-click="logout()">\n' +
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
    '<div>Normal</div>');
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
    '<div>Player</div>\n' +
    '\n' +
    '{{coords.x}}, {{coords.y}} ');
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
    '<div>Slider</div>\n' +
    '\n' +
    '');
}]);
})();

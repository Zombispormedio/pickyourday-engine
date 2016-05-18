(function(module) {
try {
  module = angular.module('Application');
} catch (e) {
  module = angular.module('Application', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/main.html',
    '\n' +
    '<md-toolbar class="md-accent md-whiteframe-1dp" style=" height:35px;min-height: 35px!important;">\n' +
    '    <div class="md-toolbar-tools">\n' +
    '        <md-menu flex="5" style="margin: 0">\n' +
    '            <md-button aria-label="Type Stats" class="md-icon-button button-stats" ng-click="openMenu($mdOpenMenu, $event)">\n' +
    '                <md-icon md-menu-origin md-font-icon="mdi-chart-areaspline" class="mdi" style="color: white; font-size: 2em; margin-top: -5.3%"></md-icon>\n' +
    '            </md-button>\n' +
    '            <md-menu-content width="4" style="background-color: white">\n' +
    '                <md-menu-item>\n' +
    '                    <md-button ui-sref="app.normal">\n' +
    '                        <md-icon md-font-icon="mdi-chart-bubble" class="mdi" style=" color: black; font-size: 2em"></md-icon>\n' +
    '                        Normal\n' +
    '                    </md-button>\n' +
    '                </md-menu-item>\n' +
    '                <md-menu-item>\n' +
    '                    <md-button  ui-sref="app.slider">\n' +
    '                        <md-icon md-font-icon="mdi-clock-start" class="mdi" style=" color: black; font-size: 2em"></md-icon>\n' +
    '                        Slider\n' +
    '                    </md-button>\n' +
    '                </md-menu-item>\n' +
    '                <md-menu-divider></md-menu-divider>\n' +
    '                <md-menu-item>\n' +
    '                    <md-button  ui-sref="app.player">\n' +
    '                        <md-icon md-font-icon="mdi-play-box-outline" class="mdi" style=" color: black; font-size: 2em"></md-icon>\n' +
    '                        Player\n' +
    '                    </md-button>\n' +
    '                </md-menu-item>\n' +
    '                <md-menu-item>\n' +
    '                    <md-button  ui-sref="app.heightmap">\n' +
    '                        <md-icon md-font-icon="mdi-airplane-landing" class="mdi" style=" color: black; font-size: 2em"></md-icon>\n' +
    '                        Height Map\n' +
    '                    </md-button>\n' +
    '                </md-menu-item>\n' +
    '            </md-menu-content>\n' +
    '        </md-menu>\n' +
    '        \n' +
    '        <h2>\n' +
    '            <span>Pickyourday 3D</span>\n' +
    '        </h2>\n' +
    '        <span flex></span>\n' +
    '        <md-button aria-label="logout" class="md-icon-buttonr" style="margin-right: 0px;  margin-top: -0.5%;" ng-click="logout()">\n' +
    '            <md-icon md-font-icon="mdi-power" class="mdi" style=" color: white; font-size: 2em"></md-icon>\n' +
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
  $templateCache.put('/views/height-map/main.html',
    '<md-progress-linear md-mode="indeterminate" ng-if="loading"></md-progress-linear>\n' +
    '<canvas alexandra-view data-id="view_1" alexandra-config="config" alexandra-source="data" width="800" height="500"></canvas>\n' +
    '\n' +
    '\n' +
    '<div layout="row">\n' +
    '    <div flex="30"  flex-offset="5"  ng-show="statsTime">\n' +
    '        <md-slider-container>\n' +
    '            <label>Día del mes</label>\n' +
    '            <md-slider class="md-primary" md-discrete step="1" min="1" max="30" aria-label="rating" ng-model="index" ng-change="select()">\n' +
    '            </md-slider>\n' +
    '        </md-slider-container>\n' +
    '    </div>\n' +
    '\n' +
    '    <md-select flex="20" ng-model="selected.statType"  flex-offset="5" placeholder="Selecciona x/y/z" ng-change="changeStatType()">\n' +
    '\n' +
    '        <md-option value="pick">Estado de Pick/Cantidad/Servicio</md-option>\n' +
    '\n' +
    '        <md-option value="score">Valoración/Cantidad/Servicio</md-option>\n' +
    '        <md-option value="money">Empleado/Dinero/Servicio</md-option>\n' +
    '        <md-option value="work">Empleado/Tiempo Trabajado/Servicio</md-option>\n' +
    '    </md-select>\n' +
    '    \n' +
    '    <md-select flex="20" style="margin-right:5%;" ng-model="config.engine"  flex-offset="5" placeholder="Selecciona engine">\n' +
    '\n' +
    '        <md-option value="phong">Phong</md-option>\n' +
    '\n' +
    '        <md-option value="phong_positional">Phong Positional</md-option>\n' +
    '        <md-option value="toon">Toon</md-option>\n' +
    '        <md-option value="phong_lights">Phong Several Lights</md-option>\n' +
    '    </md-select>\n' +
    '  \n' +
    '     <md-select flex="20" style="margin-right:5%;" ng-model="config.effect"  ng-if="!config.selector" flex-offset="5" placeholder="Selecciona effect">\n' +
    '\n' +
    '        <md-option value="no">No Effect</md-option>\n' +
    '\n' +
    '        <md-option value="invert">Negative</md-option>\n' +
    '        <md-option value="grey">Greyscale</md-option>\n' +
    '        <md-option value="blur">Blur</md-option>\n' +
    '        <md-option value="film">Film</md-option>\n' +
    '        <md-option value="wavy">Wavy</md-option>\n' +
    '         <md-option value="all">Random</md-option>\n' +
    '    </md-select>\n' +
    '</div>\n' +
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
    '\n' +
    '<canvas alexandra-view data-id="view_1" alexandra-config="config" alexandra-source="data" width="800" height="500"></canvas>\n' +
    '<div layout="row">\n' +
    '\n' +
    '    <md-select flex="20" ng-model="selected.statType"  flex-offset="5" placeholder="Selecciona x/y/z" ng-change="changeStatType()">\n' +
    '\n' +
    '        <md-option value="pick">Estado de Pick/Cantidad/Servicio</md-option>\n' +
    '        <md-option value="origin">Origen/Cantidad/Servicio</md-option>\n' +
    '        <md-option value="score">Valoración/Cantidad/Servicio</md-option>\n' +
    '        <md-option value="money">Empleado/Dinero/Servicio</md-option>\n' +
    '        <md-option value="work">Empleado/Tiempo Trabajado/Servicio</md-option>\n' +
    '    </md-select>\n' +
    '\n' +
    '    <md-select flex="20" style="margin-right:5%;" ng-model="config.engine"  flex-offset="5" placeholder="Selecciona engine">\n' +
    '\n' +
    '        <md-option value="phong">Phong</md-option>\n' +
    '\n' +
    '        <md-option value="phong_positional">Phong Positional</md-option>\n' +
    '        <md-option value="toon">Toon</md-option>\n' +
    '        <md-option value="phong_lights">Phong Several Lights</md-option>\n' +
    '    </md-select>\n' +
    '    <md-checkbox flex ng-model="config.selector" aria-label="Selector">\n' +
    '        Use Selector\n' +
    '    </md-checkbox>\n' +
    '    <md-select flex="20" style="margin-right:5%;" ng-model="config.effect"  ng-if="!config.selector" flex-offset="5" placeholder="Selecciona effect">\n' +
    '\n' +
    '        <md-option value="no">No Effect</md-option>\n' +
    '\n' +
    '        <md-option value="invert">Negative</md-option>\n' +
    '        <md-option value="grey">Greyscale</md-option>\n' +
    '        <md-option value="blur">Blur</md-option>\n' +
    '        <md-option value="film">Film</md-option>\n' +
    '        <md-option value="wavy">Wavy</md-option>\n' +
    '        <md-option value="all">Random</md-option>\n' +
    '    </md-select>\n' +
    '\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<div ng-if="statsTime" layout="row" style="position: fixed;\n' +
    '                                           top: 50px;\n' +
    '                                           left: 30px;\n' +
    '                                           width: 410px;\n' +
    '                                           background-color: white;\n' +
    '                                           padding-left: 27px;\n' +
    '                                           box-shadow: 0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);">\n' +
    '    <p flex="30">X: {{selectedInfo[0]||\'N/A\'}}</p>\n' +
    '    <p flex="10">Y: {{selectedInfo[1] || \'0\'}}</p>\n' +
    '    <p flex>Z: {{selectedInfo[2]||\'N/A\'}}</p>\n' +
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
    '\n' +
    '<canvas alexandra-view data-id="view_1" alexandra-config="config" alexandra-source="data" width="800" height="500"></canvas>\n' +
    '<div layout="row">\n' +
    '    <div flex="20"  flex-offset="5"  ng-show="statsTime">\n' +
    '        <md-slider-container>\n' +
    '            <label>Día del mes</label>\n' +
    '            <md-slider ng-disabled="true" class="md-primary" md-discrete step="1" min="1" max="30" aria-label="rating" ng-model="index">\n' +
    '            </md-slider>\n' +
    '        </md-slider-container>\n' +
    '    </div>\n' +
    '    <md-select flex="20" ng-model="selected.statType"  flex-offset="5" placeholder="Selecciona x/y/z" ng-change="changeStatType()">\n' +
    '\n' +
    '        <md-option value="pick">Estado de Pick/Cantidad/Servicio</md-option>\n' +
    '\n' +
    '        <md-option value="score">Valoración/Cantidad/Servicio</md-option>\n' +
    '        <md-option value="money">Empleado/Dinero/Servicio</md-option>\n' +
    '        <md-option value="work">Empleado/Tiempo Trabajado/Servicio</md-option>\n' +
    '    </md-select>\n' +
    '\n' +
    '    <md-select flex="15" style="margin-right:5%;" ng-model="config.engine"  flex-offset="5" placeholder="Selecciona engine">\n' +
    '\n' +
    '        <md-option value="phong">Phong</md-option>\n' +
    '\n' +
    '        <md-option value="phong_positional">Phong Positional</md-option>\n' +
    '        <md-option value="toon">Toon</md-option>\n' +
    '        <md-option value="phong_lights">Phong Several Lights</md-option>\n' +
    '    </md-select>\n' +
    '    <md-checkbox flex="10" ng-model="config.selector" aria-label="Selector">\n' +
    '        Use Selector\n' +
    '    </md-checkbox>\n' +
    '    <md-select flex="15" style="margin-right:5%;" ng-model="config.effect"  ng-if="!config.selector" flex-offset="5" placeholder="Selecciona effect">\n' +
    '\n' +
    '        <md-option value="no">No Effect</md-option>\n' +
    '\n' +
    '        <md-option value="invert">Negative</md-option>\n' +
    '        <md-option value="grey">Greyscale</md-option>\n' +
    '        <md-option value="blur">Blur</md-option>\n' +
    '        <md-option value="film">Film</md-option>\n' +
    '        <md-option value="wavy">Wavy</md-option>\n' +
    '        <md-option value="all">Random</md-option>\n' +
    '    </md-select>\n' +
    '\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<div ng-if="statsTime" layout="row" style="position: fixed;\n' +
    '                                           top: 50px;\n' +
    '                                           left: 30px;\n' +
    '                                           width: 410px;\n' +
    '                                           background-color: white;\n' +
    '                                           padding-left: 27px;\n' +
    '                                           box-shadow: 0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);">\n' +
    '    <p flex="30">X: {{selectedInfo[0]||\'N/A\'}}</p>\n' +
    '    <p flex="10">Y: {{selectedInfo[1] || \'0\'}}</p>\n' +
    '    <p flex>Z: {{selectedInfo[2]||\'N/A\'}}</p>\n' +
    '</div>\n' +
    '\n' +
    '<div ng-if="statsTime" style="position: fixed;\n' +
    '            top: 75.7%;\n' +
    '            background-color: rgba(1,1,1,0.6);\n' +
    '            color: white;">\n' +
    '    <md-button ng-click="play()" ng-if="!loading&&!playing">\n' +
    '        <md-icon md-font-icon="mdi-play" class="mdi" style="color: white; font-size: 2em;"></md-icon>\n' +
    '        Play\n' +
    '    </md-button>\n' +
    '\n' +
    '    <md-button ng-click="stop()" ng-if="playing">\n' +
    '        <md-icon md-font-icon="mdi-stop" class="mdi" style="color: white; font-size: 2em;"></md-icon>\n' +
    '        Stop\n' +
    '    </md-button>\n' +
    '</div>\n' +
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
    '\n' +
    '<canvas alexandra-view data-id="view_1" alexandra-config="config" alexandra-source="data" width="800" height="500"></canvas>\n' +
    '<div layout="row">\n' +
    '    <div flex="20"  flex-offset="5"  ng-show="statsTime">\n' +
    '        <md-slider-container>\n' +
    '            <label>Día del mes</label>\n' +
    '            <md-slider class="md-primary" md-discrete step="1" min="1" max="30" aria-label="rating" ng-model="index" ng-change="select()">\n' +
    '            </md-slider>\n' +
    '        </md-slider-container>\n' +
    '    </div>\n' +
    '    <md-select flex="20" ng-model="selected.statType"  flex-offset="5" placeholder="Selecciona x/y/z" ng-change="changeStatType()">\n' +
    '\n' +
    '        <md-option value="pick">Estado de Pick/Cantidad/Servicio</md-option>\n' +
    '\n' +
    '        <md-option value="score">Valoración/Cantidad/Servicio</md-option>\n' +
    '        <md-option value="money">Empleado/Dinero/Servicio</md-option>\n' +
    '        <md-option value="work">Empleado/Tiempo Trabajado/Servicio</md-option>\n' +
    '    </md-select>\n' +
    '\n' +
    '    <md-select flex="15" style="margin-right:5%;" ng-model="config.engine"  flex-offset="5" placeholder="Selecciona engine">\n' +
    '\n' +
    '        <md-option value="phong">Phong</md-option>\n' +
    '\n' +
    '        <md-option value="phong_positional">Phong Positional</md-option>\n' +
    '        <md-option value="toon">Toon</md-option>\n' +
    '        <md-option value="phong_lights">Phong Several Lights</md-option>\n' +
    '    </md-select>\n' +
    '    <md-checkbox flex="10" ng-model="config.selector" aria-label="Selector">\n' +
    '        Use Selector\n' +
    '    </md-checkbox>\n' +
    '    <md-select flex="15" style="margin-right:5%;" ng-model="config.effect"  ng-if="!config.selector" flex-offset="5" placeholder="Selecciona effect">\n' +
    '\n' +
    '        <md-option value="no">No Effect</md-option>\n' +
    '\n' +
    '        <md-option value="invert">Negative</md-option>\n' +
    '        <md-option value="grey">Greyscale</md-option>\n' +
    '        <md-option value="blur">Blur</md-option>\n' +
    '        <md-option value="film">Film</md-option>\n' +
    '        <md-option value="wavy">Wavy</md-option>\n' +
    '        <md-option value="all">Random</md-option>\n' +
    '    </md-select>\n' +
    '\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<div ng-if="statsTime" layout="row" style="position: fixed;\n' +
    '                                           top: 50px;\n' +
    '                                           left: 30px;\n' +
    '                                           width: 410px;\n' +
    '                                           background-color: white;\n' +
    '                                           padding-left: 27px;\n' +
    '                                           box-shadow: 0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);">\n' +
    '    <p flex="30">X: {{selectedInfo[0]||\'N/A\'}}</p>\n' +
    '    <p flex="10">Y: {{selectedInfo[1] || \'0\'}}</p>\n' +
    '    <p flex>Z: {{selectedInfo[2]||\'N/A\'}}</p>\n' +
    '</div>');
}]);
})();

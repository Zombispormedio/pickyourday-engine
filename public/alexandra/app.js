var app = angular.module('alexandraExample', [ "alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($rootScope, $scope, $interval, $timeout, $alexandraModel) {


    $scope.data=[/*{
        mesh:$alexandraModel.TorusKnot(20, 6, 100, 16),
        position:RandPosition(),
        color: RandColor()
    },{
        mesh:$alexandraModel.Box(15,15,15),
        position:RandPosition(),
        color: RandColor()
    },{
        mesh:$alexandraModel.Tube(50,20,2,8, false),
        position:RandPosition(),
        color: RandColor()
    },{
        mesh:$alexandraModel.Torus(20,3, 16, 100),
        position:RandPosition(),
        color: RandColor()
    },{
        mesh:$alexandraModel.Tetrahedron(5),
        position:RandPosition(),
        color: RandColor()
    },{
        mesh:$alexandraModel.Sphere(5),
        position:RandPosition(),
        color: RandColor()
    },{
        mesh:$alexandraModel.Octahedron(5),
        position:RandPosition(),
        color: RandColor()
    },{
        mesh:$alexandraModel.Lathe(10),
        position:RandPosition(),
        color: RandColor()
    },{
        mesh:$alexandraModel.Icosahedron(10),
        position:RandPosition(),
        color: RandColor()
    },{
        mesh:$alexandraModel.Dodecahedron(10),
        position:RandPosition(),
        color: RandColor()
    },{
        mesh:$alexandraModel.Cylinder(5, 5, 20, 32),
        position:RandPosition(),
        color: RandColor()
    },{
        mesh:$alexandraModel.Plane({
            height:200,
            width:200,
            w_s:50,
            h_s:50
        }, function(prev, item, index){
            var x=item.x, y=item.z, z=item.y;

            y=chance.floating({min:0, max:50})

            prev.push(x);
            prev.push(y);
            prev.push(z);
            return prev;
        }),
       position:[50,0,50],
        color: RandColor()
    },{
        mesh:$alexandraModel.Text("0", {
            size:5,
            height:0.1
        }),
         position:[0,0,0],
        color: [1,1,1,1]
    }*/];



    $scope.config={

        engine:"phong",
        colortype:"variable",
        type:"custom",
        axis:true,
        axisLength:500,
        streaming:true,
        background:[0.3,0.3,0.3],
        grid:true,
        gridConfig:{
            lines:60,
            dim:500
        },
        fullpage:true,
        LabelX:"Picks Cancelados/Terminados",
        LabelXConfig:{
            offset:15
        },

        LabelY:"Cantidad de Picks",
        LabelYConfig:{
            offset:15
        },

        LabelZ:"Servicios",

        LabelZConfig:{
            offset:15
        },

        OriginLabel:true,
        OriginLabelConfig:{
            offset:1

        },


        ValueAxisXLabel:[
            {
                value:15,
                label:1
            }
        ],

        ValueAxisXLabelConfig:{
            offset:1
        },

        ValueAxisZLabel:[
            {
                value:9,
                label:1
            }
        ],

        ValueAxisZLabelConfig:{
            offset:1
        },
         ValueAxisYLabel:[
            {
                value:9,
                label:1
            }
        ],

        ValueAxisYLabelConfig:{
            offset:1
        }



    };


});
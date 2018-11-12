myapp.controller('pageCtr',function($scope,$http){

  $scope.imgbrand = '/static/imgs/defaults/registro_marca.png';
  $scope.paso = 1;
  $scope.userprofile = {};
  $scope.template = 1;
  $scope.fontfile = [];
  $scope.ahorale= '0';
  $scope.pasosvalidos = [];

  $scope.combinations = [];


$scope.defpage_settings = {
    'colores':[{'rgb':[75,75,75],'hex':'#3d3f42','orden':1},
               {'rgb':[104,169,238],'hex':'#54bae9','orden':2}
    ],
    'fuentes':[]
  };

  $scope.validesteps = function(){
    inx = $scope.pasosvalidos.indexOf($scope.paso);
    if(inx<0)
    return false;
    else
      return true;

  }



  $scope.defaultcolors = [
    {'rgb':[0,0,0],'hex':'#000000','orden':3},
    {'rgb':[255,255,255],'hex':'#ffffff','orden':4}];



  $scope.puntajes = [18,36,72];


  $scope.fontusage = [
                        {'usage':'Títulos',
                         'slug':'titulos',
                         'fuente':'Open Sans Bold',
                         'puntos':72
                       },
                        {'usage':'Subtítulos',
                         'slug':'subtitulos',
                         'fuente':'Open Sans Light',
                         'puntos':36
                       },
                        {'usage':'Textos',
                         'slug':'textos',
                         'fuente':'Open Sans light',
                         'puntos':18
                       }



                    ];





  $scope.page_settings = arrsetts;
  $scope.fontusage = arrsetts.fuentes;

  if(arrsetts.colores==undefined){
    $scope.page_settings.colores = $scope.defpage_settings.colores;
  }



  angular.forEach($scope.page_settings.colores, function(colormas){
    $scope.defaultcolors.push(colormas);
  });




  $scope.validateColors = function(dato){
      if(dato>255 || dato <0 || isNaN(dato))
          return false;
      else
          return true;
  };


  $scope.resetimg = function(){
    $scope.imgbrand = '/static/imgs/defaults/registro_marca.png';
    $('#imgbrand').attr('src',$scope.imgbrand);
  }

  $scope.upstep = function(){
    $scope.paso++;

  }

  $scope.downstep = function(){
    $scope.paso--;
  }


  $scope.settemplate = function(templatenum){
    $scope.template = templatenum;
    $scope.pasosvalidos.push(2);
    $scope.pasosvalidos.push(3);

  }


  $scope.changeColor = function(elemento){
    color = elemento.colors;

    truR = $scope.validateColors(color.rgb[0]);
    truG = $scope.validateColors(color.rgb[1]);
    truB = $scope.validateColors(color.rgb[2]);

    if(truR && truG & truB){
      rgbstr = 'rgb('+color.rgb[0]+','+color.rgb[1]+','+color.rgb[2]+' )';
      rgbb = w3color(rgbstr).toHexString();


    inx = $scope.page_settings.combinaciones.filter(function (person) {
      if(person.fcolor == elemento.colors.hex)
        person.fcolor = rgbb;
      return (person.fcolor == elemento.colors.hex);
    });

    inx = $scope.page_settings.combinaciones.filter(function (person) {
      if(person.backcolor == elemento.colors.hex)
        person.backcolor = rgbb;
      return (person.backcolor == elemento.colors.hex);
    });




      elemento.colors.hex = rgbb;
      //$scope.page_settings.colores[0].hex=rgbb;


    }
    else{
        alert('El codigo proporcionado no pertenece a un color RGB valido');
        return true;
    }
  }


  $scope.setcoloractv = function(coloractv){
    if(coloractv.activate==1){
        coloractv.activate=2;
    }
    else{
      coloractv.activate=1;
    }

  };


  $scope.savepaso3 = function(){
    //$scope.page_settings.combinaciones = $scope.combinations;
    $scope.savefour();
  }



  $scope.save_colorsite = function()
  {

    data = $scope.page_settings;


    params = {
              'url':'/registro/savesettings/',
              'method':'GET',
              'params':data
            };
    
    $http(params).then(function(response){
        if($scope.userprofile.domain)
          location.href='http://'+$scope.userprofile.domain;


    });

  }


  $scope.savefour = function(){
    

    data = $scope.page_settings;


    params = {
              'url':'/registro/savesettings/',
              'method':'GET',
              'params':data
            };
    
    $http(params).then(function(response){
        if($scope.userprofile.domain)
          location.href='http://'+$scope.userprofile.domain;


    });

  }


  $scope.viewer = 'colores';
  $scope.chengeviewer = function(elemento){
    $scope.viewer = elemento;
  }

});



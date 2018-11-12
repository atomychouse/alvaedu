
angular.module("cfgApp").directive('watchColors', ['$http',function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {

        scope.$watch('colorset',function(x){

          ncro = scope.cp.cromas;


          solidColor = ncro.rgb.r+','+ ncro.rgb.g +','+ncro.rgb.b;
          
          rgbColor = 'rgb('+solidColor+')';
          hexcolor = w3color(rgbColor).toHexString();          
          hwbc = w3color(hexcolor).toHwb();
          hslc = w3color(hexcolor).toHsl();
          ncols = w3color(hexcolor).toNcolString();



          ncro.hwb = hwbc;
          ncro.hsl = hslc;
          ncro.ncols = ncols;
          ncro.hex = hexcolor;

        },true);



    }
  };

}]);



angular.module("cfgApp").directive('sliderColors', ['$http',function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      valueses = [];
        angular.forEach(scope.colorset.principales, function(principal){
          valueses.push(principal.w);

        });

      elm.slider({'values':valueses,
                     'range':'max',
                     'min':0,
                     'max':100,
                     'stop':function(event,ui){
                        valores = ui.values;
                        for(x=0;x<valores.length;x++){
                            if(x==0){
                                yo = valores[x];
                                resto = yo;
                                eldeatras = 0;
                            }
                            else{
                                yo = valores[x];
                                eldeatras = valores[x-1];
                                resto = yo-eldeatras;
                            }
                          scope.colorset.principales[x].w = yo;
                          scope.colorset.principales[x].percente = resto;
                          scope.colorset.principales[x].roundper = Math.round(resto);
                          scope.$apply();
                          scope.saveGetP(scope.colorset.principales[x],'/cfg/savecolors/');

                        }


                     }
                 });



    }
  };

}]);

angular.module("cfgApp").directive('droplistFt',['$http',function(){

  return {
    restrict:'A',
    link:function(scope,elm,attrs){
      elm.sortable({
      connectWith: "ul",
      stop:function(e,ui){
        nombre = ui.item.attr('data-fontname');
        padre = ui.item.parents('ul:first').attr('data-fcase');
        pk = ui.item.attr('data-pk');
        if(padre){
          structuchor = {'fonty':nombre,'pk':pk,'puntaje':'24px','usage':padre,'texto':'titulos'};
          scope.fontusage.push(structuchor);
          scope.$apply();          
        }
        return false;

      }
    });
    }
  }

}]);



cfgapp.controller('cfgCtr',function($scope,$http){


  

  $scope.page_cfg = cfgpage;


  $scope.setcfgcolor = function(fondo,fuente){
      $scope.page_cfg.fondocolor = fondo;
      $scope.page_cfg.fuentecolor = fuente;

    data = {'cfg':$scope.page_cfg};
    uri = '/cfg/cfgpage/';
    $http({'url':uri,method:'GET',params:data}).then(function(response){
      console.log(response.data);
    });



  }


// DECLARATION BAR
    $scope.fuentes_css = [];
    $scope.fuentes_available = [];
    if(fuentes)
      $scope.fuentes_available = fuentes;
    $scope.groups = groups;
    $scope.usuarios = usuarios;
    //$scope.fontcases = [{'fcase':'titulos','ft':'"Open Sans" sans-serif'},{'fcase':'textos','ft':'"Open Sans" sans-serif'}];
    
    $scope.fontusage = [];
    if(fontusage)
      $scope.fontusage = fontusage;
  
  $scope.fontusage.push({'fonty':'Open Sans','pk':0,'puntaje':'45','usage':'titulos','texto':'Titulos'},
                        {'fonty':'Open Sans','pk':0,'puntaje':'35','usage':'subtitulos','texto':'Titulos'},
                        {'fonty':'Open Sans','pk':0,'puntaje':'25','usage':'textos','texto':'Textos'});


// GRUPOS

  $scope.addgroup = function(ev){
    ev.preventDefault();
    orden = $scope.groups.length+1;
    newgp = {'name':'Grupo '+orden};
    data = newgp;
    uri = '/cfg/savegroup/';
    $http({'url':uri,method:'GET',params:data}).then(function(response){
      newgp.pk = response.data.ok;
      $scope.groups.push(newgp);

    });



  }

  $scope.saveG = function(g){

    data = g;
    uri = '/cfg/savegroup/';
    $http({'url':uri,method:'GET',params:data}).then(function(response){
      g.editando = false;
    });
  }

  $scope.rmG = function(ev,g){
    ev.preventDefault();
    if(confirm('El Grupo se eliminara, esto podria afectar a lso usuarios asignados a él, ¿Desea Contonuar?')){
      inx = $scope.groups.indexOf(g);
      $scope.groups.splice(inx,1);
      g.rm = 1;
      uri = '/cfg/savegroup/';
      $http({'url':uri,method:'GET',params:g}).then(function(response){
        done = true;
      });
    }
  }




 // USUARIOS
 $scope.cambiapass = false;

  $scope.showMod = function(ev,usuario){
    ev.preventDefault();
    jQuery('#addusuario').modal('show');
    if(usuario){
        $scope.udt = usuario;
        $scope.cambiapass = false;

    }
    else{
      $scope.udt = {};
      $scope.cambiapass = true;
    }
  }



  $scope.cambiandopass = function(){
    if($scope.cambiapass==true){
      $scope.cambiapass = false;
    }
    else{
      $scope.cambiapass = true;

    }

  }


  $scope.showpass = function(){
    if($scope.udt)
        nuevo = true;
    else
      nuevo = false;
    if(nuevo || $scope.cambiapass==1)
      return true;
    else
      return false;
  }

  $scope.saveUser = function(){
    data = {};

    data.username = $scope.udt.usuario;
    data.first_name = $scope.udt.fname;
    data.email = $scope.udt.correo;
    data.pk = $scope.udt.pk;
    data.cambiapass = $scope.cambiapass;
    data.grupo = $scope.udt.grupo;
    data.pass = $scope.udt.pass;
    if($scope.udt){
        data = $.param(data);
        uri = '/cfg/saveusuario/';
          params = {'url':uri,'method':'POST','data':data};
          jQuery('.errx').remove();
          $http(params).then(function(response){

            if(response.data.errs){
              angular.forEach(response.data.errs,function(key,value) {
                jQuery('#id_'+value).after('<div class="errx">'+key+'</div>');
              });

            }
            else{
              if(response.data.nuevo=='1')
                $scope.usuarios.push(response.data.usuario);
              
              jQuery('#addusuario').modal('hide');


            }

          });


    }
  }

  $scope.chpass = function(){

    if($scope.udt){
      if($scope.udt.pk){
        return true;
        $scope.cambiapass = true;
      }
      else{
        return false;
        $scope.cambiapass = false;
      }
    }
    else
        return false;
      $scope.cambiapass = false;
  }


  $scope.rmUs = function(ev,grupo,item){
    ev.preventDefault();
    if(confirm('El usuario se borrara de manera permantente\n ¿Desea continuar?')){
        grupo.splice(inx,1);
        inx = grupo.indexOf(item);
        data = {pk:item.pk};
        data = $.param(data);
        uri = '/cfg/rmusuario/';
        params = {'url':uri,'method':'POST','data':data};
        $http(params).then(function(response){
          done = true;
        });


    }



  }


  $scope.seleccionaUsGrup = function(udt,g){

    if(udt){

      if(udt.grupo==g.pk)
        return true;
      else
        return false;

    }
    else{
      return false;
    }

  }


// CONFIGURACION

  
  $scope.defaulttitulos = $scope.fontusage.filter(function (person) {
      return (person.enuso === true && person.usage=='titulos');
  });


  $scope.defaultextos = $scope.fontusage.filter(function (person) {
      return (person.enuso === true && person.usage=='textos');
  });


  $scope.defaulsubtitulos = $scope.fontusage.filter(function (person) {
      return (person.enuso === true && person.usage=='subtitulos');
  });



  if($scope.defaulttitulos.length>0)
      titulos = {'usag':'titulos','ft':$scope.defaulttitulos[0].fonty,'puntaje':$scope.defaulttitulos[0].puntaje};
  else
      titulos = {'usag':'titulos','ft':'"Open Sans" sans-serif','puntaje':'45'};  

  if($scope.defaultextos.length>0)
      textos = {'usag':'textos','ft':$scope.defaultextos[0].fonty,'puntaje':$scope.defaultextos[0].puntaje}
  else
      textos = {'usag':'textos','ft':'"Open Sans" sans-serif','puntaje':'25'};


  if($scope.defaulsubtitulos.length>0)
      subtitulos = {'usag':'subtitulos','ft':$scope.defaulsubtitulos[0].fonty,'puntaje':$scope.defaulsubtitulos[0].puntaje};
  else
      subtitulos = {'usag':'subtitulos','ft':'"Open Sans" sans-serif','puntaje':'35'}; 


      defaultf = [titulos,subtitulos,textos];



    $scope.fontcats = [{'cat':'Generales',
                        'fslug':'digital',
                        'pk':1,
                        'usages':defaultf
                      }];





    $scope.addFcat = function(ev,elm){
      ev.preventDefault();
      pkorden = $scope.fontcats.length+1;
      newfcat = {'cat':'Nueva Categoría','fslug':'digital','pk':pkorden};
      $scope.fontcats.push(newfcat);
    };


    $scope.fontchange = function(ev,u,fo){
      ev.preventDefault();
      u.ft = fo.fonty;
      var uso =fo.usage;
      crawlers = $scope.fontusage.filter(function (person) {
      return (person.usage==uso);
      });
      angular.forEach(crawlers, function(item,index){
        item['enuso'] = false;
      });
      fo.enuso = true;


    }


    $scope.changesizef = function(ev,u,fontusage){

      crawlers = $scope.fontusage.filter(function (person) {
      return (person.usage==u.usag && person.enuso===true);
      });



      angular.forEach(crawlers, function(item,index){
        item['puntaje'] = u.puntaje;
      });

      $scope.savecfgFonts(ev,u);

    }


    $scope.rmfontusage = function(ev,gp,elm){
      ev.preventDefault();
      inx = gp.indexOf(elm);
      if(inx>-1){
        gp.splice(inx,1);
      }
    }

    $scope.savecfgFonts = function(ev,elem){
      ev.preventDefault();
      uri = '/cfg/fontusage/';
      getParams = $scope.fontusage;
      params = {'url':uri,'method':'GET','params':getParams};
      $http(params).then(function(response){
        done = true;

      });

    }



  $scope.saveGetP = function(postArr,uri){
    data = postArr;
    $scope.on_response = null;
    $http({'url':uri,method:'GET',params:data}).then(function(response){

      postArr.pk = response.data.pk;

    });


    return $scope.on_response;

  }


  $scope.rmvcolor = function(ev,grupo,elemento){
    ev.preventDefault();
    if(confirm('¿Desea eliminar este color?')){

        inxcolor = $scope.colores.indexOf(elemento.cromas.hex);
        $scope.colores.splice(inxcolor,1);
        params = {'pk':elemento.pk};
        $http({'url':'/cfg/rmcolor/',method:'GET',params:params}).then(function(response){
          var deleted = true;
        });

        inx = grupo.indexOf(elemento);
        grupo.splice(inx,1);
        total = grupo.length;
        sectores = 100 / total ;
        valueses = [];
        for(x=0;x<total;x++){
          y = (x + 1) * sectores;
          valueses.push(y);
        }

        angular.forEach(grupo, function(principal){
            principal.w = sectores;
            principal.percente = sectores;
            principal.roundper = Math.round(sectores);
        });

          slid = jQuery('#cromatica');
          slid.slider({'values':valueses,
                       'range':'max',
                       'min':0,
                       'max':100
                   });
    }

  }


  $scope.savecolor = function(ev,params){
    ev.preventDefault();
    done_is = $scope.saveGetP(params,'/cfg/savecolors/');
  }

  /*    -------------------  CRMATICO ------------------    */



      $scope.colores_principales = principales;
      $scope.colores_apoyo = [];
      $scope.typos_principales = [];
      $scope.typos_apoyo = [];
      $scope.colores = setcolores;
      $scope.fondosdecolor = fondos;
      $scope.fondsRejs = rejects; //['#c80000,#5a5959'];


      $scope.colorset = {'principales':principales};


      $scope.opacando = function(fondo,fuente){
        arrgs = fondo+','+fuente;
        inx = $scope.fondsRejs.indexOf(arrgs);
        if(inx<0)
          return false;
        else
          return true;



      }


      $scope.addreject = function(fondo,color){
        arrgs = fondo+','+color;
        inx = $scope.fondsRejs.indexOf(arrgs);
        if(inx<0){
          $scope.fondsRejs.push(arrgs);
        }
        else{
          $scope.fondsRejs.splice(inx,1);
        }
      }


      $scope.saverejects = function(ev,rejects){
        ev.preventDefault();
        params = {'rejects':$scope.fondsRejs};
        $scope.saveGetP(params,'/cfg/saverejects/');
      }

      $scope.validateColors = function(dato){
          if(dato>255 || dato <0 || isNaN(dato))
              return false;
          else
              return true;
      };

      $scope.addRGB = function(ev,r,g,b,whereP){
          ev.preventDefault();
  		    row =  $scope.colorset;
          truR = $scope.validateColors(r);
          truG = $scope.validateColors(g);
          truB = $scope.validateColors(b);


          if(truR && truG & truB){
              jQuery('[name="color"]').val('');
          }
          else{
              alert('El codigo proporcionado no pertenece a un color RGB valido');
              return true;
          }



          solidColor = r+','+ g +','+b;
          rgbColor = 'rgb('+r+', '+g+', '+b+')';
          
          hexcolor = w3color(rgbColor).toHexString();
          inx = $scope.colores.indexOf(hexcolor);
          if(inx<0){
              $scope.colores.push(hexcolor);
          }
          else{
              alert('El color ya fué proporcionado');
              return true;
          }


          rgb = solidColor;
          rgbc = w3color(hexcolor).toRgb();
          hexc = w3color(hexcolor).toHexString();
          hwbc = w3color(hexcolor).toHwb();
          hslc = w3color(hexcolor).toHsl();
          ncols = w3color(hexcolor).toNcolString();

          newitem = {
            'orden':0,
            'cromas':
                    {
                      'rgb':{'color':rgbc,'visible':true},
                      'hex':{'color':hexcolor,'visible':true},
                      'pantone':{'color':'','visible':true},
                      'hwb':{'color':hwbc,'visible':true},
                      'cmyk':{'color':'','visible':true},
                      'hsl':{'color':hslc,'visible':true},
                      'ncols':{'color':ncols,'visible':true}
                    },
            w:0,
            percente:0,
            roundper:0
          };
          
  	    $scope.colorset.principales.push(newitem);
      	agregado = row.principales;
          total = row.principales.length;
          sectores = 100 / total ;
          angular.forEach(row.principales, function(principal){
              principal.w = sectores;
              principal.percente = sectores;
              principal.roundper = Math.round(sectores);
              newitem.w = sectores;
              newitem.percente = sectores;
              newitem.roundper = Math.round(sectores);
         	});
          valueses = [];
          for(x=0;x<total;x++){
            y = (x + 1) * sectores;
            valueses.push(y);
          }


        guardado = $scope.saveGetP(newitem,'/cfg/savecolors/');

          slid = jQuery('#cromatica');
          slid.slider({'values':valueses,
                       'range':'max',
                       'min':0,
                       'max':100,
                       'stop':function(event,ui){
                          valores = ui.values;
                          for(x=0;x<valores.length;x++){
                              if(x==0){
                                  yo = valores[x];
                                  resto = yo;
                                  eldeatras = 0;
                              }
                              else{
                                  yo = valores[x];
                                  eldeatras = valores[x-1];
                                  resto = yo-eldeatras;
                              }


                          	$scope.colorset.principales[x].w = yo;
                          	$scope.colorset.principales[x].percente = resto;
                            $scope.colorset.principales[x].roundper = Math.round(resto);
                          	$scope.$apply();
                            $scope.saveGetP($scope.colorset.principales[x],'/cfg/savecolors/');

                          }



                       }
                   });

      }





});

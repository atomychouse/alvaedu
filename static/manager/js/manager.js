

$(document).ready(function(){

  jQuery('#menusortable').nestedSortable({
      handle: 'div',
      items: 'li:not(.ui-state-disabled)',
      toleranceElement: '> div',
      maxLevels:'2',
      stop:function(event,ui) { 
        brodas = $(ui.item).parent('ol:first').find('.ordermy');
        reorder = [];
        $.each(brodas,function(x,y){
            vax = angular.element(y).scope();
            vax.$apply(function() {
              vax.m.orden = x;
              neworder = {'pk':vax.m.pk,'orden':vax.m.orden};
              reorder.push(neworder);
            });
        });
        console.log(reorder);
        $http = angular.injector(["ng"]).get("$http");

       $http({url:'/admins/reorder/',method:'GET',params:reorder}).then(function(response){
          console.log(response);
        });


      }
  });
});


angular.module("mainApp").directive('justSilder', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var valores = [15,30,50,75];
      currvalue = valores.indexOf(parseInt(scope.datos_sets.items[0].config.img_box_size));
      console.log(currvalue);
      elm.slider({
        min:0,
        max:3,
        value:currvalue,
        stop: function( event, ui ) {
            
            var sizebox = valores[ui.value];

                textsize = 99 - sizebox;
                scope.datos_sets.items[0].config.img_box_size=sizebox;
                scope.datos_sets.items[0].config.text_box_size=textsize;
                scope.$apply();

        }

    

      });

    }
  };

});




myapp.controller('manageCtr',function($scope,$http,shareRows,pathImgCrop,rowAction,$httpParamSerializerJQLike){



$scope.desarma = function(m){
  console.log(m);
  if(m.slug=='color')
      return true;
  else
    return false;
}


$scope.cleanText = function(rawtext){
    texto = rawtext.toString().replace(/"/g, '\\"');
    texto = texto.toString().replace(/'/g, "&prime;");
    texto = texto.toString().replace(/\\n/g, "\\n")
                                  .replace(/\\&/g, "\\&")
                                  .replace(/\\r/g, "\\r")
                                  .replace(/\\t/g, "\\t")
                                  .replace(/\\b/g, "\\b")
                                  .replace(/\\f/g, "\\f");

    return texto;
}




  $scope.gridimgsize = {'w':320,'h':320};
  $scope.editando=false;
  $scope.modulos = shareRows.getR();
  sectionset = {
    pk:1,
    modulos:$scope.modulos
  };

  $scope.modlist = modules;
  $scope.sectionset = sectionset;



  $scope.mascaraedicion = 'mascaraedicion';

  $scope.showTools = function(ev,que){
    ev.preventDefault();
    $scope.editando = que;
    rowsScope = angular.element(jQuery('#renglones')).scope();
    menuScope = angular.element(jQuery('#megamenu')).scope();
    
    rowsScope.editando = que;
    menuScope.editando = que;
    



    if(que==true){
      rowsScope.mascaraedicion = '';
      //jQuery('.rox .row').addClass('managging');
      jQuery('.manage').show();
      jQuery('.preview').show();
    }
    if(que==false){
      rowsScope.mascaraedicion = 'mascaraedicion';
      //jQuery('.rox .row').removeClass('managging');
      jQuery('.preview').hide();
      jQuery('.manage').hide();
    }

  }

  // AGREGAR RENGLONES ______________________________




  $scope.addModule = function(ev,row){
    ev.preventDefault();
    jQuery('#modulesbox').modal('hide');
    jQuery('#saving').modal('show');
    var newrow = new ITM_CONSTRUC();
    var params = {};
    var typo = '/static/modulos/'+row.slug+'.html';
    vax = angular.element(jQuery('#renglones')).scope();

    row_to_add = newrow.getRow(row.slug);
    ordenador = vax.rows.length + 1;
    //ordenador = parseInt(ordenador);
    row_to_add.orden = parseInt(ordenador);
    row_to_add.typo = typo;
    row_to_add.title = row_to_add.slug + '_' + ordenador;
    item_to_add = newrow.getItm(row.slug);    
    
    if(item_to_add){
      row_to_add.items.push(item_to_add);

    }


    if(row.slug=='cromatico' || row.slug=='spaceblank'){

      params = row_to_add;
      csfr = jQuery('[name=csrfmiddlewaretoken]').val();
      params['csrfmiddlewaretoken']=csfr;
      params['secpk']=global_section_pk;
      uri = '/admins/addmodule/';

       $http({url:uri,method:'GET',params:params}).then(function(response){
            row_to_add.pk = response.data.saved;
            if(response.data.itempk)
              item_to_add.pk = response.data.itempk;
            jQuery('#saving').modal('hide');
            vax = angular.element(jQuery('#renglones')).scope();
            vax.rows.push(row_to_add);
            jQuery('#modulesbox').modal('hide');
            //window.location.href = '#/'+row_to_add.slug + '_' + ordenador;
            window.location.href = '#/addmd';
        });

       return true;

    }

    else{
    
    if(item_to_add && item_to_add.descp)
    item_to_add.descp = $scope.cleanText(item_to_add.descp);
    
    if(item_to_add && item_to_add.contenido && row_to_add.slug!='tabla')
    item_to_add.contenido = $scope.cleanText(item_to_add.contenido);


    
    params = row_to_add;
    csfr = jQuery('[name=csrfmiddlewaretoken]').val();
    params['csrfmiddlewaretoken']=csfr;
    params['secpk']=global_section_pk;
    uri = '/admins/addmodule/';

    if(row_to_add.slug=='richtxt'){
      params = $.param(params);      
      $http({url:uri,method:'POST',data:params}).then(function(response){
          row_to_add.pk = response.data.saved;
          if(item_to_add){
            if(response.data.itempk)
              item_to_add.pk = response.data.itempk;
          }
          jQuery('#saving').modal('hide');
          vax = angular.element(jQuery('#renglones')).scope();
          vax.rows.push(row_to_add);
          jQuery('#modulesbox').modal('hide');
          //window.location.href = '#/'+row_to_add.slug + '_' + ordenador;
          window.location.href = '#/addmd';
      });
    }
    else{

     $http({url:uri,method:'GET',params:params}).then(function(response){
          row_to_add.pk = response.data.saved;
          if(item_to_add){
            
            if(response.data.itempk)
              item_to_add.pk = response.data.itempk;
            

          }
          jQuery('#saving').modal('hide');
          vax = angular.element(jQuery('#renglones')).scope();
          vax.rows.push(row_to_add);
          
          //window.location.href = '#/'+row_to_add.slug + '_' + ordenador;
          window.location.href = '#/addmd';
      });

   }


 }

  };


  $scope.onChange=function($dataURI){
   
    pathimg = pathImgCrop.getPath();
    arr = pathimg[0];
    arrKy = pathimg[1];
    targetpath = arr[arrKy]=$dataURI;

  }

  $scope.hidecrop = function(){

      $scope.croparea = false;
      $scope.myImage = false;
      $scope.mediumImage = false;

  }

  $scope.chCfg = function(elemento,que){
    
    r = rowAction.getR();
    r.config[que] = elemento[que];
  }




  $scope.cambiolinea = function(ev,elemento,cual){
      ev.preventDefault();
      elemento.datos.r.config.linea=cual;
  }


  $scope.addCat = function(ev,elemento,whoth){
    ev.preventDefault();
    

    if(whoth=='sub')
      elemento.subcats.push({name:''});
    else
      elemento.push({name:'',subcats:[]});
  }


  $scope.rmcat = function(ev,c,sb,ro){
    ev.preventDefault();
    if(confirm('¿Esta seguro que desea eliminar el registro?')){
      if(ro){
        pk = c.pk;
        inx = ro.allcats.indexOf(c);
        ro.allcats.splice(inx,1);
      }
      if(sb){
        pk = sb.pk;
        inx = c.subcats.indexOf(sb);
        c.subcats.splice(inx,1);
      }

      data = {'pk':pk};
    uri = '/admins/rmcat/';
    $http({url:uri,method:'GET',params:data}).then(function(response){
      var deleted = 1;
          
    });



    }
  };

  $scope.savecat = function(c,sb,rowf){

    data = {};

    data.name = c.name;
    
    if(rowf){
      data.rowpk = rowf.pk;
      data.orden = rowf.allcats.length;
    }
    
    if(c.pk)
      data.pk = c.pk;
    
    if(sb){    
      if(sb.pk)
        data.sbpk = sb.pk;
      data.paren = c.pk;
      data.name = sb.name;
      data.orden = c.subcats.length;
    }


    uri = '/admins/savecat/';

    if(data.name.length<1){
      alert('Debe proporcionar un nombre de Categoría');
      return false;
    }


    $http({url:uri,method:'GET',params:data}).then(function(response){

      if(sb)
        sb.pk = response.data.failed;
      else
        c.pk = response.data.failed;
        
    });


  }

    $scope.resizables = function(ev,el,datos){
      ev.preventDefault();
      datos.color_fondo_anterior = datos.color_fondo;
      datos.image_class = el;
      if(el=='full'){
        $scope.sizes = {w:1024,h:340};
        datos.imagesize=340;
        if(datos.img)
          datos.color_fondo = '';
        else
          datos.color_fondo = '#4c4c4c';

      }
      else if(el=='half'){
        $scope.sizes = {w:1024,h:100};
        datos.imagesize=100;
        if(datos.img)
          datos.color_fondo = '';
        else
          datos.color_fondo = '#4c4c4c';
      }
      else if(el=='none'){
        datos.img = null;
        datos.color_fondo='none';

      }

    }

    $scope.uploadB = function(params,filex,filename){
      jQuery('#saving').modal('show');
      data = {};
      data.slug = params.r.slug;
      data.pk = params.itm.pk;
      data.filex = filex;
      data.filename = filename;
      data = $.param(data);
      var dats = null;



      uri = '/admins/addfile/';
      $http({url:uri,method:'POST',data:data}).then(function(response){                    
        jQuery('#saving').modal('hide');
        filename = response.data.filename;
        pksaved = response.data.failed;

        if(params.r.slug=='banco'){
          only_name = filename.split('.');
        }
        else{
          only_name = filename.split('/');
        }
        
        olyname = only_name[only_name.length-1];
        
        if(olyname=='mp4'){
          
          params.itm.myvideo=filename;

        }
        var newitm = {'pathfile':filename,'filename':olyname,'pk':pksaved};
          params.itm.downs.push(newitm);          

      
      });

    }








  angular.element(jQuery('#loader-file')).on('change',function(e){
    if($(this).val().length<0)
      return false;



    var file=e.currentTarget.files[0];
    var reader = new FileReader();
    var filename = file.name;
    var elemento = shareRows.getRows();
    var $image = $('#image');
    
    switch(elemento.itm.stylus){
      case 'grid':
        aspectRatioDefault = 1.3829787234042554;
      break;
      case 'full':
        aspectRatioDefault = null;
      break;
      case 'fullcolor':
        if(elemento.itm.aspectRatio){
          aspectRatioDefault = elemento.itm.aspectRatio;
        }
        else{
          aspectRatioDefault = null;
        }

      break;

    }
    

    aspect = null;
    var resultado = '';
    reader.onload = function (e) {
      resultado = e.target.result;

      if(elemento.r.slug=='banco'){
        elemento.itm.originalpic = resultado;
      }

      if(elemento.itm.stylus=='assign'){
        //var newitm = {pathfile:'/static/filepath',filename:file.name,pk:1,filecode:''};
        //newitm['filecode']=resultado;
        $scope.uploadB(elemento,resultado,filename);
      }
      else if(elemento.itm.stylus=='tress'){
          jQuery('#saving').modal('show');
                
          var rowscope = angular.element(jQuery('#renglones')).scope();
              rowscope.$apply(function(){
              params = {};
              params.pk = elemento.itm.pk;
              params.orden = elemento.itm.orden;
              params.imagen = resultado.replace(/^data:image\/(png|jpeg);base64,/, "");
              data = $.param(params);
              uri = '/admins/savetress/';
              $http({url:uri,method:'POST',data:data}).then(function(response){                
                    rowscope.elemento_edited.itm.img=response.data.url;
                    rowscope.elemento_edited.itm.tresscero='tresseiscero.html';
                    rowscope.elemento_edited.itm.tresupdateTime=Date.now();
                    jQuery('#saving').modal('hide');
            });
          });
      }

      else{
        $image.cropper('replace',resultado);
        jQuery('.cropprev').show();        
      }

    };

    reader.readAsDataURL(file);


    if(elemento.itm.stylus=='assign' || elemento.itm.stylus=='tress'){
      console.log('cargar archivo');

    }
    else{
          $image.cropper({
              aspectRatio:aspectRatioDefault,
              viewMode:2,
              responsive:true,
              zoomable:false,
              restore:true,
              checkCrossOrigin:true,
              ready: function () {
                croppable = true; 
              },
              crop:function(){
                croppedCanvas = $image.cropper('getCroppedCanvas');
                if(croppedCanvas){
                  var rowscope = angular.element(jQuery('#renglones')).scope();                
                  rowscope.$apply(function(){
                      rowscope.elemento_edited.itm.img=croppedCanvas.toDataURL();
                      rowscope.elemento_edited.itm.img=croppedCanvas.toDataURL();
                  });
                }
              }
          });
          jQuery('#loader-file').val('');
    }


  });








  $scope.saveitem = function(ev,datos){

    ev.preventDefault();
    var datos = datos;
    uri = '/admins/additem/';
    $http({url:uri,method:'GET',params:datos}).then(function(response){
          datos.submodpk = response.data.saved;
    });

  }





  $scope.savesettxt = function(ev,datos){
    ev.preventDefault();
    params = {};
    if(datos.datos.slug=='richtxt'){
      jQuery('#saving').modal('show');

      params.module = datos.datos.slug;
      params.pk = datos.datos.pk;
      params.config = datos.datos.config;
      uri = '/admins/confg/';
      $http({url:uri,method:'GET',params:params}).then(function(response){
      jQuery('#saving').modal('hide');
            
      });
    }

  }

  $scope.savesettgrid = function(ev,datos){
    ev.preventDefault();
    params = {};
    jQuery('#saving').modal('show');

    if(datos.datos.pk){
      params.module = datos.datos.slug;
      params.pk = datos.datos.pk;
      params.config = datos.datos.config;
      uri = '/admins/confg/';
      $http({url:uri,method:'GET',params:params}).then(function(response){
            datos.submodpk = response.data.saved;
            jQuery('#saving').modal('hide');

      });
    }

    //PARA SPACE ______________________________________________________________


    else if(datos.datos.r.slug=='spaceblank'){

      params.module = datos.datos.r.slug;
      params.pk = datos.datos.r.pk;
      params.config = datos.datos.r.config;
      uri = '/admins/confg/';
      $http({url:uri,method:'GET',params:params}).then(function(response){
            datos.submodpk = response.data.saved;
            jQuery('#saving').modal('hide');
      });


    }
    
    //PARA IMGSIDE______________________________________________________________

    else if(datos.datos.r.slug=='sideimg'){

      params.module = datos.datos.r.slug;
      params.pk = datos.datos.itm.pk;
      params.config = datos.datos.itm.config;
      uri = '/admins/confg/';
      $http({url:uri,method:'GET',params:params}).then(function(response){
            datos.submodpk = response.data.saved;
            jQuery('#saving').modal('hide');
      });


    }

    else{
      console.log('aun no hay modulo para guardar configs');
    }

  }



  // PARA BANCO DE IMAGENS

  $scope.addcatbanco = function(mycats,sb){
      inx = mycats.indexOf(sb.pk.toString());
    if(inx<0)
        mycats.push(sb.pk);
    else{
      mycats.splice(inx,1);
    }

  }

  $scope.savecatsbanco = function(ev,banco){
    ev.preventDefault();

      uri = '/admins/savecatbanco/';
      data = {};
      data.pk = banco.pk;
      data.mycats = banco.mycats;

      $http({url:uri,method:'GET',params:data}).then(function(response){
            jQuery('#cfg_banco_itm').hide();
      });



  }


  $scope.hidecatsbanco = function(ev){
    ev.preventDefault();
    jQuery('#cfg_banco_itm').hide();
  }



$scope.faltanmas = function(datos,sb){
  dpk = datos.itm.mycats.indexOf(sb.pk.toString()); // > -1
  if(dpk>-1)
    return true;
  else
    return false;

}

// GUARDAR CONFIGURACION DE TABLA

    $scope.savetabla = function(ev,elemento){
        ev.preventDefault();
        jQuery('#saving').modal('show');
        uri = '/admins/savehtml/';
        params = {
            "pk":elemento.itm.pk,
            "contenido":elemento.itm.contenido,
            "config":elemento.itm.config
        };
        $http({url:uri,method:'GET',params:params}).then(function(response){
            jQuery('#saving').modal('hide');
        });

    }





});
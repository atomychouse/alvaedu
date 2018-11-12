
myapp.service('shareRows', function () {
        var property = 'First';

        return {
            getRows: function () {
                return property;
            },
            getLrows:function(){
              return property.length;
            },
            setRows: function(value) {
                property = value;
            },
            getR:function(){
                return property
            },
            putRow:function(arrs){
                property.push(arrs);
            },
            rmRow:function(indexrow){
                property.splice(indexrow,1);
            }
        };
});



angular.module("mainApp").directive('watchColors', ['$http','$filter',function($scope,$filter,$http) {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        scope.$watch('cp.cromas',function(x,y){
        setcolores = attrs.setcolores;
        inx = setcolores.indexOf(x);
        gscope = angular.element(jQuery(elm)).scope();
        ncro = scope.cp.cromas;
        solidColor = ncro.rgb.r+','+ ncro.rgb.g +','+ncro.rgb.b;
        rgbColor = 'rgb('+solidColor+')';
        hexcolor = w3color(rgbColor).toHexString();


        inx = gscope.setcolores.filter(function (person) {
            return (person.cromas.hex == hexcolor);
        });
        if(inx.length>1){
            alert('El color proporcionado ya figura dentro de la lista.');
            scope.cp.errcolor=true;
        }
        else
        {
            scope.cp.errcolor = false;
        }


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




angular.module("mainApp").directive('watchFlter', ['$http','$filter',function($scope,$filter,$http) {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        scope.$watch('r.catfilts',function(catfil,y){
          pas = 0;
        },true);



    }
  };

}]);




angular.module("mainApp").directive('clickFlter', ['$http','$filter',function($scope,$filter,$http) {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
       
       elm.click(function(e){
          checado = $(elm).is(':checked');
          var pkcat = scope.sb.pk;
          var newcat = {'pk':scope.sb.pk};
          ro = scope.$parent.$parent.$parent.$parent.$parent.r;


          angular.forEach(ro.items,function(v,k){
            v.isvisible = true;
          });


          if(checado){
             ro.catfilts.unshift(newcat); 
          }
          else{
            ro.catfilts.splice(newcat,1);  
          }
        
        angular.forEach(ro.catfilts,function(v,k){

          visibles = ro.items.filter(function (elm) {
            return (elm.isvisible ===true);
          });
           
          var porcategoria = visibles.filter(function(itm){
              
              indice = itm.mycats.indexOf(v.pk);
              if(indice<0)
                itm.isvisible = false;
              return (itm.isvisible === true);
          });      
        });
        scope.$apply();
       });


    }
  };

}]);






angular.module("mainApp").directive('andyDraggable', ['$http',function($http) {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        var itmpk = scope.$parent.itm.pk;
        var pkpapa = '#img-posnotas-'+itmpk;


      var options = scope.$eval(attrs.andyDraggable); //allow options to be passed in
      elm.draggable({
        'containment':pkpapa,
        stop: function(e) {
            scope.$apply(function(){

                boxpk = '#img-posnotas-'+scope.$parent.itm.pk;
                boxposition = jQuery(boxpk).parents('.mybox:first').height()-20;
                boxX = jQuery(boxpk).parents('.mybox:first').width();


                topTarget = e.target.offsetTop * 100/boxposition;
                leftTarget = e.target.offsetLeft * 100 / boxX;
                scope.n.psx = leftTarget; //pst.left;
                scope.n.psy = topTarget; //pst.top;
                data = {};
                data['pk'] = scope.$parent.itm.pk;
                data['notas'] = [scope.$parent.itm.notas];
                uri = '/admins/savenota/';
                $http({'url':uri,method:'GET',params:data}).then(function(response){
                    jQuery('#saving').modal('hide');
                });

            });

        }

      });

    }
  };

}]);

angular.module("mainApp").directive('justDraggable', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      elm.draggable({
        stop: function(e) {
            justdragged = true;
        }
      });

    }
  };

});


angular.module("mainApp").directive('watcherMan', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {

        scope.$watch('itm',function(x){
        },true);

    }
  };

});


angular.module("mainApp").directive('putMark', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        elm.click(function(e){


            
            console.log(e);
        });

    }
  };

});


angular.module("mainApp").directive('watcherVideo', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {

        scope.$watch('itm',function(x){
            console.log(x);
        },true);

    }
  };

});


angular.module("mainApp").directive('horizonSize', function() {

 
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      elm.resizable({
        'handles':'e,w'
      });

    }
  };


});




angular.module("mainApp").directive('myCrom', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        var wpk = scope.$parent.r.pk;
        barRange = [];
        if(scope.$parent.r.barra){
            barra_range = scope.$parent.r.barra;
            for(x=0;x<barra_range.length;x++){
                barRange.push(barra_range[x].w);
            }            
        }
        else{
            barra_range = [];
        }

      elm.slider({
            min:0,
            max:100,
            range:'min',
            values:barRange,
            stop: function( event, ui ) {
                var ro = angular.element(jQuery('#crom-'+wpk)).scope();
                var valor = ui.values[ui.handleIndex];
                muta = scope.$parent.r.barra[ui.handleIndex].w=valor;
                scope.$apply();
            }

      });

    }
  };

});




angular.module('mainApp').directive('slidingMe',function(){

return {
    restrict:'A',
    link:function(scope,elm,attrs){
        valueses = [];
        wsdebarras = [];
        paravalores = scope.r.barra;
        for(x=0;x<paravalores.length;x++){
            valueses.push(paravalores[x].w);
        }
        elm.slider({'values':valueses,
                     'range':'max',
                     'stop':function(event,ui){
                        wsdebarras = [];
                        valores = ui.values;
                        
                        scope.r.barra[ui.handleIndex].w = ui.value;
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
                            wsdebarras.push(resto);
                        }

                        for(x=0;x<wsdebarras.length;x++){
                            scope.r.barra[x].percente = wsdebarras[x];
                        }
                        scope.$apply();

                     }
                 });

    }
}

});


angular.module("mainApp").directive('cropMe', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        elm.cropper({

         zoomable:false,
          ready: function (e) {
            var $clone = $(this).clone().removeClass('cropper-hidden');

            $clone.css({
              display: 'block',
              width: '100%',
              minWidth: 0,
              minHeight: 0,
              maxWidth: 'none',
              maxHeight: 'none'
            });


          },

          crop: function (e) {
            var imageData = $(this).cropper('getImageData');
            var previewAspectRatio = e.width / e.height;
          }


      });
      
     

    }
  };

});


angular.module("mainApp").directive('arcDropzon', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        var options = scope; //allow options to be passed in
        var csfr = jQuery('[name=csrfmiddlewaretoken]').val();




    hazlo = {
        url:'/admins/addbanco/',
        params:{'csrfmiddlewaretoken':csfr},
        accept: function(file, done) {
           done();
        },
        success:function(file,xhr){

            var rib_banco =  {
                'descp':'Legales',
                'orden':0,
                'img':'/static/imgs/defaults/grids.jpg',
                'downs':[],
                cats:[]
            };
            response = jQuery.parseJSON(xhr);
            rib_banco.pk = response.itmpk;
            rib_banco.img = response.url;
            rib_banco.orden = options.r.items.length;
            scope.$apply(function(){
                options.r.items.push(rib_banco);
            });
            

        },
        complete:function(file){
            this.removeFile(file);
        },
        'paramName': "webimage",
         maxFilesize: 800,
         clickable:true

    };


      var dr = elm.dropzone(hazlo);
      //var p = new Dropzone(elm, hazlo);

    }
  };

});



angular.module("mainApp").directive('sliderColors', ['$http',function($scope) {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        var valueses = [];
        var setcolores = scope.$parent.$parent.setcolores;
        angular.forEach(setcolores, function(principal){
          valueses.push(Math.round(principal.w));

        });
        valueses.sort(function(a, b){return a-b});
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
                          setcolores[x].w = yo;
                          setcolores[x].percente = resto;
                          setcolores[x].roundper = Math.round(resto);
                          scope.$apply();
                          scope.saveGetP(event,setcolores[x],'/cfg/savecolors/');
                        }
                     }
                 });
        //var ultimo = elm[0].childNodes.length;
        //jQuery(elm[0].childNodes[ultimo-1]).hide();



    }
  };

}]);

myapp.controller('rowsCtr',function($scope,$http,pathImgCrop,shareRows,rowAction){

    $scope.page_settings = page_settings;
    $scope.fuentes = fuentes;
    $scope.fuentes_css = [];
    $scope.setcolores = setcolores;
    $scope.syscolors = syscolors;
    $scope.cromatico_colores = {r:255,g:255,b:255};
    $scope.ahorale = Date.now();
    $scope.catfilter = [];

    $scope.rejects = rejects;

    $scope.mascaraedicion = 'mascaraedicion';





    // SETTING COLOR FROM HERE

    $scope.setcfgcolor = function(datos_sets,fondo,fuente){
        datos_sets.items[0].config.backcolor = fondo;
        datos_sets.items[0].config.fontcolor = fuente;
        
        }


    $scope.setcfgcolorespacio = function(datos_sets,fondo,fuente){
        console.log(datos_sets);
        datos_sets.config.color_fondo = fondo;
        datos_sets.config.color_linea = fuente;
        
        }



    $scope.setcfgcolorambientes = function(datos_sets,fondo,fuente){
        datos_sets.r.config.backcolor = fondo;
        datos_sets.r.config.fontcolor = fuente;
        
        }

    $scope.setcfgcolornotas = function(datos_sets,fondo,fuente){
        datos_sets.items[0].config.backcolor = fondo;
        datos_sets.items[0].config.fontcolor = fuente;
        
        }



  $scope.saveGetP = function(ev,postArr,uri){
    ev.preventDefault();
    data = postArr;
    $scope.on_response = null;
    $http({'url':uri,method:'GET',params:data}).then(function(response){

      postArr.pk = response.data.pk;

    });


    return $scope.on_response;

  }


    $scope.addcolorsquema = function(ev,typoc,roww){




        ev.preventDefault();
        var r=g=b = 255;
        var solidColor = r+','+ g +','+b;
        var rgbColor = 'rgb('+r+', '+g+', '+b+')';
          hexcolor = w3color(rgbColor).toHexString();
          rgb = solidColor;
          rgbc = w3color(hexcolor).toRgb();
          hexc = w3color(hexcolor).toHexString();
          hwbc = w3color(hexcolor).toHwb();
          hslc = w3color(hexcolor).toHsl();
          ncols = w3color(hexcolor).toNcolString();

        newitem = {
            'orden':0,
            'levelper':typoc,
            'cromas':
              {
                'rgb':rgbc,
                'hex':hexcolor,
                'pantone':'',
                'hwb':hwbc,
                'cmyk':'',
                'hsl':hslc,
                'ncols':ncols
              }
            ,
            w:0,
            percente:0,
            roundper:0,
            'syscolor':false
        };

        cuantos = $scope.setcolores.length+1;
        percente = 100 / cuantos;
        perinnt = Math.round(percente);
        newitem.w = percente;
        newitem.roundper = perinnt;
        newitem.percente = perinnt;
        $scope.setcolores.push(newitem);


        var a = 1;
        valueses = [];
        angular.forEach($scope.setcolores, function(principal){
            principal.w = a * percente;
            principal.percente = percente;
            principal.roundper = perinnt;
            a++;
        });

        for(x=1;x<$scope.setcolores.length+1;x++){
            valore = x * percente;
            valueses.push(valore);
        }
        console.log(valueses);
        inv = jQuery('#cromatica').slider({'values':valueses});



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



      $scope.opacando = function(fondo,fuente){
        arrgs = fondo+','+fuente;
        inx = $scope.rejects.indexOf(arrgs);
        if(inx<0)
          return false;
        else
          return true;



      }

    $scope.addfontfile = function(ev){
        ev.preventDefault();
        jQuery('#addFont').click();
    }

    $scope.addfm = function(ft){


        inx = $scope.datos_sets.itm.fuentes.filter(function (person) {
            return (person.pk == ft.pk );
        });

        if(inx.length>0){
            for(x=0;x<inx.length;x++){
                indice = $scope.datos_sets.itm.fuentes.indexOf(inx[x]);
                $scope.datos_sets.itm.fuentes.splice(indice,1);
            }            
        }
        else{
            ordens = $scope.datos_sets.itm.fuentes.length;
            ft.orden = ordens;
            $scope.datos_sets.itm.fuentes.push(ft);
        }
    }

    $scope.addcattypo = function(ev,r){
      ev.preventDefault();
      newcat = {'categoria':'Categoría',
                'fuentes':[],
                'orden':1
                        };
      orden = r.items.length;
      newcat.orden = orden;
      r.items.push(newcat);
    }


    $scope.addcatcolor = function(ev,r){
      ev.preventDefault();
      newcat = {'categoria':'Categoría',
                'colores':[],
                'orden':1
                        };
      orden = r.items.length;
      newcat.orden = orden;
      r.items.push(newcat);
    }




    $scope.checkfont = function(ft){

        inx = $scope.datos_sets.itm.fuentes.filter(function (person) {
            return (person.pk == ft.pk );
        });
        
        if(inx.length>0)
            return true;
        else
            return false;

    }



    $scope.checkcolor_itm = function(c){


        inx = $scope.datos_sets.itm.colores.filter(function (person) {
            return (person.cromas.hex.color == c.cromas.hex.color );
        });

        
        if(inx.length>0)
            return true;
        else
            return false;

    }


    $scope.chekviscolor = function(who){
        inx = $scope.datos_sets.itm.colores.filter(function (person) {
            return (person.cromas[who].visible == true );
        });

        if(inx.length>0)
            return true;
        else
            return false;

    }


    $scope.disviscolor = function(ev,elemento){
        checkbox_element = jQuery(ev.target);
        if (checkbox_element.is(':checked')){
          chekmark = true;
        }
        else{
          chekmark = false;
        }

        inx = $scope.datos_sets.itm.colores.filter(function (person) {            
            person.cromas[elemento].visible = chekmark;
        });


    }


    $scope.addcolor_to_item = function(c){


        inx = $scope.datos_sets.itm.colores.filter(function (person) {
            return (person.cromas.hex.color == c.cromas.hex.color );
        });


        if(inx.length>0){
                indice = $scope.datos_sets.itm.colores.indexOf(inx);
                $scope.datos_sets.itm.colores.splice(inx,1);
        }
        else{
            ordens = $scope.datos_sets.itm.colores.length;
            c.orden = ordens;
            $scope.datos_sets.itm.colores.push(c);
        }
    }




    $scope.savefitm = function(ev){
        ev.preventDefault();
        getparams = $scope.datos_sets.r.items;
        getparams['mdpk']=$scope.datos_sets.r.pk;
        uri = '/admins/fontusage/';

        params = {'url':uri,'method':'GET','params':getparams};
        $http(params).then(function(response){
            done = true;

        });
        jQuery('#configs').hide();


    }


    $scope.savetypografia = function(ev,r,item){
        ev.preventDefault();
        getparams = item;
        getparams['mdpk']=r.pk;
        uri = '/admins/fontusage/';

        params = {'url':uri,'method':'GET','params':getparams};
        $http(params).then(function(response){
            done = true;

        });
        jQuery('#configs').hide();


    }


    $scope.savecromas = function(ev,r,item){
        ev.preventDefault();
        getparams = item;
        getparams['mdpk']=r.pk;
        uri = '/admins/savecromatico/';

        params = {'url':uri,'method':'GET','params':getparams};
        $http(params).then(function(response){
            done = true;
            item.pk = response.data.ok;

        });
        jQuery('#configs').hide();



    }




/*the new one*/


$scope.estadoEdicion = function(editando){

    if(editando===true)
        return 'pad_edit';
    else
        return 'contendor';

}


$scope.cleanText = function(rawtext){
    if(rawtext){
    texto = rawtext.toString().replace(/"/g, '\\"');
    texto = texto.toString().replace(/'/g, "&prime;");
    texto = texto.toString().replace(/\\n/g, "\\n")
                                  .replace(/\\&/g, "\\&")
                                  .replace(/\\r/g, "\\r")
                                  .replace(/\\t/g, "\\t")
                                  .replace(/\\b/g, "\\b")
                                  .replace(/\\f/g, "\\f");
    }

    else{
        texto = rawtext;
    }

    return texto;
}


    $scope.publicaBox = function(editando,publicado){


        if(editando===false && publicado=='False')
            return true;
        else
            return false;
    }


    $scope.publicarRow = function(ev,r){
        ev.preventDefault();
        jQuery('#saving').modal('show');
        params = {};
        params.rowpk = r.pk;
        uri = '/admins/publicar/';
        $http({url:uri,method:'GET',params:params}).then(function(response){

            angular.forEach(r.items, function(key) {
              key.publicado='True';
            });
            jQuery('#saving').modal('hide');

        });


    }


    $scope.addCatTipografia = function(ev,elm){

      console.log(elm);
      var myItms = new ITM_CONSTRUC();
      myitm = myItms.getItm(elm.slug);
      itemsLength = elm.items.length+1;
      myitm.orden = parseInt(itemsLength);

        ev.preventDefault();
        getparams = myitm;
        getparams['mdpk']=elm.pk;
        uri = '/admins/fontusage/';

        params = {'url':uri,'method':'GET','params':getparams};
        $http(params).then(function(response){
            done = true;
            myitm.pk = response.data.ok;
            elm.items.push(myitm);
        });
        jQuery('#configs').hide();

      

    }

    $scope.addItm = function(ev,row){
        var myItms = new ITM_CONSTRUC();
        myitm = myItms.getItm(row.r.slug);
        itemsLength = row.r.items.length+1;
        myitm.orden = parseInt(itemsLength);


        mainparams = row.r;
        params = myitm;

        if(row.r.slug=='tressesenta')
            uri = '/admins/savetress/';
        else
            uri = '/admins/savegrid/';
        
        params.rowpk = mainparams.pk;
        params.slug = mainparams.slug;
        data = $.param(params);
        $http({url:uri,method:'POST',data:data}).then(function(response){
            myitm.publicado='False';
            if(response.data.webimage)
                myitm.oldimg = '/'+response.data.webimage;
            if(response.data.webimage)
                myitm.img = '/'+response.data.webimage;
            
            myitm.pk = response.data.itmpk;
            jQuery('#saving').modal('hide'); 
            row.r.items.push(myitm);
        });
        myItms = null;
    }


    $scope.rmItm = function(ev,dagroup,victim){
        ev.preventDefault();

        try{
            inx = dagroup.indexOf(victim);
            dagroup.splice(inx,1);

        }
        catch(horror){

            alert(horror);

        }


    }

    $scope.loadImg = function(ev,elemento,stylus){
        ev.preventDefault();

        elemento.itm.stylus = stylus;
        shareRows.setRows(elemento);



        if(elemento.r.slug=='color'){
            colorH = jQuery('#src-color-'+elemento.itm.pk).height();
            colorW = jQuery('#src-color-'+elemento.itm.pk).width();
            aspR = colorW/colorH;
            elemento.itm.aspectRatio = aspR;
        }


        $scope.elemento_edited = elemento;

        if(stylus=='assign' || stylus=='tress' || stylus=='fulls'){
            jQuery('#loader-file').click(); 
        }
        else{
            //console.log(ev);
            posers = jQuery(ev.target).parents('div:first').position();
            ancho = jQuery(ev.target).parents('div:first').height();
            anchowindow = jQuery(window).width();
            izq = (anchowindow/2)-200;
            jQuery('#loader-file').click();
            $croppes = jQuery('.cropprev');
            //console.log(posers);
            //$croppes.css({'top':'35%','left':'30%'});
        }
    }



    $scope.ok_img = function(ev,elem){
        ev.preventDefault();
         jQuery('#saving').modal('show');

         if($scope.elemento_edited.r.slug=='banco'){
            params = {};
            params.imagen = $scope.elemento_edited.itm.img.replace(/^data:image\/(png|jpeg);base64,/, "");
            params.originalpic = $scope.elemento_edited.itm.originalpic.replace(/^data:image\/(png|jpeg);base64,/, "");
            params.csfr = jQuery('[name=csrfmiddlewaretoken]').val();
            params.pk = $scope.elemento_edited.itm.pk;
            data = $.param(params);
            uri = '/admins/addbanco/';
            $http({url:uri,method:'POST',data:data}).then(function(response){
                $scope.elemento_edited.itm.originalpic = null;
                if(response.data.downs){
                     var onlydowns =  eval("(" + response.data.downs + ")");
                     $scope.elemento_edited.itm.onlydowns = [onlydowns];
                }                
                if(response.data.recorte)
                    $scope.elemento_edited.itm.img = response.data.url;
                if(response.data.webimage)
                    $scope.elemento_edited.itm.webimage = response.data.webimage;
                jQuery('#saving').modal('hide');
                jQuery('.cropprev').hide();
                jQuery('#loader-file').val('');
                jQuery('#image').cropper('destroy');
            });
         }
         else{

                params = {};
                params.imagen = $scope.elemento_edited.itm.img.replace(/^data:image\/(png|jpeg);base64,/, "");
                params.csfr = jQuery('[name=csrfmiddlewaretoken]').val();
                params.pk = $scope.elemento_edited.itm.pk;
                params.typ_img = $scope.elemento_edited.r.slug;
                data = $.param(params);
                uri = '/admins/saveimg/';
                $http({url:uri,method:'POST',data:data}).then(function(response){
                    $scope.elemento_edited.itm.img = '/'+response.data.web;
                    $scope.elemento_edited.itm.oldimg = '/'+response.data.web;
                    jQuery('#saving').modal('hide');
                    jQuery('.cropprev').hide();
                    jQuery('#loader-file').val('');
                    jQuery('#image').cropper('destroy');
                });
         }
    }



    $scope.rmImg = function(ev,elemento){
                params = {};
                params.pk = elemento.pk;
                params.csfr = jQuery('[name=csrfmiddlewaretoken]').val();
                data = $.param(params);
                uri = '/admins/rmimg/';
                $http({url:uri,method:'POST',data:data}).then(function(response){
                    elemento.img = '/static/imgs/defaults/imagenrebasada.jpg';
                });

    }


    $scope.xok_img = function(ev,elem){
        ev.preventDefault();
        //jQuery('#image').attr('src','/static/imgs/defaults/grids.jpg');
        jQuery('.cropprev').hide();
        jQuery('#loader-file').val('');
        jQuery('#image').cropper('destroy');
 

    }


    $scope.no_img = function(ev){
        ev.preventDefault();
        $scope.elemento_edited.itm.img = $scope.elemento_edited.itm.oldimg;
        jQuery('.cropprev').hide();
        jQuery('#loader-file').val('');
        jQuery('#image').cropper('destroy');
    }


$scope.saveGrid = function(ev,row){
    ev.preventDefault();
    jQuery('#saving').modal('show');
    mainparams = row.r;
    params = row.itm;

    params.title = $scope.cleanText(params.title);
    params.descp = $scope.cleanText(params.descp);
    params.contenido = $scope.cleanText(params.contenido);

    if(params.img)
        params.imagen = params.img.replace(/^data:image\/(png|jpeg);base64,/, "");
    
    uri = '/admins/savegrid/';
    params.rowpk = mainparams.pk;
    params.slug = mainparams.slug;

    data = $.param(params);
    $http({url:uri,method:'POST',data:data}).then(function(response){
        

        if(response.data.webimage)
            row.itm.oldimg = '/'+response.data.webimage;
        if(response.data.webimage)
            row.itm.img = '/'+response.data.webimage;

        row.itm.pk = response.data.itmpk;
        row.itm.publicado = 'False';
        jQuery('#saving').modal('hide'); 
    });



}


$scope.saveBanco = function(ev,row){
    ev.preventDefault();
    mainparams = row.r;
    params = row.itm;
    params.title = $scope.cleanText(params.descp);
    jQuery('#saving').modal('show');

    if(params.img)
        params.imagen = params.img.replace(/^data:image\/(png|jpeg);base64,/, "");
    if(params.originalpic)
        params.originalpic = params.originalpic.replace(/^data:image\/(png|jpeg);base64,/, "");
    
    uri = '/admins/savebanco/';
    params.rowpk = mainparams.pk;
    params.slug = mainparams.slug;

    data = $.param(params);
    $http({url:uri,method:'POST',data:data}).then(function(response){
        row.itm.pk = response.data.itempk;
        row.itm.originalpic = null;
        if(response.data.downs){
             var onlydowns =  eval("(" + response.data.downs + ")");
             row.itm.onlydowns = [onlydowns];
        }
        

        if(response.data.recorte)
            row.itm.img = response.data.url;

        if(response.data.webimage)
            row.itm.webimage = response.data.webimage;

        jQuery('#saving').modal('hide');

        row.itm.publicado='False';


    });



}



$scope.loadvideokey = function(itm){

    fullUri = itm.urlvideo;
    keyvideo = fullUri.split('=');
    
    if(keyvideo.length>0){
        console.log(keyvideo[1]);
        itm.link = keyvideo[1];
    }

}


/*  asd */


    pasale = $scope;
    $scope.editando = false;
    $scope.rows = modules_loaded;
    shareRows.setRows($scope.rows);
    $scope.cropperit = false;

    $scope.abcs = '0ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    $scope.recortale = function(ev,el){
        ev.preventDefault();
        ro = angular.element(jQuery('#managertools')).scope();
        ro.croparea=true;
        ro.cropmedium=true;
    }

    



    $scope.cambiale = function(ev,elemento,targetimg,stylimg) {
        ev.preventDefault();


        //$("#previewer").cropper('destroy');
        jQuery('#loader-file').val('');

        if(stylimg=='assig' || stylimg=='fulltsc')
            var noshow=true;
        else{    
            $scope.cropperit = true;
            //jQuery('.preview').show();
        }

        

        jQuery('#loader-file').click();
        $scope.elementado = elemento;
        $scope.targetimg = targetimg;
        $scope.stylimg = stylimg;
        pasale = $scope;
        $scope.itemediting = elemento;
        pathImgCrop.setPath([elemento,targetimg]);
        posers = jQuery(ev.target).parents('div:first').position();
        izq = posers.left + 100;
        jQuery('.preview').css({'top':posers.top+'px','left':izq+'px'}).hide();


    };

    $scope.no_img_banco = function(ev,itm){
        ev.preventDefault();
        itm.img = itm.oldimg;
        console.log(itm);
    }

    // REMOVE ITEM 

    $scope.rmme = function(ev,elemento,grupo,victim,cualmodel){
        ev.preventDefault();
        jQuery('#configs').hide();
        jQuery('.preview').hide();
        if(confirm('¿Desea eliminar el elemento?')){
            
            if(victim.pk){
                if(cualmodel=='mod'){
                    params = {'mdpk':victim.pk,'module':elemento.r.slug};
                }
                else if(cualmodel=='dwbanco'){
                    params = {'pk':victim.pk,'module':'dwbanco'};
                    inx = elemento.itm.onlydowns.indexOf(victim);
                    elemento.itm.onlydowns.splice(inx,1);



                }
                else if(cualmodel=='dwgrid'){
                    params = {'pk':victim.pk,'module':'dwgrid'};

                }

                else{
                    params = {'pk':victim.pk,'module':elemento.r.slug};
                }

                params.csfr = jQuery('[name=csrfmiddlewaretoken]').val();
                
                params.mdpk = elemento.r.pk;
                
                data = $.param(params);
                uri = '/admins/rmitem/';
                $http({url:uri,method:'POST',data:data}).then(function(response){                   
                    inx = grupo.indexOf(victim);
                    grupo.splice(inx,1);
                });
            }

            else{
                inx = grupo.indexOf(victim);
                grupo.splice(inx,1);
            }

        }
    }



    $scope.rmmecroma = function(ev,elemento,grupo,victim){


        ev.preventDefault();
        inx = grupo.indexOf(victim);
        inx = grupo.indexOf(victim);
        grupo.splice(inx,1);

        restValues = [];


        angular.forEach(elemento.r.principales, function(principal){
            restValues.push(principal.w);
        });

        angular.forEach(elemento.r.apoyo, function(apoy){
            restValues.push(apoy.w);
        });


        console.log(restValues);

        return false;

        slid = jQuery('#cromatic-'+elemento.r.pk);
        slid.slider({'values':restValues,'range':'max'});



        if(confirm('¿Desea eliminar el elemento?')){
            ev.preventDefault();
            inx = grupo.indexOf(victim);
            grupo.splice(inx,1);


            prics = elemento.r.principales.length;
            apoyos = elemento.r.apoyo.length;
            total = prics + apoyos;
            partes = 100 / total;
            

            for(x=0;x<elemento.r.barra.length;x++){
                if(elemento.r.barra[x].rgb==victim.rgb){
                    elemento.r.barra.splice(x,1);
                }
            }

            values = [];
            for(x=0;x<total;x++){
                y = (x + 1) * partes;
                elemento.r.barra[x].w = y;
                values.push(y);
            }

            slid = jQuery('#cromatic-'+elemento.r.pk);
            slid.slider({'values':values,'range':'max'});


        }
    }





    // AGREGAR NUEVA DESCARGA A MODULO TEXTO E IMAGEN 

    $scope.addDw = function(ev,elemento){
        ev.preventDefault();
        jQuery('#uploaders').click();
        vax = angular.element(jQuery('#uploaders')).scope();
        vax.datossideimg = elemento;
        //elemento.itm.downs.push({pathfile:'/static/filepath',filename:'file.ext',pk:1});
    }


    $scope.addItem = function(ev,elemento){
      ev.preventDefault();
      vax = angular.element(jQuery('#managertools')).scope();
      vax.addItem(ev,elemento);
    }




    $scope.saveRow = function(ev,elemento){
      rowAction.saveR(ev,elemento);
    }


    $scope.editore = function(itm){
        if(itm){
            if(itm.editeded==true)
                return true;
            else
                return false;
        }
        else{
            return false;
        }
    }

    $scope.editadoes = function(elemento){
        elemento.editeded = true;
    }

    $scope.rmItem = function(ev,elemento){
        ev.preventDefault();
        idx = elemento.r.items.indexOf(elemento.itm);
        if(confirm('Se eliminara el elemento, ¿desea continuar?')){
            elemento.r.items.splice(idx,1);
        }
    }

    $scope.cfgR = function(ev,elemento,modal){
        ev.preventDefault();
        r = rowAction.setR(elemento);
        jQuery('#'+modal).show();
        ro = angular.element(jQuery('#'+modal)).scope();
        ro.datos = r;
        jQuery('#'+modal).css({'top':ev.pageY+'px '});
    }


    $scope.cfgTxtImage = function(ev,elemento,modal){

        ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador;
        $scope.configurador = 'configimgside.html';
        $scope.datos_sets = elemento;
        $scope.cambiaside = elemento.items[0].config.img_pos;
        $scope.cambiasize = elemento.items[0].config.img_box_size;


    }



    $scope.addreferencia = function(ev,elemento){
        ev.preventDefault();
        elemento.itm.notas.push({titulo:'Nota',orden:0});
    }



    $scope.coloring = function(colore){
        console.log(colore);
    };



    /* CONFIGURADORES */

    $scope.cfgspace = function(ev,elemento,modal,elements){
        ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador;
        elements.tit = 'Aviso';
        $scope.configurador = 'config_aviso.html';
        $scope.datos_sets = elemento;
        return false;

        ev.preventDefault();
        r = rowAction.setR(elemento);
        jQuery('#'+modal).show();
        ro = angular.element(jQuery('#'+modal)).scope();
        ro.datos = r;
        jQuery('#'+modal).css({'top':ev.pageY+'px '});
    }


   $scope.cfgespacio = function(ev,elemento,modal,elements){
        ev.preventDefault();
        $scope.datos_sets = null;
        $scope.updateTime = Date.now();
        $scope.configurador;
        $scope.configurador = 'config_espacio.html';
        $scope.datos_sets = elemento;
    }


    $scope.cfg_grid = function(ev,elemento,modal,titulo,elements){
        ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador;

        console.log($scope.page_settings);


        if(elemento.r.slug=='video')
            $scope.configurador = 'config_video.html';
        else
            $scope.configurador = 'config_grid.html';

        
        $scope.datos_sets = elemento;
        $scope.datos_sets.tit = titulo;
    }


    $scope.cfgmodal = function(ev,elemento,modalstr,titulo){
        ev.preventDefault();
        console.log(modalstr);
        $scope.updateTime = Date.now();
        $scope.configurador = modalstr+'.html';
        $scope.datos_sets = elemento;
        $scope.datos_sets.tit = titulo;
    }





    $scope.cfg_croma = function(ev,elemento,modal,titulo){
        ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador = 'config_cromatico.html';
        
        $scope.datos_sets = elemento;
    }

    $scope.cfg_color = function(ev,elemento,modal,titulo){
        ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador = 'config_color.html';
        
        $scope.datos_sets = elemento;
    }


    $scope.cfg_imagenrebasada = function(ev,elemento,modal,titulo){
        ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador;
        $scope.configurador = 'config_imagenrebasada.html';
        $scope.datos_sets = elemento;
        

    }



   $scope.cfg_tress = function(ev,elemento){
        ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador = 'config_tress.html';
        $scope.datos_sets = elemento;
    }



   $scope.cfg_ambientes = function(ev,elemento){
        ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador = 'config_ambientes.html';
        $scope.datos_sets = elemento;
    }



    $scope.colserr = function(){
        jQuery('#configs').hide();        
    }


    $scope.loadcfg = function(ev){
        jQuery('#configs').show();
        scroller = $(document).scrollTop()+'px';
        jQuery('.boxy').css({'top':scroller});

    }

    $scope.PSV = null;

    $scope.cargando = function(elemento){
        if(elemento.img.indexOf('imagenrebasada.jpg')<0){
            var tsc_pk = elemento.pk;
            jQuery('#paraque-'+tsc_pk).html('');
            var panorama = elemento.img;
                var div = document.getElementById('paraque-'+tsc_pk);

                  $scope.PSV = new PhotoSphereViewer({
                      panorama: panorama,
                      container: div,
                      time_anim: 3000,
                      mousewheel:false,
                      markers:[],
                      caption:'',
                      navbar:['autorotate','zoom'],
                      navbar_style: {
                        backgroundColor: 'rgba(58, 67, 77, 0.7)',
                      },
                    });
        }
        else{
          elemento.tresscero = false;
        }
    }



    $scope.cargando_ambiente = function(elemento,r){
        color = r.config.fontcolor;
        if(elemento.img.indexOf('imagenrebasada.jpg')<0){
            var tsc_pk = elemento.pk;
            jQuery('#paraque-'+tsc_pk).html('');
            var panorama = elemento.img;
                var div = document.getElementById('paraque-'+tsc_pk);

                    markers = [];
                    angular.forEach(elemento.markas, function(mk){
                        
                        marka = {
                        id:mk.pk,
                        longitude: mk.longt,
                        latitude: mk.lat,
                        html:'<span class="redondeo">'+mk.orden+'</span>',
                        svgStyle:{fill:color},
                        anchor: 'bottom center',
                        tooltip: mk.tooltip,
                        data: {
                          generated: true
                        }
                      };

                      markers.push(marka);
                        //$scope.PSV.addMarker(marka);


                    });


                  $scope.PSV = new PhotoSphereViewer({
                      panorama: panorama,
                      container: div,
                      time_anim: 3000,
                      mousewheel:false,
                      markers:markers,
                      caption:'',
                      navbar:['autorotate','zoom'],
                      navbar_style: {
                        backgroundColor: 'rgba(58, 67, 77, 0.7)',
                      },
                    });

                    $scope.PSV.on('click', function(e) {

                        if($scope.editando){
                            pku = elemento.markas.length+1;
                            newarr = {pk:'newmk'+pku,'tooltip':'texto aquí','lat':e.latitude,longt:e.longitude};
                            vax = angular.element(div).scope();
                            orden = elemento.markas.length+1;
                            newarr.orden = orden;
                            vax.$apply(function(){
                                elemento.markas.push(newarr);
                                $scope.chmk(newarr);
                            });
                        }

                    });
                    
        }
    }



    $scope.chmk = function(mk){
            //ev.preventDefault();
                     //
                      $scope.PSV.addMarker({
                        id:mk.pk,
                        longitude: mk.longt,
                        latitude: mk.lat,
                        html:'<span class="redondeo">'+mk.orden+'</span>',
                        anchor: 'bottom center',
                        tooltip: mk.tooltip,
                        data: {
                          generated: true
                        }
                      });

    }

    $scope.onsee = function(m){
        console.log('max');
        $scope.PSV.gotoMarker(m.pk,100);
    }


    $scope.upMarka = function(mk,itm){        
        $scope.PSV.updateMarker({id:mk.pk,tooltip:mk.tooltip});
            data = {};
            data['pk'] = itm.pk;
            data['markas'] = [itm.markas];
            uri = '/admins/savenmarkas/';
            $http({'url':uri,method:'GET',params:data}).then(function(response){
                jQuery('#saving').modal('hide');
            });
     
    }

    $scope.rmMarka = function(ev,m,itm){
        data = {};
        ev.preventDefault();
        inx = itm.markas.indexOf(m);
        itm.markas.splice(inx,1);
        $scope.PSV.removeMarker(m.pk);
        data['pk'] = itm.pk;
        data['markas'] = [itm.markas];
        uri = '/admins/savenmarkas/';
        $http({'url':uri,method:'GET',params:data}).then(function(response){
            jQuery('#saving').modal('hide');
        });


    }


    $scope.cfg_nota = function(ev,elemento,modal,titulo,elements){
        ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador;
        $scope.configurador = 'config_notas.html';
        $scope.datos_sets = elemento;
    }




    $scope.cfg_aviso = function(ev,elemento,modal,titulo){
        ev.preventDefault();
        r = rowAction.setR(elemento);
        jQuery('#'+modal).show();
        ro = angular.element(jQuery('#'+modal)).scope();
        ro.datos = r;
        ro.datos.tit = titulo;
        jQuery('#'+modal).css({'top':ev.pageY+'px '});
    }


 

     $scope.cfg_banco = function(ev,elemento,modal){
        ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador;
        $scope.configurador = 'config_banco.html';
        $scope.datos_sets = elemento;
        return false;
    };
   

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

      console.log(ro);
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


  };


     $scope.cfg_banco_itm = function(ev,elemento,modal,titulo){


       ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador;
        $scope.datos = elemento;
        $scope.datos.tit = titulo;
        $scope.configurador = 'config_banco_itm.html?ahora='+Date.now();

    };



     $scope.cfg_tabla = function(ev,elemento,modal){

        ev.preventDefault();
        $scope.updateTime = Date.now();
        $scope.configurador;
        $scope.configurador = 'config_tabla.html';
        $scope.datos_sets = elemento;
        $scope.datos_sets.rows_tool = elemento.items[0].contenido.rows.length;
        $scope.datos_sets.cols_tool = elemento.items[0].contenido.rows[0].cols.length;

    }



  $scope.save_bcard = function(ev,elemento){
    ev.preventDefault();
    elemento.pathimage = null;
    params = {'nombre':elemento.nombre,'cargo':elemento.cargo};
    uri = '/bscard/';
    $http({url:uri,method:'GET',params:params}).then(function(response){
        console.log(response.data);
        elemento.pathimage = '/static/imgs/defaults/newbiscard.png?p=asda';
    });
    
  }



// BACKENDS

  $scope.saveitem = function(ev,datos){

    ev.preventDefault();
    jQuery('#saving').modal('show');
    var datos = datos;
    uri = '/admins/additem/';
    $http({url:uri,method:'GET',params:datos}).then(function(response){
          datos.submodpk = response.data.saved;
         jQuery('#saving').modal('hide');
         jQuery('#configs').hide();

    });

  }


  $scope.updatecfgcromas = function(ev,datos){

    ev.preventDefault();
    jQuery('#saving').modal('show');
    var datos = datos;
    var data = {'pk':datos.r.pk,'cfg':datos.r.config};
    uri = '/admins/updatecfg/';
    $http({url:uri,method:'GET',params:data}).then(function(response){
          datos.submodpk = response.data.saved;
         jQuery('#saving').modal('hide');
         jQuery('#configs').hide();

    });

  }






  $scope.savesettgrid = function(ev){
    ev.preventDefault();
    params = {};
    jQuery('#saving').modal('show');
  
      params.module = $scope.datos_sets.slug;
      params.pk = $scope.datos_sets.items[0].pk;
      params.config = $scope.datos_sets.items[0].config;
      uri = '/admins/confg/';
      $http({url:uri,method:'GET',params:params}).then(function(response){
            $scope.datos_sets.submodpk = response.data.saved;
            jQuery('#saving').modal('hide');
            jQuery('#configs').hide();
      });

    }


    $scope.saveimagenrebasada = function(ev,itm,elemento){
        $scope.cropperit = false;
        jQuery('#saving').modal('show');
        ev.preventDefault();
        var params = itm;        
        params.imagen = params.img.replace(/^data:image\/(png|jpeg);base64,/, "");
        params.csfr = jQuery('[name=csrfmiddlewaretoken]').val();
        params.mdpk = elemento.r.pk;
        data = $.param(params);
        data.img = null;
        uri = '/admins/savegrid/';
        $http({url:uri,method:'POST',data:data}).then(function(response){
            itm.pk = response.data.saved;
            jQuery('#saving').modal('hide');
           
        });
        $("#previewer").cropper("destroy");

    }



    $scope.savetress = function(ev,itm,elemento){
        jQuery('#saving').modal('show');
        ev.preventDefault();
        var params = itm;
        
        if(params.img){
            params.imagen = params.img.replace(/^data:image\/(png|jpeg);base64,/, "");
        }

        params.csfr = jQuery('[name=csrfmiddlewaretoken]').val();
        params.mdpk = elemento.r.pk;

        data = $.param(params);
        data.img = null;
        uri = '/admins/savetress/';
        $http({url:uri,method:'POST',data:data}).then(function(response){
            itm.pk = response.data.itmpk;
            jQuery('#saving').modal('hide');

        });

    }


    $scope.savebanc = function(ev,itm,elemento){
        jQuery('#saving').modal('show');
        ev.preventDefault();
        var params = itm;
        if(params.originalpic){
            params.originalpic = params.originalpic.replace(/^data:image\/(png|jpeg);base64,/, "");
        }
        if(params.img){
            params.imagen = params.img.replace(/^data:image\/(png|jpeg);base64,/, "");
        }


    texto = params.descp.toString().replace(/"/g, '\\"');
    texto = texto.toString().replace(/'/g, "&prime;");
    texto = texto.replace(/[\n]/g, '\\n');
    texto = texto.replace(/\\n/g, "\\n")
                                  .replace(/\\'/g, "\\'")
                                  .replace(/\\"/g, '\\"')
                                  .replace(/\\&/g, "\\&")
                                  .replace(/\\r/g, "\\r")
                                  .replace(/\\t/g, "\\t")
                                  .replace(/\\b/g, "\\b")
                                  .replace(/\\f/g, "\\f");



        titulo = params.title.toString().replace(/"/g, '\\"');
        titulo = titulo.toString().replace(/'/g, "&prime;");
        titulo = titulo.replace(/[\n]/g, '\\n');
        titulo = titulo.replace(/\\n/g, "\\n")
                                      .replace(/\\'/g, "\\'")
                                      .replace(/\\"/g, '\\"')
                                      .replace(/\\&/g, "\\&")
                                      .replace(/\\r/g, "\\r")
                                      .replace(/\\t/g, "\\t")
                                      .replace(/\\b/g, "\\b")
                                      .replace(/\\f/g, "\\f");



        params.descp = texto;
        params.title = titulo;
        params.csfr = jQuery('[name=csrfmiddlewaretoken]').val();
        params.rowpk = elemento.r.pk;
        params.pk = itm.pk;
        data = $.param(params);
        data.img = null;
        uri = '/admins/savebanco/';
        $http({url:uri,method:'POST',data:data}).then(function(response){
            jQuery('#saving').modal('hide');
            itm.webimage = response.data.webimage;
        });

    }




    $scope.savevideo = function(ev,itm,elemento){
        jQuery('#saving').modal('show');
        ev.preventDefault();
        var params = itm;        
        params.csfr = jQuery('[name=csrfmiddlewaretoken]').val();
        params.mdpk = elemento.r.pk;
        data = $.param(params);
        data.img = null;
        uri = '/admins/savevideo/';
        $http({url:uri,method:'POST',data:data}).then(function(response){
            itm.pk = response.data.saved;
            jQuery('#saving').modal('hide');
        });

    }



    $scope.saveaviso = function(ev,itm,elemento){
        jQuery('#saving').modal('show');
        ev.preventDefault();
        var params = itm;  

        params.contenido = $scope.cleanText(itm.contenido);      
        params.csfr = jQuery('[name=csrfmiddlewaretoken]').val();
        params.mdpk = elemento.r.pk;
        data = $.param(params);
        data.img = null;
        uri = '/admins/saveaviso/';
        $http({url:uri,method:'POST',data:data}).then(function(response){
            itm.pk = response.data.saved;
            jQuery('#saving').modal('hide');
        });

    }




    $scope.savehtml = function(ev,elemento){
        ev.preventDefault();
        jQuery('#saving').modal('show');

        if(elemento.itm.contenido)
            texto = elemento.itm.contenido;
        else
            texto = ''

   texto = texto.toString().replace(/"/g, '\\"');
   texto = texto.toString().replace(/'/g, "&prime;");
    texto = texto.replace(/[\n]/g, '\\n');
    texto = texto.replace(/\\n/g, "\\n")
                                  .replace(/\\'/g, "\\'")
                                  .replace(/\\"/g, '\\"')
                                  .replace(/\\&/g, "\\&")
                                  .replace(/\\r/g, "\\r")
                                  .replace(/\\t/g, "\\t")
                                  .replace(/\\b/g, "\\b")
                                  .replace(/\\f/g, "\\f");

        params = {'pk':elemento.r.pk,'contenido':texto}
        data = $.param(params);
        uri = '/admins/savehtml/';
        $http({url:uri,method:'POST',data:data}).then(function(response){
            jQuery('#saving').modal('hide');
            elemento.itm.publicado='False';
        });

    }

    $scope.savetabla = function(ev,elemento){
        ev.preventDefault();
        jQuery('#saving').modal('show');
        uri = '/admins/savehtml/';
        params = {
            "pk":elemento.items[0].pk,
            "contenido":elemento.items[0].contenido,
            "config":elemento.items[0].config
        };
        $http({url:uri,method:'GET',params:params}).then(function(response){
            jQuery('#saving').modal('hide');
                jQuery('#saving').modal('hide');
                jQuery('#configs').hide();
                elemento.items[0].publicado='False';

        });

    }

    $scope.savenota = function(ev,itm,elemento,actions){


        var params = itm;
        var cropcanvas = jQuery('#previewer').cropper('getCroppedCanvas');

        if(actions=='saver'){
        ev.preventDefault();
            jQuery('#saving').modal('show');

            /*            
            if(cropcanvas){
                croppng = cropcanvas.toDataURL("image/png");
                params.imagen = croppng.replace(/^data:image\/(png|jpeg);base64,/, "");
                console.log('as');
                return false;
            }
            */


            params.csfr = jQuery('[name=csrfmiddlewaretoken]').val();
            params.mdpk = elemento.r.pk;
            data = $.param(params);
            data.img = null;

            uri = '/admins/savenota/';
            $http({'url':uri,'method':'POST',data:data}).then(function(response){
                itm.pk = response.data.itmpk;
                jQuery('#saving').modal('hide');
            });
        }

        if(actions=='settnotas'){
        ev.preventDefault();
            jQuery('#saving').modal('show');
            data = {};
            data['pk'] = $scope.datos_sets.items[0].pk;
            data['notas'] = [$scope.datos_sets.items[0].notas];
            data['config'] = $scope.datos_sets.items[0].config;
            uri = '/admins/savenota/';
            $http({'url':uri,method:'GET',params:data}).then(function(response){
                jQuery('#saving').modal('hide');
                jQuery('#configs').hide();

            });

        }
        if(actions=="addnota"){
            ev.preventDefault();
            leftel = ev.target.offsetLeft; //pst.left;
            topel = ev.target.offsetTop; //pst.top;
            pkpos = jQuery('#img-posnotas-'+itm.pk).parent('.mybox:first').position();
            ancho = jQuery('#img-posnotas-'+itm.pk).parent('.mybox:first').width()/2;
            heightimg = jQuery('#img-posnotas-'+itm.pk).height();
            pices = topel-heightimg;
            positionn = (heightimg/2)-pices;
            jQuery('#saving').modal('show');
            orden = elemento.itm.notas.length+1;

            positionn = 50;
            ancho = 10;
            
            elemento.itm.notas.push({'titulo':'','orden':orden,'psy':positionn,'psx':ancho});
            jQuery('#saving').modal('hide');
        }

        if(actions=="keysavenota"){
                data = {};
                data['pk'] = itm.pk;
                data['notas'] = [elemento.itm.notas];
                uri = '/admins/savenota/';
                $http({'url':uri,method:'GET',params:data}).then(function(response){
                    jQuery('#saving').modal('hide');
                });
            

        }


        if(actions=="savenota"){
        ev.preventDefault();
            jQuery('#saving').modal('show');
            data = {};
            data['pk'] = itm.pk;
            data['notas'] = [elemento.item.notas];
            uri = '/admins/savenota/';
            $http({'url':uri,method:'GET',params:data}).then(function(response){
                jQuery('#saving').modal('hide');
            });
        }

        if(actions=="rmnota"){
            //itm es la nota
            //elemento es el arroglo completo , entonces
        ev.preventDefault();
            jQuery('#saving').modal('show');
            inx = elemento.itm.notas.indexOf(itm);
            elemento.itm.notas.splice(inx,1);
            data = {};
            data['pk'] = elemento.itm.pk;
            data['notas'] = [elemento.itm.notas];
            uri = '/admins/savenota/';
            $http({'url':uri,method:'GET','params':data}).then(function(response){
                jQuery('#saving').modal('hide');
            });
        }



    };


    //savers--------------

    $scope.savesetts = function(ev){
        ev.preventDefault();
        params = {};
        datos = $scope.datos_sets;
        console.log(datos);

        if(datos.itm.pk){
          params.module = datos.r.slug;
          params.pk = datos.itm.pk;
          params.config = datos.itm.config;
          params.rowpk = datos.r.pk;
          jQuery('#saving').modal('show');
          uri = '/admins/confg/';
          $http({url:uri,method:'GET',params:params}).then(function(response){
                //datos.r.submodpk = response.data.saved;
                jQuery('#saving').modal('hide');
                jQuery('#configs').hide();
          });
        }
        else{
          console.log('aun no hay modulo para guardar configs');
        }
  }



  $scope.savesettsimglg = function(ev){
        ev.preventDefault();
        params = {};
        datos = $scope.datos_sets;

        if(datos.items[0].pk){
          params.module = datos.slug;
          params.pk = datos.items[0].pk;
          params.config = datos.items[0].config;
          params.rowpk = datos.pk;
          jQuery('#saving').modal('show');
          uri = '/admins/confg/';
          $http({url:uri,method:'GET',params:params}).then(function(response){
                //datos.r.submodpk = response.data.saved;
                jQuery('#saving').modal('hide');
                jQuery('#configs').hide();
          });
        }
        else{
          console.log('aun no hay modulo para guardar configs');
        }
  }





    $scope.savesettsaviso = function(ev){
        ev.preventDefault();
        params = {};
        datos = $scope.datos_sets;

        if(datos.items[0].pk){
          params.module = datos.slug;
          params.pk = datos.items[0].pk;
          params.config = datos.items[0].config;
          params.rowpk = datos.pk;
          jQuery('#saving').modal('show');
          uri = '/admins/confg/';
          $http({url:uri,method:'GET',params:params}).then(function(response){
                //datos.r.submodpk = response.data.saved;
                jQuery('#saving').modal('hide');
                jQuery('#configs').hide();
          });
        }
        else{
          console.log('aun no hay modulo para guardar configs');
        }
  }



    $scope.save_row_setts = function(ev){
        ev.preventDefault();
        params = {};
        datos = $scope.datos_sets;

        if(datos.r.pk){
          params.module = datos.r.slug;
          params.pk = datos.r.pk;
          params.config = datos.r.config;
          jQuery('#saving').modal('show');
          uri = '/admins/confg/';
          $http({url:uri,method:'GET',params:params}).then(function(response){
                //datos.r.submodpk = response.data.saved;
                jQuery('#saving').modal('hide');
                jQuery('#configs').hide();
          });
        }
        else{
          console.log('aun no hay modulo para guardar configs');
        }
  }







    $scope.savecfggrids = function(ev){
        ev.preventDefault();
        params = {};
        datos = $scope.datos_sets;
        if(datos.r.pk){
          params.module = datos.r.slug;
          params.pk = datos.r.pk;
          params.config = datos.r.config;
          jQuery('#saving').modal('show');
          uri = '/admins/confg/';
          $http({url:uri,method:'GET',params:params}).then(function(response){
                //datos.r.submodpk = response.data.saved;
                jQuery('#saving').modal('hide');
                jQuery('#configs').hide();
          });
        }
        else{
          console.log('aun no hay modulo para guardar configs');
        }
    }






    $scope.savecfgspace = function(ev){
        ev.preventDefault();
        params = {};
        datos = $scope.datos_sets;
        if(datos.pk){
          params.module = datos.slug;
          params.pk = datos.pk;
          params.config = datos.config;
          jQuery('#saving').modal('show');
          uri = '/admins/confg/';
          $http({url:uri,method:'GET',params:params}).then(function(response){
                //datos.r.submodpk = response.data.saved;
                jQuery('#saving').modal('hide');
                jQuery('#configs').hide();
          });
        }
        else{
          console.log('aun no hay modulo para guardar configs');
        }
    }





  $scope.showMod = function(ev,elemento){
    jQuery('#grande').attr('src','/cargando');
    jQuery('#bancomodal').modal('show');
    jQuery('#grande').attr('src',elemento.itm.webimage);
    jQuery('#legales').html(elemento.itm.descp);
    jQuery('#descargaslinks').html(jQuery('#doms-link-'+elemento.itm.pk).html());
  }



/*  FOR TABLE MANAGEMENT */

    $scope.manageRows = function(num) {

        numrows = num.rows_tool;
        numcols = num.cols_tool;
        cur_rows = num.items[0].contenido.rows;

        num.items[0].contenido.rows = [];
        
        for(x=0;x<numrows;x++){

          newcols = [];
          for(c=0;c<numcols;c++){
            newcols.push({'texto':'col '+c});
          }


          if(cur_rows[x]){
            for(cc=0;cc<numcols;cc++){
              if(cur_rows[x].cols[cc])
              newcols[cc]={'texto':cur_rows[x].cols[cc].texto};
            }

          }
          num.items[0].contenido.rows.push({cols:newcols});
        }

    }


  $scope.manageCols = function(num){
        numrows = num.rows_tool;
        numcols = num.cols_tool;
        cur_rows = num.items[0].contenido.rows;
        for(r=0;r<cur_rows.length;r++){

          newcols = [];
          for(c=0;c<numcols;c++){
            if(cur_rows[r].cols[c])
              valorcol = {'texto':cur_rows[r].cols[c].texto};
            else
              valorcol = {'texto':'col ' + (c+1)};

              newcols.push(valorcol);
          }

          cur_rows[r].cols = newcols;

        }          

  }



  $scope.playme = function(ev,elemento){
    ev.preventDefault();
    videopk = elemento.itm.link;
    jQuery('#playermodal').modal('show');
    player.loadVideoById(videopk);

  }



/*
    CROMATICO
*/


  $scope.colores = [];
  $scope.validateColors = function(dato){
      if(dato>255 || dato <0 || isNaN(dato))
          return false;
      else
          return true;
  };




  $scope.saveGetP = function(postArr,uri){
    data = postArr;
    $scope.on_response = null;
    $http({'url':uri,method:'GET',params:data}).then(function(response){

      postArr.pk = response.data.pk;

    });


    return $scope.on_response;

  }


  $scope.addRGB = function(ev){
      ev.preventDefault();
      row =  $scope.colorset;
      r = $scope.cromatico_colores.r;
      g = $scope.cromatico_colores.g;
      b = $scope.cromatico_colores.b;
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
          }
        ,
        w:0,
        percente:0,
        roundper:0,
      };

      $scope.setcolores.push(newitem);
       guardado = $scope.saveGetP(newitem,'/cfg/savecolors/');

}



    $scope.editTR = function(ev,r){
        ev.preventDefault();
        r.editandoT = true;
        $scope.$apply();
        console.log('asasd');


    }

    $scope.saveT = function(ev,r){
        ev.preventDefault();
        jQuery('#saving').modal('show');
        params = {};
        
            r.editandoT = false;
            data = {};
            data['pk'] = r.pk;
            data['t'] = r.title;
            uri = '/admins/savert/';
            $http({'url':uri,method:'GET',params:data}).then(function(response){
                jQuery('#saving').modal('hide');
            });
        


    }


    $scope.saveTy = function(elm){
      elm.edtr = false;
      data = {'tit':elm.font_title,'pk':elm.pk,'catname':elm.catname};
      console.log(data);
    }





    // PARA BANCO DE IMAGENS

    $scope.addcatbanco = function(mycats,sb){
        newcat = sb.pk;
        inx = mycats.indexOf(sb.pk);
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
              jQuery('#configs').hide();
        });



    }


    $scope.hidecatsbanco = function(ev){
      ev.preventDefault();
      jQuery('#cfg_banco_itm').hide();
    }



  $scope.faltanmas = function(datos,sb){
        inx = datos.itm.mycats.indexOf(sb.pk);
    if(inx>-1)
      return true;
    else
      return false;

  }


  $scope.cambiovideo = function(elemento){
    console.log(elemento.myvideo);
    jsplayer.src({ type: "video/mp4", src:'/'+elemento.myvideo});
    jQuery('#legalesvideo').html(elemento.descp);
    jQuery('#descargaslinksvideo').html(jQuery('#doms-link-'+elemento.pk).html());




  }


  $scope.esvideoeste = function(elemento){

    if(elemento.isvideo=='1')
      return true;
    else
      return false;

  }



$scope.filtrads = function(ro,mycats){

return function(e) {

    inx = e.mycats.filter(function (person) {
          return (person.pk == 86);
        });

  return inx;
}

     

}


});





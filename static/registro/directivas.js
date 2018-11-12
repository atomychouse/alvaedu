angular.module("mainApp").directive('launchFoto', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        elm.click(function(e){
            jQuery('#uploader').click();
        });

    }
  };

});





angular.module("mainApp").directive('changeColormenu', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        elm.click(function(e){
            co = scope.co;
            settings = scope.$parent.page_settings;
            colorsite = {'bk':co.backcolor,'fcolor':co.fcolor};
            settings['colorsite']=colorsite;
            
            scope.$parent.save_colorsite();
            scope.ahorale = Date.now();
            location.reload();

        });

    }
  };

});


angular.module("mainApp").directive('launchFile', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        elm.click(function(e){
            jQuery('#upload-file').click();
            scope.fontfile.unshift(scope.fg);
            scope.$apply();
        });


    }
  };

});






angular.module("mainApp").directive('uploadFoto', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        elm.change(function(e){
            
            var file=e.currentTarget.files[0];
            var reader = new FileReader();
            var filename = file.name;

            reader.onload = function (e) {
              resultado = e.target.result;
              scope.imgbrand = resultado;
              scope.$apply();
              $('#imgbrand').attr('src',scope.imgbrand);
            };
            reader.readAsDataURL(file);
        });

    }
  };

});



angular.module("mainApp").directive('uploadFile', ['$http',function($http) {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        elm.change(function(e){
            
            var file=e.currentTarget.files[0];
            var reader = new FileReader();
            var filename = file.name;
            var extention = filename.split('.');
            var data = {};
            var extn = extention[extention.length-1];
            
            
            reader.onload = function (e) {
              resultado = e.target.result;
              scope.fontfile[0].fuente = extention[0];
              data = {
                  'fuente_name':extention[0],
                  'fuente_file':resultado,
                  'fuente_fname':filename,
                  'funete_usage':scope.fontfile[0].usage
              };

              data = $.param(data);
              scope.data = data;
              params = {'url':'/registro/addfont/','method':'POST','data':scope.data};
              
              $http(params).then(function(response){
                scope.ahorale = Date.now();
                console.log(scope);                  
              });

              

            };
            reader.readAsDataURL(file);
            scope.fontfile.splice(1);
            scope.$apply();


        });

    }
  };

}]);




angular.module("mainApp").directive('sendData', ['$http',function($http) {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        elm.submit(function(e){

          jQuery('.errform').remove();
            elemento = e.target;
            uri = jQuery(elemento).attr('action');
            data = jQuery(elemento).serializeArray();
            data.push({'name':'imagen','value':scope.imgbrand.replace(/^data:image\/(png|jpeg);base64,/, "")});
            data = data = $.param(data);
            $http({'url':uri,method:'POST',data:data}).then(function(response){
                
                if(response.data.errors){
                     angular.forEach(response.data.errors,function(vaue,key){
                        jQuery('#id_'+key).after('<div class="errform">'+vaue+'</div>');
                    });
                }
                else{
                  jQuery('#id_pk').val(response.data.saved);
                  scope.userprofile['ok'] = response.data.saved;
                  scope.userprofile['domain'] = response.data.domain;
                  scope.userprofile['path'] = response.data.path;
                  scope.paso++;
                  scope.pasosvalidos.unshift(1);
                  scope.$apply();
                }
            });

            return false;
        });

    }
  };

}]);



angular.module("mainApp").directive('watchColorcombination', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {

        scope.$watch('page_settings.colores',function(x){
          scope.combinations = [];
          angular.forEach(scope.defaultcolors, function(backs){
            angular.forEach(scope.defaultcolors, function(fronts){
              if(backs.hex!=fronts.hex){
                var item = {'backcolor':backs.hex,'fcolor':fronts.hex,'activate':1};
                scope.combinations.push(item);

              }
              
            });
          });


       

        },true);



    }
  };

});




angular.module("mainApp").directive('cambioColor', function() {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {

        scope.$watch('page_settings.colores',function(x,y){

          console.log(x,' -- ',y);       

        },true);



    }
  };

});
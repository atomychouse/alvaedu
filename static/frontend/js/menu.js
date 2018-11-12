/*DIRECTIVES  ------------------[] -___---------------------------- */

	// We describe a directive here
	// }+++ FOR menu , dropdown efect on menu



	// SHOWING THE SUBMENU TAB

	angular.module("mainApp").directive('showMenu', function() {

	  return {
	    restrict: 'A',
	    link: function(scope, elm, attrs) {

	      elm.click(function(e){
            spk = scope.$parent.s.pk;
            mdpk = '#sub-pk-'+spk;
            jQuery('.submenu-drop').hide();
	      	jQuery(mdpk).show();
	      });


	    }
	  };

	});


    angular.module("mainApp").directive('hideSubmenu', function() {

      return {
        restrict: 'A',
        link: function(scope, elm, attrs) {

          elm.click(function(e){
            jQuery('.submenu-drop').hide();
          });


        }
      };

    });





    angular.module("mainApp").directive('justPop', function() {

      return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.click(function(){
                pops = 'pop-'+scope.s.pk;
                jQuery('#'+pops).show();

            });
        }
      };

    });


	angular.module("mainApp").directive('showAddmenu', ['$http',function($http) {

	  return {
	    restrict: 'A',
	    link: function(scope, elm, attrs) {


	      elm.click(function(e){


	      	neworden = scope.$parent.s.cols.length;
			newcol = {
                     cname:'Categoría '+neworden+1,
                     orden:neworden,
                     subsecs:[
                        {title:'Sub Seccion 1','slug':'subseccion1',orden:1,parentpk:scope.$parent.s.pk,col:0},
                        {title:'Sub Seccion 2','slug':'subseccion2',orden:2,parentpk:scope.$parent.s.pk,col:0},
                        {title:'Sub Seccion 3','slug':'subseccion3',orden:3,parentpk:scope.$parent.s.pk,col:0}
                     ]

                };

	      	getparams = {'parentpk':scope.$parent.s.pk,
	      				'col_name':newcol.cname,
	      				'orden':newcol.orden
	      	};




	        uri = '/admins/savecol/';
	        params = {'url':uri,'method':'GET','params':getparams};
	        $http(params).then(function(response){
                newcol.pk = response.data.ok;
                newcol.cslug = response.data.slug;
                scope.$parent.s.submenu = true;
                scope.$parent.s.cols.push(newcol);
                for(x=0;x<newcol.subsecs.length;x++){
                    newcol.subsecs[x].col=response.data.ok;
                }


                scope.$applyAsync();
                pksub = 'sub-pk-'+scope.$parent.s.pk;
                jQuery('#'+pksub).show(); 
                

                
		      	//scope.$parent.s.cols.push(newcol);
		      	//scope.$apply();



	        });


	      });

	    }
	  };

	}]);


	// HIDDING THE SUBMENU TAB


	angular.module("mainApp").directive('hideMenu', function() {

	  return {
	    restrict: 'A',
	    link: function(scope, elm, attrs) {
	      jQuery(elm).hide();

          scope.$watch('s',function(x,y){
            if(scope.$parent.s.submenu){
                jQuery(elm).show();    
            }
            else{
                jQuery(elm).hide();
            }
          });


	      elm.mouseleave(function(e){
	      	jQuery(elm).hide();
	      });
          

	    }
	  };

	});





/*CONTROLLER []  ..............................*/

myapp.controller('megamenuCtr',function($scope,$http){


// PAGE BEHAVIOR



  $scope.showTools = function(ev,que){
    ev.preventDefault();
    $scope.editando = que;
    rowsScope = angular.element(jQuery('#renglones')).scope();
    menuScope = angular.element(jQuery('#mainmenu_page')).scope();
    controles = angular.element(jQuery('#controlersform')).scope();

    

    rowsScope.editando = que;
    menuScope.editando = que;
    controles.editando = que;
    



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





    $scope.showmenu = function(ev){
        ev.preventDefault();
        jQuery('#menubag').show();
    }




    $scope.hidePop = function(ev,s){
        ev.preventDefault();
        pkpop = 'pop-'+s.pk;
        jQuery('#'+pkpop).hide();
    }


	$scope.menus = [{'title':'cfg','link':'/cfg/','icono':''}];


    $scope.seleccion = function(s){
        params = window.location.pathname.split('/');
        inx = params.indexOf(s.slug);
        if(inx>0)
            return true;
        else
            return false;

    }


    $scope.sections = [];
    uri = '/sections';
    $http.get(uri).then(function(response){
        $scope.sections = response.data;
    });

    //$scope.sections.push(section);

    $scope.addSection = function(ev){
    	ev.preventDefault();
    	orden = $scope.sections.length;
    	var newsec = {
                    title:'Section '+orden,
                    slug:'section-'+orden,
                    orden:orden,
                    selected:true,
                    cols:[]
                };



        uri = '/admins/addsec/';
        params = {'url':uri,'method':'GET','params':newsec};
        $http(params).then(function(response){
            done = true;
            newsec.pk = response.data.ok;
            $scope.sections.push(newsec);
            console.log(newsec);
        });


    	

    }

    $scope.savesec = function(ev,s){
    	existe = $scope.sections.filter(function (section) {
            return (section.title.toLowerCase() == s.title.toLowerCase() );
        });

        if(existe.length>1 || s.title.trim().length<1){
        	s.err = true;
        }
        else{

	        uri = '/admins/savesec/';
	        params = {'url':uri,'method':'GET','params':s};
	        $http(params).then(function(response){
	            s.editando = false;
                s.slug=response.data.slug;
	        });        	

        	
    	}
    }


    $scope.addsub = function(ev,sc){
    	ev.preventDefault();
		newcol = {
                     cname:'Categoría',
                     orden:0,
                     subsecs:[],
                     parentpk:sc.pk

                };
        uri = '/admins/savecol/';
        params = {'url':uri,'method':'GET','params':newcol};

        $http(params).then(function(response){
            newcol.pk = response.data.ok;
            newcol.cslug = response.data.slug;
            sc.cols.push(newcol);

        });         



    }


    $scope.addsbcol = function(ev,s,c){
    	ev.preventDefault();
    	orden = c.subsecs.length;
    	newsbsec =  {title:'sSection '+orden,slug:'ssection-'+orden,orden:orden,parentpk:s.pk,col:c.pk};
        uri = '/admins/savesec/';
        params = {'url':uri,'method':'GET','params':newsbsec};
        $http(params).then(function(response){
        	newsbsec.pk = response.data.ok;
	    	c.subsecs.push(newsbsec);
	    	console.log(newsbsec);
        });
    }


    $scope.editandosec = function(ev,sc){
    	ev.preventDefault();
    	sc.editando = true;
    }


    $scope.saveCat = function(s,c){

        inx = $scope.sections.indexOf(s);
        sects = $scope.sections[inx];

        existe = s.cols.filter(function(col){
            return (col.cname.toLowerCase() == c.cname.toLowerCase());
        });
         if(existe.length>1){
            alert('La categoría ya existe.');
            return false;
         }

         if(c.cname.length<1){
            alert('Debera proporcionar un nombre a la categoría');
            c.cname = 'Categoría'+s.cols.length;
            return false;
         }

    	getparams = {
    		pk:c.pk,
    		col_name:c.cname,
    		parentpk:s.pk
    	};
        uri = '/admins/savecol/';
        params = {'url':uri,'method':'GET','params':getparams};

        $http(params).then(function(response){
            c.editando = false;
            c.cslug = response.data.slug;
        });        	


    }



    $scope.removeItm = function(ev,grupo,indv,trg){
        ev.preventDefault();
        if(confirm('¿Esta seguro que desea eliminar el elemento y todo su contenido?')){
            getparams = {
                pk:indv.pk,
                trg:trg
            };
            uri = '/admins/rmsection/';
            params = {'url':uri,'method':'GET','params':getparams};
            $http(params).then(function(response){            
                $('.popup-marker').popover('hide');
                inx = grupo.indexOf(indv);
                grupo.splice(inx,1);
            });         


        }
    }


});

 myapp.controller('moduleCtr',function($scope,$http){



	var bones = [{tit:'Claro Tipografía',img:'/static/links/brouch_4SEEB7Y.jpeg',orden:1},
				 {tit:'Tipografía',img:'/static/links/brouch_eNpJS0q.jpeg',orden:2},
				 {tit:'Paleta de Color',img:'/static/links/brouch_OkdCn3v.jpeg',orden:3},
				 {tit:'Paleta secundaria',img:'/static/links/brouch_PdXBmEW.jpeg',orden:5},
				 {tit:'0 y Líneas de expresión',img:'/static/links/brouch_AjuHpmD.jpeg',orden:4},
				 {tit:'Logos de Submarca',img:'/static/links/brouch_OZg1IXU.jpeg',orden:6}
				];

	var structure_module = {'sectionpk':'1',
							 setts:{cols:3,padds:10,margs:29},
							 items:bones
							};

	$scope.structure_module = structure_module;




	$scope.addItem = function(ev,itemb){
		ev.preventDefault();
		orden = 0; //itemb.structure_module.items.length;
		itemb.structure_module.items.push({tit:'Untitled',img:'/static/imgs/link1.png',orden:orden});


	}

	$scope.slay = function(ev,itemb){
		ev.preventDefault();
		indx = itemb.structure_module.items.indexOf(itemb.itm);
	
		if(confirm('El elemento se eliminara, ¿Desea continuar?')){		
			itemb.structure_module.items.splice(indx,1);
		}

	}



	$scope.changeme = function(ev,elem){
		ev.preventDefault();
		jQuery('#linkimg').click();
		console.log(elem);
	    $scope.tochange = elem;
	    $scope.imageChanged = true;
	    //elem.box.src = 'reader.result';
	    
	}


  $scope.crup=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
        	console.log($scope.tochange);
			$scope.tochange.itm.img=evt.target.result;              
        });
      };
      reader.readAsDataURL(file);
    };


  angular.element(jQuery('#linkimg')).on('change',function(e){
      $scope.crup(e);
    });



 });






 myapp.controller('imgCtr',function($scope,$http){

 	var bones = [{tit:'ESPACIO',
 				  img:'/static/media/brouch_H6ZZdFH.jpeg',
 				  txt:'Im düstern Auge keine Träne,Sie sitzen am Webstuhl und fletschen die Zähne:Deutschland, wir weben dein Leichentuch,Wir weben hinein den dreifachen Fluch -Wir weben, wir weben!',
 				  orden:1
 				}];

	$scope.imglg_bones = {'sectionpk':'1',
							 setts:{padds:1,margs:1},
							 items:bones
							};




	$scope.addItem = function(ev,itemb){
		ev.preventDefault();
		orden = 0; //itemb.structure_module.items.length;
		nuevo = { orden:0,
				  tit:'ESPACIO',
 				  img:'/static/media/brouch_H6ZZdFH.jpeg',
 				  txt:'Im düstern Auge keine Träne,Sie sitzen am Webstuhl und fletschen die Zähne:Deutschland, wir weben dein Leichentuch,Wir weben hinein den dreifachen Fluch -Wir weben, wir weben!'
 				};
		itemb.imglg_bones.items.push(nuevo);


	}

	$scope.slay = function(ev,itemb){
		ev.preventDefault();
		indx = itemb.imglg_bones.items.indexOf(itemb.itm);
	
		if(confirm('El elemento se eliminara, ¿Desea continuar?')){		
			itemb.imglg_bones.items.splice(indx,1);
		}

	}



	$scope.changeme = function(ev,elem){
		ev.preventDefault();
		jQuery('#imglgfile').click();
	    $scope.tochange = elem;
	    $scope.imageChanged = true;
	    //elem.box.src = 'reader.result';
	    
	}


  $scope.crup=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
        	console.log($scope.tochange);
			$scope.tochange.itm.img=evt.target.result;              
        });
      };
      reader.readAsDataURL(file);
    };


  angular.element(jQuery('#imglgfile')).on('change',function(e){
      $scope.crup(e);
    });




 });





  

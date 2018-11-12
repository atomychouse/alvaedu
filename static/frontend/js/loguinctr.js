myapp.controller('lgnCtr',function($scope,$http){

	$scope.usuario,$scope.pass,$scope.lgerr,$scope.correo = null;
	$scope.recupera = false;
	var uslen,passlen = 0;
	var getparams = {};

	$scope.loguess = function(ev){
		ev.preventDefault();
		if($scope.usuario) uslen = $scope.usuario.trim().length;
		if($scope.pass)	   passlen = $scope.pass.trim().length;

		if(uslen>0 && passlen>0){
		    getparams['csrf']=jQuery('[name=csrfmiddlewaretoken]').val();;
		    getparams['usuarius']=$scope.usuario;
		    getparams['passo']=$scope.pass;

		    console.log(getparams);

		    data = $.param(getparams);
		    	uri = '/singin/';
		        params = {'url':uri,'method':'POST','data':data};
		        $http(params).then(function(response){
				if(response.data.errors){
					$scope.lgerr = true;
				}
				else{
					$scope.lgerr = null;
					pices = window.location.search.split('=');
					if(pices.length>1)
						window.location = pices[1];
					else
						window.location = '/';

				}

		    });
		}
		else{
			$scope.lgerr = true;
		}
	}

	$scope.cuenta = '';
	$scope.recovering = function(ev){
		ev.preventDefault();
			$scope.noenviado = false;
			$scope.enviado = false;
		    getparams['csrf']=csrf;
		    getparams['recovering']='grayholl';		    
		    getparams['correo']=$scope.correo;
		    data = $.param(getparams);
		    uri = '/reccorreo/';

			$scope.noenviado = true;
			$scope.msg = 'Se esta validando la información, espere un momento';

	        params = {'url':uri,'method':'POST','data':data};
	        $http(params).then(function(response){
	
				if(response.data.err){
					$scope.noenviado = true;
					$scope.msg = response.data.err;
					return false;
				}

	        	if(response.data.r==$scope.correo){
	        		$scope.cuenta = $scope.coreo;
	        		$scope.enviado = true;
	        		$scope.noenviado = false;
	        	}
	        	else{
					$scope.enviado = false;
					$scope.correo = '';
					$scope.noenviado = true;
					$scope.msg = 'Ocurrió un error, intente nuevamente.';
	        	}

		    });




	}

	$scope.passnoval = false;
	$scope.assigpass = function(ev){
		ev.preventDefault();

		if($scope.pass && $scope.rpass){
			pass = $scope.pass.trim();
			rpass = $scope.rpass.trim();

			if(pass.length>3 && rpass.length>3 && pass==rpass){

			    getparams['csrf']=csrf;
			    getparams['pass']=$scope.pass;		    
			    getparams['mktimekey']=jQuery('#timem').val();
			    data = $.param(getparams);
			    uri = '/assigpass/';
		        params = {'url':uri,'method':'POST','data':data};
		        $http(params).then(function(response){	
					if(response.data.ok=='1'){
						$scope.passnoval = false;
						$scope.pass = null;
						$scope.rpass = null;
						$scope.recuperada = true;
					}
					else{
						$scope.passnoval = true;
					}

			    });



			}

			else{
				$scope.passnoval = true;
			}

		}
		else{
			$scope.passnoval = true;
		}

	}



});
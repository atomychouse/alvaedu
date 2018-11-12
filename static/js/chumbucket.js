  function toastr(cla,msgs){
  	$('#toastrto').addClass(cla).fadeIn(600).delay(1500).fadeOut(500);
  	$('#toastrto .msg').html(msgs);
  }


  function gohome(){
  	window.location = "/admon/";

  }

  function golink(datos){
  	console.log('aqui vamos');
  	window.location = datos['ruta'];

  }



function refreshfonts(datos){
	trgt = jQuery('#cfgctrid');
	scopefonts = angular.element(trgt).scope();
	scopefonts.$apply(function(){
		scopefonts.fuentes_css.push(datos.css);
		newf = {'pk':datos.agregado.pk,'font_name':datos.agregado.font_name,'font_type':datos.agregado.font_type};
		scopefonts.fuentes_available.push(newf);

	});
	jQuery('#addFont').val('');


}


function fuentesmodulo(datos){
	trgt = jQuery('#configs');
	scopefonts = angular.element(trgt).scope();	
	scopefonts.$apply(function(){
		scopefonts.fuentes_css.push(datos.css);
		newf = {'pk':datos.agregado.pk,'fonty':datos.agregado.font_name,'ffile':datos.ffile};
		scopefonts.fuentes.push(newf);

	});
	jQuery('#addFont').val('');


}

function reg_success(response)
{
	toastr('success',response.msg);
	//location.reload();
	window.location = response.liga;
}

function reg_success_user(response)
{
	toastr('success',response.msg);
	//location.reload();
	window.location = '/admin/users/';
}


function hideformr(){
	console.log('azlo');

	$('#contactform').hide().after('<div class="titulo">Gracias por contactaros, te haremso llegar una respuesta en breve.</div>');
}

function sendit(e){
	
	//var data = $(this).serializeArray();
	 toastr('warning','La información se esta procesando espere porfavor ...');
	var url = $(this).attr('action');
	var type = $(this).attr('method');
	forma = $(this).get(0);
	//forma = $('#empresaspt1').get(0);
	$('#formabox').hide().after('<div class="titulo" style="font-size:1.2rem;">Gracias por su interes, le haremos llegar una respuesta en breve.</div>');
	var data = new FormData(forma);
	$.ajax({url:url,
			type:type,
			data:data,
			cache: false,
	        processData: false,
	        contentType:false,
    	    dataType: 'json',
			success:function(response){
				$('.errr').removeClass('errr');
				$('.alert').remove();

			}

	});

	return false;

}


function Executor(que,conque){
	console.log(que);
	if(typeof(window[que])=='function'){
		window[que](conque);
	}	
}
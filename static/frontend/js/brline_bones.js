// THIS IS  A LIST FOR MODULES TO SHOW IN MODAL TOOL 
modules = [
  {name:'Ambientes 360',
  icono:'icon-iconos-brandline_ambientes-3d',
  slug:'ambientes',
  orden:0
  },
  {name:'Imagen Rebasada',
  icono:'icon-iconos-brandline_imagen-rebasada',
  slug:'imglg',
  orden:0
  },
  {name:'grid Link',
  icono:'icon-iconos-brandline_grid-de-imagen',
  slug:'gridlink',
  orden:1
  },
  {name:'Descargas',
  icono:'icon-iconos-brandline_grid-de-imagen',
  slug:'gridimages',
  orden:2
  },
  {name:'Texto e imagen',
  icono:'icon-iconos-brandline_texto-e-imagen',
  slug:'sideimg',
  orden:3
  },
{name:'Video',
  icono:'icon-iconos-brandline_video',
  slug:'video',
  orden:4
  },
  {name:'texto HTML',
  icono:'icon-iconos-brandline_html',
  slug:'richtxt',
  orden:4
  },  
    
  {name:'Espacio',
  icono:'icon-iconos-brandline_separador',
  slug:'spaceblank',
  orden:5
  },
  {name:'Aviso',
  icono:'icon-iconos-brandline_comentarias',
  slug:'aviso',
  orden:7
  },
  {name:'Banco',
  icono:'icon-iconos-brandline_banco-de-imagen',
  slug:'banco',
  orden:8
  },
  {name:'Tabla',
  icono:'icon-iconos-brandline_tabla',
  slug:'tabla',
  orden:9
  }, 
  
  {name:'360',
  icono:'icon-iconos-brandline_360',
  slug:'tressesenta',
  orden:10
  },
  {name:'Notas Referenciadas',
  icono:'icon-iconos-brandline_notas-referenciales',
  slug:'notasref',
  orden:11
  },
  {name:'Código Cromático',
  icono:'icon-iconos-brandline_color',
  slug:'cromatico',
  orden:12
  },

  {name:'Color',
  icono:'icon-iconos-brandline_portada',
  slug:'color',
  orden:13
  }
  ,
  {name:'Tipografia',
  icono:'icon-iconos-brandline_trabajo-en-proceso',
  slug:'tipografia',
  orden:14
  }
  
];


var ITM_CONSTRUC = function(){
    this.getRow = function(slugrow){
      this.slugrow = slugrow;        
      ROWS = {};
      ROWS['tipografia']= {
                  'slug':'tipografia',
                  'title':'',
                  'config':{'typo':'list'},
                  'items':[],
                  'icono':'icon-iconos-brandline_trabajo-en-proceso',
                  'orden':0
      };


      ROWS['gridlink'] = {
                  'slug':'gridlink',
                  'img':null,
                  'orden':0,
                  'config':{cols:'3',pads:'90',margs:'5',fonttype:'Arial',fontsize:'20',fontcolor:'#4c4c4c'},
                  'items':[],
                  'icono':'icon-iconos-brandline_grid-de-imagen'
      };
      
      ROWS['imglg']= {
                  'slug':'imglg',
                  'title':'',
                  'config':{},
                  'items':[],
                  'icono':'icon-iconos-brandline_imagen-rebasada',
                  'orden':0
      };

      ROWS['gridimages'] = {
                  'slug':'gridimages',
                  'img':null,
                  'orden':0,
                  'config':{cols:'3',pads:'90',margs:'5',fonttype:'Arial',fontsize:'20',fontcolor:'#4c4c4c'},
                  'items':[],
                  'icono':'icon-iconos-brandline_grid-de-imagen'
      };
      ROWS['richtxt'] = {
                  'slug':'richtxt',
                  'orden':0,
                  contenido:'',
                  'icono':'icon-iconos-brandline_html',
                  'config':{'fontcolor':'#4c4c4c'},
                  items:[],
              };
      ROWS['sideimg'] = {
                  'slug':'sideimg',
                  'orden':0,
                  'items':[],
                  'icono':'icon-iconos-brandline_texto-e-imagen'
      };
      ROWS['spaceblank'] = {
                  'slug':'spaceblank',
                  'icono':'icon-iconos-brandline_separador',
                  'config':{'alto':'30','color_fondo':'#fff','linea':'','grosor_linea':'2','color_linea':'#000'}
      };
      ROWS['video'] = {
                  'slug':'video',
                  'orden':0,
                  'config':{cols:'3',pads:'90',margs:'5',fonttype:'Arial',fontsize:'20',fontcolor:'#4c4c4c'},
                  'items':[],
                  'icono':'icon-iconos-brandline_video'
      };
      ROWS['aviso'] = {
                  'slug':'aviso',
                  'orden':0,
                  'items':[],
                  'icono':'icon-iconos-brandline_comentarias'
      };
      ROWS['banco'] = {
                  'slug':'banco',
                  'icono':'icon-iconos-brandline_banco-de-imagen',
                  'orden':0,
                  'catfilts':[],
                  'config':{cols:'4',pads:'90',margs:'5',fonttype:'Arial',fontsize:'20',fontcolor:'#4c4c4c'},
                  'items':[],
                  'allcats':[]
      };
      ROWS['tabla'] = {
        slug:'tabla',
        orden:0,
        items:[],
        'icono':'icon-iconos-brandline_tabla'
      };
      ROWS['tressesenta'] = {
                  'slug':'tressesenta',
                  'config':{'margs':'0','fonttype':'Arial','fontcolor':'#4c4c4c','fontsize':'20'},
                  'items':[],
                  'icono':'icon-iconos-brandline_360'
      };

      ROWS['ambientes'] = {
                  'slug':'ambientes',
                  'config':{'margs':'0','fonttype':'Arial','backcolor':'#fff','fontcolor':'#4c4c4c','fontsize':'20'},
                  'items':[],
                  'icono':'icon-iconos-brandline_ambientes-3d'
      };

      ROWS['notasref'] = {
                  'slug':'notasref',
                  'items':[],
                  'icono':'icon-iconos-brandline_notas-referenciales'
      };

      ROWS['cromatico']= {
                  'slug':'cromatico',
                  'title':'',
                  'config':{'typo':'list'},
                  'items':[],
                  'icono':'icon-iconos-brandline_color',
                  'orden':0
      };


      ROWS['color']= {
                  'slug':'color',
                  'title':'',
                  'config':{},
                  'items':[],
                  'icono':'icon-iconos-brandline_portada',
                  'orden':0
      };

      ROWS['bcard'] = {
                  'slug':'bcard',
                  'icono':'icon-iconos-brandline_portada',
                  'font':{'family':'','color':''},
                  'pos_text':'',
                  'fonttype':'Arial',
                  'fontsize':'15px',
                  'text_pos':'left',
                  'nombre':'',
                  'cargo':''
      };

        try {
            this.response = ROWS[slugrow];
        }
        catch(err) {
            console.log(err);
            alert(err);
            this.response = null;
        }
        return this.response;

    
    }


    
    this.getItm = function(slugrow){
        this.slugrow = slugrow;        
        ITMS = {};
        this.response = null;
        ITMS['gridlink'] = {'title':'linktext',
                     'orden':1,
                     'link':'/home',
                     'img':'/static/imgs/defaults/grids.jpg',
                     'oldimg':'/static/imgs/defaults/grids.jpg'
                    };
        ITMS['gridimages'] = {'title':'',
                     'orden':0,
                     'link':'',
                     'img':'/static/imgs/defaults/grids.jpg',
                     'oldimg':'/static/imgs/defaults/grids.jpg',
                     'downs':[]
                };
        ITMS['imglg'] = {'title':'',
                         'orden':0,
                         'img':'/static/imgs/defaults/imagenrebasada.jpg',
                         'oldimg':'/static/imgs/defaults/imagenrebasada.jpg',
                         'config':{'margs':'0','fonttype':'Arial','fontcolor':'#fff','fontsize':'20'}
                        };
        ITMS['sideimg'] = {
            'title':'',
            'descp':'',
            'orden':0,
            'img':'/static/imgs/defaults/txtimage.png',
            'oldimg':'/static/imgs/defaults/txtimage.png',
            'config':{img_box_size:'30',text_box_size:'69',img_pos:'left',txt_pos:'right'},
            downs:[]
        };

        ITMS['video'] =  {
            'link':'',
            'title':'',
            'descp':'',
            'orden':0,
            'img':'/static/imgs/defaults/video.jpg'
        };
        ITMS['aviso'] =  {
            'typo':'alerta',
            'contenido':'Aviso',
            'orden':0,
            'config':{'typo':'alerta','visible':'visible'}
        };
        ITMS['banco'] =  {
            'descp':'',
            'orden':0,
            'img':'/static/imgs/defaults/grids.jpg',
            'oldimg':'/static/imgs/defaults/grids.jpg',
            'downs':[],
            'mycats':[],
            'isvideo':0,
            'isvisible':true,
            'onlydowns':[],
            cats:[]
        };
        ITMS['tabla'] =  {
          orden:0,
          config:{rows:[1,2,3,4,5,6,7,8,9,10],cols:[1,2,3,4,5,6,7,8,9,10],backcolor:'#fff',bordes:'2',grosor_linea:2,color_linea:'#000'},
          contenido:{
              rows:[{cols:[{'texto':'texto'},{'texto':'texto'}]}]
            }

        };
        
        ITMS['tressesenta'] =  {
            'title':'',
            'orden':0,
            'img':'/static/imgs/defaults/imagenrebasada.jpg',
            'oldimg':'/static/imgs/defaults/imagenrebasada.jpg',
            'markas':[]
        };

        ITMS['ambientes'] =  {
            'title':'',
            'orden':0,
            'img':'/static/imgs/defaults/imagenrebasada.jpg',
            'oldimg':'/static/imgs/defaults/imagenrebasada.jpg',
            'markas':[]
        };



        ITMS['notasref'] =  {
            'orden':0,
            'img':'/static/imgs/defaults/imagenrebasada.jpg',
            'oldimg':'/static/imgs/defaults/imagenrebasada.jpg',
            notas:[],
            config:{'backcolor':'#4c4c4c','fontcolor':'#fff','numeracion':'nums','clase':'redondeo'}
        };

        ITMS['richtxt'] =  {
            'contenido':'Contenido',
            'orden':0
        };


        ITMS['color'] = {'title':'',
                         'orden':0,
                         'img':'/static/imgs/defaults/imagenrebasada.jpg',
                         'oldimg':'/static/imgs/defaults/imagenrebasada.jpg',
                         'config':{'backcolor':'#4c4c4c',
                                   'type_a':'color',
                                   'altura':'25',
                                   'fonttype':'Arial',
                                   'fontcolor':'#fff',
                                   'fontsize':'20',
                                   'textalg':'left'
                                 }
        };


        ITMS['tipografia'] = {'categoria':'Categoría',
                              'fuentes':[],
                              'orden':1
                            };


        ITMS['cromatico'] = {'categoria':'Categoría',
                              'colores':[],
                              'orden':1
                            };


        try {
            this.response = ITMS[slugrow];
        }
        catch(err) {
            console.log(err);
            alert(err);
            this.response = null;
        }
        return this.response;

    }



}



// SERVICE TO SAVE ROWS

myapp.service('rowAction', function () {
        var row = 'First';

        return {
            saveR: function (ev,elemento) {
                ev.preventDefault();
            },
            setR:function(elemento){
              row = elemento;
              return row;
            },
            getR:function(){
                return row;
            }

        };
});



var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player_box');
};



    $('#playermodal').on('hidden.bs.modal', function () {

       player.stopVideo();

    });
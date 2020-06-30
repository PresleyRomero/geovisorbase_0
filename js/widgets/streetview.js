define([
	"js/visor",
	"dijit/Menu", 
	"dijit/MenuItem", 
	"dijit/MenuSeparator",
	"dijit/popup",
    "esri/Graphic"

	],function(
		Visor,
		Menu, 
		MenuItem, 
		MenuSeparator,
		Popup,
		Graphic
	){

		$(function() {
	      console.log( "ready Street view - widget!" );
	      createContextMenu();

	    });

		__view = Visor.getView();

		__ctxmenu = {};
		__isinited_streetview = false;
		__svpanorama = '';
		__svservice = '';

		__latylng = {};
		__mappoint = {}; //map point in clicked (point geometry)
		__gra_placemarker = {}; 

		__isactive_btnmark = false;   
		__symbolsv = {
		  type: "picture-marker", 
		  url: "img/blueArrow4.png",
		  width: "24px",
		  height: "24px",
		  angle: 270
		}

		$('#btn_menusv').on('click', function() {
		  $('#wg_streetview').toggleClass('visible notvisible');
		  __isinited_streetview==false ? initStreetView() : '';
		});

		
		$('#btn_markstreet').on('click', function(){
		  $(this).toggleClass('active desactive');
		  $('#viewDiv').toggleClass('active-click desactive-click');
		  let $msg_instruc = $('.message-instruction-sv');
		  if($(this).hasClass('active')){
		    __isactive_btnmark = true;
		    $msg_instruc.css('visibility', 'visible');
		    $(this).addClass('parpadea').attr('title', 'Desactivar click en el mapa');
		  }else{
		    __isactive_btnmark = false;
		    $msg_instruc.css('visibility', 'hidden');
		    $(this).removeClass('parpadea').attr('title', 'Activar click en el mapa');
		  }
		});

		__view.on("click", function(event){
		  __mappoint = event.mapPoint;
		  __latylng = { lat:__mappoint.latitude, lng:__mappoint.longitude };
		  if (event.button === 2) { //if(right click)
		    Popup.open({
		      popup: __ctxmenu,
		      x: event.x,
		      y: event.y          
		    }); 
		  } else if(__isactive_btnmark){
		    Popup.close(__ctxmenu);
		    loadPanorama();
		  }else{
		    Popup.close(__ctxmenu);
		  }
		});

		function initStreetView(){ 
		  let panooptions = { 
		    linksControl: false,
		    panControl: false,
		    zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
		    enableCloseButton: false
		  }
		  __svpanorama = new google.maps.StreetViewPanorama(document.getElementById('container_streetview'), panooptions);
		  __svservice = new google.maps.StreetViewService();
		  __isinited_streetview = true;
		}

		function loadPanorama() {
		  let $containersv = $('#container_streetview').css('display', 'block');
		  let $msg_noresult = $('.message-noresults-sv').css('display', 'none');
		  
		  __svservice.getPanorama({location: __latylng, radius: 50}, function(data, status){
		    if (status === 'OK') {          
		      if(__isactive_btnmark) $('#btn_markstreet').click();          
		      __svpanorama.setPosition(__latylng); // ó __svpanorama.setPano(data.location.pano);    
		      __svpanorama.setVisible(true);          
		    }else {
		      $containersv.css('display', 'none');
		      $msg_noresult.css('display', 'block');
		      __svpanorama.setVisible(false);
		      __view.graphics.remove(__gra_placemarker);     
		      status == 'ZERO_RESULTS' ? console.error('Street View no disponible en esta ubicación') : console.error('ERROR UNKNOWN - Street View no disponible en esta ubicación');
		    }        
		  });    

		  //event position changed
		  __svpanorama.addListener('position_changed', function() {
		    if (__view.graphics.items.length === 0) { 
		      __gra_placemarker = new Graphic({
		        geometry: __mappoint, 
		        symbol: __symbolsv     
		      });   
		      __view.graphics.add(__gra_placemarker);
		    } 
		    let panoposition = __svpanorama.getPosition();
		    __mappoint.latitude = panoposition.lat();
		    __mappoint.longitude = panoposition.lng();
		    __gra_placemarker.geometry = __mappoint;
		  });

		  //event rotation changed 
		  __svpanorama.addListener('pov_changed', function() {        
		    let panopov = __svpanorama.getPov();      
		    __symbolsv.angle = panopov.heading;
		    __gra_placemarker.symbol = __symbolsv;
		  });             
		}


		function createContextMenu() { 
		  __ctxmenu = new Menu();
		  __ctxmenu.addChild(new MenuItem({
		    label: "Abrir Street View aquí",
		    iconClass: "esri-icon-media", //esri-icon-tracking , esri-icon-navigation
		    onClick: function (evt) {         
		      $('#wg_streetview').removeClass('notvisible').addClass('visible');
		      __isinited_streetview==false ? initStreetView(): '';
		      loadPanorama();
		      Popup.close(__ctxmenu);
		    }
		  }));
		  __ctxmenu.addChild(new MenuItem({
		    label: "Ver dirección aquí",
		    iconClass: "esri-icon-map-pin",
		    onClick: function () {
		      console.log("clicó en opcion 2");
		      Popup.close(__ctxmenu);
		    }
		  }));
		  __ctxmenu.startup();
		}

	}
);


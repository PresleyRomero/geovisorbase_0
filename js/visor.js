define([
    
      "esri/Map",
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/layers/FeatureLayer",
      "esri/layers/GroupLayer",
      "esri/layers/MapImageLayer",
      "esri/PopupTemplate",
      "esri/widgets/Legend",
      "esri/widgets/LayerList",
      "esri/widgets/Locate",

      "esri/widgets/BasemapToggle",
      "esri/widgets/BasemapGallery",

      "esri/widgets/Sketch/SketchViewModel",
      "esri/widgets/Print",
      "esri/layers/GeoJSONLayer",

      // "esri/layers/GraphicsLayer",
      // "esri/Graphic",
     
      "esri/views/2d/draw/Draw",
      "esri/geometry/geometryEngine",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/SimpleFillSymbol",

      
      "esri/geometry/support/webMercatorUtils",
      "esri/geometry/Point", 
      "esri/geometry/Polygon",
      "esri/symbols/PictureMarkerSymbol",
      "esri/renderers/SimpleRenderer",

      "dojo/domReady!"

    ],function(

      Map,
      MapView,
      SceneView,
      FeatureLayer,
      GroupLayer,
      MapImageLayer,
      PopupTemplate,
      Legend,
      LayerList,
      Locate,

      BasemapToggle,
      BasemapGallery,     

      SketchViewModel,
      Print,
      GeoJSONLayer,
     
      // GraphicsLayer,
      // Graphic,
     
      Draw,
      geometryEngine,
      SimpleMarkerSymbol,
      SimpleFillSymbol,

      webMercatorUtils,
      Point,
      Polygon,
      PictureMarkerSymbol,
      SimpleRenderer,

    ){


      $(function() {
          console.log( "ready visor!" );

      });

      //// URL DE WEB SERVICES

      url_f_ejemplo = "https://services9.arcgis.com/uP0Xsyi3TAkFo5MR/ArcGIS/rest/services/subproyectos_geosnipa2/FeatureServer/0"; // Proyectos PNIPA
      url_f_ejemplo2 = "https://services9.arcgis.com/uP0Xsyi3TAkFo5MR/ArcGIS/rest/services/pnipa_omr/FeatureServer/0"; // OMRs
   
      // //fields de ws UAP_Superv(4)
      // var fglobalid = "GLOBALID";
      // var fobjectid = "OBJECTID";
      // var fidor = "ID_OR";
      // var fcoduap = "ID_LUMINARIA";
      // var fempresa = "CODEMP";
      // var fubigeo = "CODUBIGEO";
      // var fdepartamento = "DEPART";
      // var fprovincia = "PROV";
      // var fdistrito = "DIST";
      // var fsed = "CODSED";
      // var fsectipico = "SECTIPICO";
      // var fperiodo = "PERIODO";
      // var fdeficiencia = "ESTADODEFICIENCIA";
      // var fedituser = "LAST_EDITED_USER";

      // //fields de ws FormUAPs(1)
      // var fobjectidform = "OBJECTID";
      // var fobservacion1 = "OBSFOTO1";
      // var fobservacion2 = "OBSFOTO2";
      // var ffoto1 = "FOTO1";
      // var ffoto2 = "FOTO2";
      // var firma = "FIRMASUPERVISOR";
      // var feditdate = "LAST_EDITED_DATE";

      
    //// DEFINICIÓN DE FEATURE LAYERS      

    var fl_ejem1 = new FeatureLayer({ 
        url: url_f_ejemplo,
        title: "Subproyectos PNIPA",
        outFields: ["*"],
        visible:true,
        definitionExpression: "1=1"
    });

    var fl_ejem2 = new FeatureLayer({ 
        url: url_f_ejemplo2,
        title: "Oficinas Macroregionales",
        outFields: ["*"],
        visible:true,
        definitionExpression: "1=1"
    });

    var fl_ejem3 = new FeatureLayer({ //service de US
       url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0"
     });



    //// DEFINICIÓN DE GROUPLAYERS

    var gl_ejemplo = new GroupLayer({
        title : "Grupo de Capas",
        layers : [fl_ejem3, fl_ejem2, fl_ejem1]
    });



  /**************** VISOR ******************** */

      var map = new Map({
        basemap: "osm"
      });
            
      var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 6,
        center: [-72,-10]
      });
      
      map.add(gl_ejemplo);      



      // Widgets

      var layerList = new LayerList({
        view : view,
        container: "container-layers"
      });

      var legend = new Legend({
        view: view,
        container : "container-legend",
        layerInfos: [{
          layer: gl_ejemplo
        }]
      });        

      // var basemapGallery = new BasemapGallery({
      //   view: view,
      //   container: "baseMaptoggle"
      // });
      // view.ui.add(basemapGallery, "top-right");

      var locateBtn = new Locate({
          view: view
      });

      view.ui.add(locateBtn,{position: "top-left"});
     
  
    /**************** UX ******************** */
    /*
    Espacio para escribir/testear Nuevas funcionalidades y/o widgets 
    */




    /**************** FUNCIONES DE APOYO ******************** */    
    /*
    Espacio para escribir/testear nuevas funciones de apoyo a usar
    */






    /**************** RETURN FUNCIONES ******************** */    

    return{
      getView: function(){ return view; }
    }

  }
);
 
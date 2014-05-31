
var project = angular.module('app.project', ['ngRoute','btford.socket-io',]);


project.controller('projectCtrl', ['$scope','$route', '$routeParams','$location', 'Project', '$state',
  'COData','CObject','COTrigger','COAction',
  'WSData','WService','WSTrigger','WSAction',
  'Connection','$timeout','socket',

  function($scope, $routeParams, $route, $location, Project, $state, 
    COData,CObject,COTrigger,COAction, 
    WSData,WService,WSTrigger,WSAction, 
    Connection, $timeout, socket) {


		$scope.$watch('projectId', function () {//wait until the variable is initialized
      socket.on('foo~bar', function () {
        $scope.bar = true;
      });
      
      var id=$scope.projectId;
      var project = Project.show({projectId:id}, function(){

       $scope.project=project;
       $scope.name=project.name;


        //get the entities separately
        $scope.cObjects=project.cObjects;
        $scope.wServices=project.wServices;

        console.log("wServices");
        console.log(project.wServices);
        //combine entities in a single array

        //get all the connections
        $scope.connectionsid=project.connections;
        console.log("connections",$scope.connectionsid);
        //this array stores the positions of the connections
        $scope.connections=new Array();

        
        //variable to operate on the selected entity
        $scope.selectedEntity;
        
        // if(project.enitites.length>0){ //if cObjects are already part of the project

        //   //set as default the first element as the active one
        //   $scope.selectedCObject=project.cObjects[0]; 

        // $scope.selectedCObject.cOTriggers=new Array();
        // $scope.selectedCObject.cODatas=new Array();
        // $scope.selectedCObject.cOActions=new Array();
        
        //   //get all the COData actions
        $scope.cObjects.forEach( function (item,i){

          var cOdataArr=CObject.getCOData({id:item.id}, function(){
            cODatas=cOdataArr.cODatas;
            item.cODatas=cODatas;
              //console.log("initialdatas",cODatas);
            });

        });
        $scope.cObjects.forEach( function (item,i){

          var cOtriggerArr=CObject.getCOAction({id:item.id}, function(){
            cOActions=cOtriggerArr.cOActions;
            item.cOActions=cOActions;
              //console.log("initialactions",cOActions);

            });
        });
        $scope.cObjects.forEach( function (item,i){

          var cOtriggerArr=CObject.getCOTrigger({id:item.id}, function(){
              //console.log("triggersData",cOtriggerArr);

              cOTriggers=cOtriggerArr.cOTriggers;
              item.cOTriggers=cOTriggers;
              //console.log("initialtriggers",cOTriggers);
            });
        });
        // }





        $scope.wServices.forEach( function (item,i){

          var cOdataArr=WService.getWSData({id:item.id}, function(){
            wSDatas=wSdataArr.cODatas;
            item.wSDatas=wSDatas;
              //console.log("initialdatas",cODatas);
            });

        });
        $scope.wServices.forEach( function (item,i){

          var wStriggerArr=WService.getWSAction({id:item.id}, function(){
            wSActions=wStriggerArr.wSActions;
            item.wSActions=wSActions;
              //console.log("initialactions",cOActions);

            });
        });
        $scope.wServices.forEach( function (item,i){

          var wSOtriggerArr=WService.getCOTrigger({id:item.id}, function(){
              //console.log("triggersData",cOtriggerArr);

              wSTriggers=wStriggerArr.wSTriggers;
              item.wSTriggers=wSTriggers;
              //console.log("initialtriggers",cOTriggers);
            });
        });

        $scope.entities=$scope.cObjects.concat($scope.wServices);
        console.log($scope.entities);

        //determine if the sidepanel is opened
        $scope.controlsAreOpen=false;
        //the state of the project
        $scope.$state = $state;
        //the id of the connection that is highlighted
        $scope.highlightedConnectionid=null;

      });		
}); 

$scope.selectCobject =function(cObjectID){
    console.log("coID",cObjectID);

  for (i=0; i<$scope.entities.length;i++){
    if ($scope.entities[i]){
      if (cObjectID==$scope.entities[i].id){
        $scope.selectedEntity=$scope.entities[i];
        break;
      }
    }
  } 

  console.log("select entity "+$scope.selectedEntity);

  if($scope.selectedEntity!=null){
    $state.go('edit.addcObject');
    
    if(!$scope.selectedEntity.cOTriggers){
      $scope.selectedEntity.cOTriggers=new Array();
    }
    if(!$scope.selectedEntity.cODatas){
      $scope.selectedEntity.cODatas=new Array();

    }
    if(!$scope.selectedEntity.cOActions){
      $scope.selectedEntity.cOActions=new Array();

    }
  }else{
    $state.go('edit');
  }
}

$scope.selectWService =function(wServiceID){
  console.log("wsID",wServiceID);

  for (i=0; i<$scope.entities.length;i++){
    if ($scope.entities[i]){
      if (wServiceID==$scope.entities[i].id){
        $scope.selectedEntity=$scope.entities[i];
        break;
      }
    }
  } 

  console.log("select entity "+$scope.selectedEntity);

  if(cObject!=null){
    $state.go('edit.addwService');
    
    if(!$scope.selectedEntity.cOTriggers){
      $scope.selectedEntity.cOTriggers=new Array();
    }
    if(!$scope.selectedEntity.cODatas){
      $scope.selectedEntity.cODatas=new Array();

    }
    if(!$scope.selectedEntity.cOActions){
      $scope.selectedEntity.cOActions=new Array();

    }
  }else{
    $state.go('edit');
  }
}

$scope.highlightConnection=function(id){
  $scope.highlightedConnectionid=id;
}

$scope.selectCOData =function(cOData){
  $scope.selectedCOData=cOData;
      //console.log($scope.selectdCObject);
      $state.go('edit.editCOData');
    }

    $scope.selectCOTrigger =function(cOTrigger){
      $scope.selectedCOTrigger=cOTrigger;
      //console.log($scope.selectdCObject);
      $state.go('edit.editCOTrigger');
    }

    $scope.selectCOAction =function(cOAction){
      $scope.selectedCOAction=cOAction;
      //console.log($scope.selectdCObject);
      $state.go('edit.editCOAction');
    }

    var dragStarted=false;
    var dragArrowStarted=false;
    var dragEntityStarted=false;
    var dragEntityType=null;


    var calcOffsetX;
    var calcOffsetY;
    var scrollX;
    var scrollY;

    var entityDragged=null;

    $scope.mouseDown=function(mouseEvent){

      socket.emit('my other event', { my: 'data' });

      dragStarted=true;

      var elem = document.elementFromPoint(mouseEvent.clientX, mouseEvent.clientY);
      //console.log(elem);
      //console.log(mouseEvent.clientX, mouseEvent.clientY);
     // console.log($(elem));
     SDElem=$("#systemDiagram");
     offsetX=SDElem.offset().left;
     offsetY=SDElem.offset().top;

     scrollX=$(window).scrollLeft();
     scrollY=$(window).scrollTop();

     calcOffsetX=offsetX-scrollX;
     calcOffsetY=offsetY-scrollY;


     if ($(elem).hasClass("start")){
      dragArrowStarted=true;
      console.log("I start a new arrow");
      
      outputID=elem.id;
        //console.log(outputID);

        // var newX1=mouseEvent.clientX-calcOffsetX;
        // var newY1=mouseEvent.clientY-calcOffsetY;

        var newX1=$('#'+outputID+".start").offset().left-offsetX ;
        var newY1=$('#'+outputID+".start").offset().top-offsetY;

        $scope.connections.push({x1:newX1,y1:newY1,x2:newX1,y2:newY1});
        $scope.connectionsid.push({start:outputID, end:null});
        
      }else if ($(elem).hasClass("entityIcon")){
        console.log ("I should start drag the entity");

        entityID=elem.id;
        console.log(entityID);

        for(i=0;i<$scope.cObjects.length;i++){
          if ($scope.cObjects[i].id==entityID){
            entityDragged=$scope.cObjects[i];
            dragEntityType="cObject";
            break;
          }
        }
        for(i=0;i<$scope.wServices.length;i++){
          if ($scope.wServices[i].id==entityID){
            entityDragged=$scope.wServices[i];
            dragEntityType="wService";
            break;
          }
        }

        console.log(entityDragged);
        console.log("type",dragEntityType);

        //$scope.$parent.cObjects.splice(arrIndex,1);

        dragEntityStarted=true;


        startingX=entityDragged.positionX;
        startingY=entityDragged.positionY;
        startingMouseX=mouseEvent.clientX;
        startingMouseY=mouseEvent.clientY;

      }
    }

    $scope.mouseMove=function(mouseEvent){

      if(dragArrowStarted){
        $scope.connections[$scope.connections.length-1].x2=mouseEvent.clientX-calcOffsetX;
        $scope.connections[$scope.connections.length-1].y2=mouseEvent.clientY-calcOffsetY;
        

      }else if(dragEntityStarted){
        var newPositionX=-startingMouseX+mouseEvent.clientX+startingX;
        var newPositionY=-startingMouseY+mouseEvent.clientY+startingY;
        entityDragged.positionX=newPositionX;
        entityDragged.positionY=newPositionY;
      }
      if (dragStarted&&!dragArrowStarted){
        $scope.updateConnections();
    //    console.log("dragging something else than an arrow")
  }
}

$scope.mouseUp=function(mouseEvent){


  if(dragArrowStarted){
    var elem = document.elementFromPoint(mouseEvent.clientX, mouseEvent.clientY);
    if ($(elem).hasClass("end")){
      console.log("this is the right place!");

      inputId=elem.id;
            //console.log(inputId);

            
            //console.log($scope.connectionsid);
            //console.log($scope.connections);


      $scope.connectionsid[$scope.connectionsid.length-1].end=inputId;
            
      var projectID=$scope.projectId;
      var startID=$scope.connectionsid[$scope.connectionsid.length-1].start;
      var endID=$scope.connectionsid[$scope.connectionsid.length-1].end;
            //console.log(projectID)

      var newConnection=Connection.salva({project:projectID,start:startID,end:endID}, function(){
              //console.log("newAction", connection);
                //$scope.$parent.cObjects.push(cObject);
               //$scope.$parent.selectedCObject.connections.push(connection);
      console.log(newConnection);
      $scope.connectionsid[$scope.connectionsid.length-1]=newConnection;
      $scope.updateConnections();


    });

    }else{
      $scope.connectionsid.pop();
      $scope.connections.pop();
    }
          //updateConnections();
         // console.log($scope.connectionsid);
    
    startingPositionX=0;  
    startingPositionY=0;

  }else if(dragEntityStarted){
    $scope.updateEntityPosition(dragEntityType);
    console.log("type to change",dragEntityType);
  }
  dragArrowStarted=false;
  dragStarted=false;
  entityDragged=null;
  dragEntityStarted=false;
  dragEntityType=null;
}

$scope.updateEntityPosition=function(type){
      
      newPositionX=entityDragged.positionX;
      newPositionY=entityDragged.positionY;
      console.log(type);

      if (type=="cObject"){
        console.log("update cObject Position")
        cObjectId=entityDragged.id;
        CObject.update({
          id:cObjectId, 
          positionX:newPositionX, 
          positionY:newPositionY
        });
      }
      else if(type=="wService"){
        console.log("update wservice Position")
        wServiceId=entityDragged.id;
        WService.update({
          id:wServiceId, 
          positionX:newPositionX, 
          positionY:newPositionY
        });
      }  
          //console.log("positionUpdated");
      }

          $scope.updateConnections=function(){

            var newConnections=new Array();
            $scope.connectionsid.forEach(function(entry,i) {
         //console.log(entry.start);
         
        // console.log($('#'+entry.start));


        x1=$('#'+entry.start+'.start').offset().left-offsetX ;
        y1=$('#'+entry.start+'.start').offset().top-offsetY;

      //console.log($('#'+entry.end));

//      console.log($('#'+entry.end+'.end'));

x2=$('#'+entry.end+'.end').offset().left-offsetX;
y2=$('#'+entry.end+'.end').offset().top-offsetY;
       //  console.log("updatingConnections",x1,y1,x2,y2);

       startID=entry.start;
       endID=entry.end;
       id=entry.id;

        //console.log("offset",x1);
        newConnections[i]={x1:x1, y1:y1, x2:x2, y2:y2, startID:startID, endID:endID, id:id}
      });
            $scope.connections=newConnections
  //      console.log($scope.connectionsid);

  //      console.log($scope.connections);

}

socket.on('connect', function () {
  console.log("socket connected");

  $scope.$on('socket:update', function(event, data) {
    $scope.messages.push(data);
  });

  $scope.postMessage = function(message, callback) {
    socket.emit('post', message, function(commitedMessage) {
      $scope.messages.push(commitedMessage);
      callback(commitedMessage);
    });
  };
});


}]);


project.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});


 // project.factory('Project', ['$resource',function($resource){
 //     return $resource('/project/:projectId', {}, {projectId:'@id'});
 //   }]);

project.factory('Project', ['$resource',function($resource){
 return $resource('/project/:projectId', {}, 
 {
     		//projectId:'@id',

     		'show': {method:'GET', params:{projectId:'@id'}, url:'/project/show/:projectId' }

     	});
}]);




project.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('edit.addEntity', {
     url: "addEntity",
     views:{
      "left":{templateUrl: '/linker/js/project/partials/addEntity.ejs'} 
    }

  })
    .state('edit.addcObject', {       	
      views:{
        "left":{templateUrl: '/linker/js/cObject/partials/addcObject.ejs'}  
      }, 
    })
    .state('edit.editCOData', {
     url: "editCOData",        
     views:{
      "left":{templateUrl: '/linker/js/cObject/partials/addcObject.ejs'}, 
      "editor":{templateUrl: '/linker/js/cOData/partials/editCOData.ejs'}  
    }, 

  })
    .state('edit.editCOTrigger', {
     url: "editCOTrigger",        
     views:{
      "left":{templateUrl: '/linker/js/cObject/partials/addcObject.ejs'}, 
      "editor":{templateUrl: '/linker/js/cOTrigger/partials/editCOTrigger.ejs'}  
    }, 

  })
    .state('edit.editCOAction', {
     url: "editCOAction",        
     views:{
      "left":{templateUrl: '/linker/js/cObject/partials/addcObject.ejs'}, 
      "editor":{templateUrl: '/linker/js/cOAction/partials/editCOAction.ejs'}  
    } 
  })
    .state('edit.addwService', {         
      views:{
        "left":{templateUrl: '/linker/js/wService/partials/addwService.ejs'}  
      }, 
    })
    .state('edit.editWSData', {
     url: "editWSData",        
     views:{
      "left":{templateUrl: '/linker/js/wService/partials/addwService.ejs'}, 
      "editor":{templateUrl: '/linker/js/wSData/partials/editWSData.ejs'}  
    }, 

  })
    .state('edit.editWSTrigger', {
     url: "editWSTrigger",        
     views:{
      "left":{templateUrl: '/linker/js/wService/partials/addwService.ejs'}, 
      "editor":{templateUrl: '/linker/js/wSTrigger/partials/editWSTrigger.ejs'}  
    }, 

  })
    .state('edit.editWSAction', {
     url: "editWSAction",        
     views:{
      "left":{templateUrl: '/linker/js/wService/partials/addwService.ejs'}, 
      "editor":{templateUrl: '/linker/js/wSAction/partials/editWSAction.ejs'}  
    } 
  })

  }
  ]);






project.directive('systemDiagram', function($timeout) {
  return {
    restrict:'AE',
        //replace: true,
        link: function(scope,elem,attrs){

          $(document).ready(function(){
            setTimeout(function(){
              SDElem=$("#systemDiagram");
              offsetX=SDElem.offset().left;
              offsetY=SDElem.offset().top;
              scope.updateConnections();  
            }, 500);
          });
        },
        templateUrl: "/linker/js/project/partials/systemDiagram.ejs",
      };
    });






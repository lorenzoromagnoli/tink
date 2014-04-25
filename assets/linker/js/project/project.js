
var project = angular.module('app.project', ['ngRoute']);

 
project.controller('projectCtrl', ['$scope','$route', '$routeParams','$location', 'Project', '$state','COData','CObject','COTrigger','COAction','Connection','$timeout',

 	function($scope, $routeParams, $route, $location, Project, $state, COData,CObject,COTrigger,COAction, Connection, $timeout) {

		$scope.$watch('projectId', function () {//wait until the variable is initialized
    		
 		  var id=$scope.projectId;
	  	var project = Project.show({projectId:id}, function(){

	  		$scope.project=project;
  		 	$scope.name=project.name;

  		 	$scope.cObjects=project.cObjects;
        $scope.connectionsid=project.connections;
        console.log($scope.connectionsid);
  
        $scope.selectedCObject;


      
        if(project.cObjects){ //if cObjects are already part of the project

          //set as default the first element as the active one
          $scope.selectedCObject=project.cObjects[0]; 

        $scope.selectedCObject.cOTriggers=new Array();
        $scope.selectedCObject.cODatas=new Array();
        $scope.selectedCObject.cOActions=new Array();
        
          //get all the COData actions
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


        }

        $scope.connections=new Array();
        


		  });		
	  }); 
    $scope.selectedCObject==new Array();
    $scope.selectCobject =function(cObject){
      $scope.selectedCObject=cObject;
      //console.log($scope.selectdCObject);
      $state.go('edit.addcObject');
      
      if(!$scope.selectedCObject.cOTriggers){
        $scope.selectedCObject.cOTriggers=new Array();
      }
      if(!$scope.selectedCObject.cODatas){
        $scope.selectedCObject.cODatas=new Array();

      }
      if(!$scope.selectedCObject.cOActions){
        $scope.selectedCObject.cOActions=new Array();

      }
    }


    $scope.selectedCOData=new Array(); 
    $scope.selectCOData =function(cOData){
      $scope.selectedCOData=cOData;
      //console.log($scope.selectdCObject);
      $state.go('edit.editCOData');
    }

    $scope.selectedCOTrigger=new Array(); 
    $scope.selectCOTrigger =function(cOTrigger){
      $scope.selectedCOTrigger=cOTrigger;
      //console.log($scope.selectdCObject);
      $state.go('edit.editCOTrigger');
    }

    $scope.selectedCOAction=null; 
    $scope.selectCOAction =function(cOAction){
      $scope.selectedCOAction=cOAction;
      //console.log($scope.selectdCObject);
      $state.go('edit.editCOAction');
    }

    var dragStarted=false;
    var dragArrowStarted=false;
    var calcOffsetX;
    var calcOffsetY;
    var scrollX;
    var scrollY;

    $scope.mouseDown=function(mouseEvent){
      


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

      //console.log("offset",offsetX,offsetY)

      //console.log("scroll",scrollX,scrollY);
      
      //console.log("calcOffset",calcOffsetX,calcOffsetY)

    //console.log($(elem).attr('class'));
    
    //console.log($(elem).hasClass('out'));



      if ($(elem).hasClass("start")){
        dragArrowStarted=true;
        console.log("I start a new arrow");
        
        outputID=elem.id;
        console.log(outputID);

        // var newX1=mouseEvent.clientX-calcOffsetX;
        // var newY1=mouseEvent.clientY-calcOffsetY;

        var newX1=$('#'+outputID+".start").offset().left-offsetX ;
        var newY1=$('#'+outputID+".start").offset().top-offsetY;

        $scope.connections.push({x1:newX1,y1:newY1,x2:newX1,y2:newY1});
        $scope.connectionsid.push({start:outputID, end:null});
      }
    }

    $scope.mouseMove=function(mouseEvent){
      if(dragArrowStarted){
        $scope.connections[$scope.connections.length-1].x2=mouseEvent.clientX-calcOffsetX;
        $scope.connections[$scope.connections.length-1].y2=mouseEvent.clientY-calcOffsetY;
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
            console.log(inputId);

            
            console.log($scope.connectionsid);
            console.log($scope.connections);


            $scope.connectionsid[$scope.connectionsid.length-1].end=inputId;
            updateConnections();
            
            var projectID=$scope.projectId;
            var startID=$scope.connectionsid[$scope.connectionsid.length-1].start;
            var endID=$scope.connectionsid[$scope.connectionsid.length-1].end;
            console.log(projectID)

            Connection.salva({project:projectID,start:startID,end:endID}, function(){
              //console.log("newAction", connection);
                //$scope.$parent.cObjects.push(cObject);
               //$scope.$parent.selectedCObject.connections.push(connection);
            });

            updateConnections();
          }else{
            $scope.connectionsid.pop();
            $scope.connections.pop();

          }
          //updateConnections();
         // console.log($scope.connectionsid);

      }
      dragArrowStarted=false;
      dragStarted=false;



    }

    $scope.updateConnections=function(){

      var newConnections=new Array();
      $scope.connectionsid.forEach(function(entry,i) {
         //console.log(entry.start);
        
        // console.log($('#'+entry.start));


        x1=$('#'+entry.start+'.start').offset().left-offsetX ;
        y1=$('#'+entry.start+'.start').offset().top-offsetY;

      console.log($('#'+entry.end));

      console.log($('#'+entry.end+'.end'));

        x2=$('#'+entry.end+'.end').offset().left-offsetX;
        y2=$('#'+entry.end+'.end').offset().top-offsetY;
         console.log("updatingConnections",x1,y1,x2,y2);

        //console.log("offset",x1);
        newConnections[i]={x1:x1, y1:y1, x2:x2, y2:y2}
      });
        $scope.connections=newConnections
        console.log($scope.connectionsid);

        console.log($scope.connections);

    }


}]);



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
                } 
            })
          .state('edit.editCOData', {
                 url: "editCOData",        
                views:{
                  "left":{templateUrl: '/linker/js/cObject/partials/addcObject.ejs'}, 
                "editor":{templateUrl: '/linker/js/cOData/partials/editCOData.ejs'}  
                } 
            })
            .state('edit.editCOTrigger', {
                 url: "editCOTrigger",        
                views:{
                  "left":{templateUrl: '/linker/js/cObject/partials/addcObject.ejs'}, 
                "editor":{templateUrl: '/linker/js/cOTrigger/partials/editCOTrigger.ejs'}  
                } 
            })
            .state('edit.editCOAction', {
                 url: "editCOAction",        
                views:{
                  "left":{templateUrl: '/linker/js/cObject/partials/addcObject.ejs'}, 
                "editor":{templateUrl: '/linker/js/cOAction/partials/editCOAction.ejs'}  
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







var project = angular.module('app.project', ['ngRoute']);

 
project.controller('projectCtrl', ['$scope','$route', '$routeParams','$location', 'Project', '$state', 

 	function($scope, $routeParams, $route, $location, Project, $state) {

		$scope.$watch('projectId', function () {//wait until the variable is initialized
    		
 		  var id=$scope.projectId;
	  	var project = Project.show({projectId:id}, function(){

	  		$scope.project=project;
  		 	$scope.name=project.name;

  		 	$scope.cObjects=project.cObjects;
  		 
  		 	// console.log('ascemo!!!!');
  		 	// console.log(project);

         $scope.selectedCObject;
      
      if(project.cObjects){ 
        $scope.selectedCObject=project.cObjects[0];
      } 

		});		
	}); 

  $scope.selectCobject =function(cObject){
    $scope.selectedCObject=cObject;
    //console.log($scope.selectdCObject);
    $state.go('edit.addcObject');
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
                "left":{templateUrl: '/linker/js/project/partials/addcObject.ejs'}  
                } 
            })

    }
 ]);


project.directive('systemDiagram', function() {
    return {
        restrict:'AE',
        //replace: true,
        link: function(scope,elem,attrs){
        },
        templateUrl: "/linker/js/project/partials/systemDiagram.ejs",
    };
});





// project.directive('snapSystemDiagram', function() {

//   return{
//     restrict:'EA',
//     scope:{
//       cObjects:'='
//     },
//     link: function link(scope, element, attrs) {
//         cObjects=scope.cObjects;


//       var moveStarted = function (dx, dy, posx, posy) {
//       };
//           var moveFunc = function (dx, dy, posx, posy) {
//           this.lx = dx + this.ox;
//           this.ly = dy + this.oy;
//           this.transform('t' +  this.lx + ',' +  this.ly);

//       };
//       var moveStopped = function (dx, dy, posx, posy) {
//             console.log("move stopped")
//             this.ox = this.lx;
//             this.oy = this.ly;

//       };


//       function updateGraph(){

//         var s = Snap(element[0]);
//         var displayElement= new Array();

//         console.log("updating graph");    
//         if(cObjects){
//           for (var i=0;i<cObjects.length;i++){ 

//             //create an empty group
//             displayElement[i]=s.g();


//             //set variable I'll use for the dragging
//             displayElement[i]["ox"]=cObjects[i].positionX;
//             displayElement[i]["oy"]=cObjects[i].positionY;
//             displayElement[i]["lx"]=0;
//             displayElement[i]["ly"]=0;


//             //add the title
//             title=s.text(1,1, cObjects[i].name);
//             //add a dot
//             circle=s.circle(1,20, 20);

//             //add elements to the group
//             displayElement[i].add(title, circle);

//             //move elements to position read in the DB
//             displayElement[i].transform("t"+cObjects[i].positionX+","+cObjects[i].positionY);

//             //create the dragging event
//             displayElement[i].drag(moveFunc,moveStarted,moveStopped)
//           }      
//         }
//       }
//       scope.$watch('cObjects', function(newVals, OldVals){
//         console.log("cObjects è cambiato");
//         console.log(value);
//         updateGraph();
//       });

//     updateGraph();
//     }
//   }

// });




// project.directive('snapSystemDiagram', function() {


//   function link(scope, element, attrs) {
//       cObjects=scope.cObjects;


// 		var moveStarted = function (dx, dy, posx, posy) {
// 		};
//         var moveFunc = function (dx, dy, posx, posy) {
// 	    	this.lx = dx + this.ox;
// 	    	this.ly = dy + this.oy;
// 	     	this.transform('t' +  this.lx + ',' +  this.ly);

// 		};
// 		var moveStopped = function (dx, dy, posx, posy) {
//         	console.log("move stopped")
//         	this.ox = this.lx;
//         	this.oy = this.ly;

// 		};


//     function updateGraph(){

//       var s = Snap(element[0]);
//       var displayElement= new Array();

//       console.log("updating graph");    
//       if(cObjects){
//         for (var i=0;i<cObjects.length;i++){ 

//           //create an empty group
//           displayElement[i]=s.g();


//           //set variable I'll use for the dragging
//           displayElement[i]["ox"]=cObjects[i].positionX;
//           displayElement[i]["oy"]=cObjects[i].positionY;
//           displayElement[i]["lx"]=0;
//           displayElement[i]["ly"]=0;


//           //add the title
//           title=s.text(1,1, cObjects[i].name);
//           //add a dot
//           circle=s.circle(1,20, 20);

//           //add elements to the group
//           displayElement[i].add(title, circle);

//           //move elements to position read in the DB
//           displayElement[i].transform("t"+cObjects[i].positionX+","+cObjects[i].positionY);

//           //create the dragging event
//           displayElement[i].drag(moveFunc,moveStarted,moveStopped)
//         }      
// 			}
// 		}
//     scope.$watch(scope.cObjects, function(value){
//       console.log("cObjects è cambiato");
//             console.log(value);

//       updateGraph();
//     });

//   updateGraph();
//   }
//     return {
//       link: link
//     };

// });





var cObject = angular.module('app.cObject', ['ngRoute']);

 
cObject.controller('cObjectCtrl', ['$scope','$route', '$routeParams','$location', 'CObject', 

    function($scope, $routeParams, $route, $location, CObject ) {

   //      $scope.$watch('$parent.selectedCObject', function () {//wait until the variable is initialized
            

     //         var cObject = CObject.get({cObjectId:id}, function(){

        // });
    // });
   
        // $scope.create=CObject.save({ProjectId:projectid}, function(){

        // })
        $scope.setObjectData=function(cO){
            $scope.name=cO.name;
            $scope.bigImage='/images/'+cO.image+'_big.png';
            $scope.smallImage='/images/'+cO.image+'_big.png';
            $scope.id=cO.id;
            console.log($scope.bigImage);
        }

        $scope.create = function() {
            var projectid=$scope.$parent.projectId; 

            var cObject=CObject.salva({project:projectid}, function(){

                console.log(cObject);
                $scope.$parent.cObjects.push(cObject);
                $scope.$parent.selectedCObject=cObject;
               console.log($scope.$parent.selectedCObject);
            });
        }


        $scope.updateName=function(){
            cObjectId=$scope.$parent.selectedCObject.id; 
            newname=$scope.$parent.selectedCObject.name;
            CObject.update({id:cObjectId, name: newname});
            console.log("nameUpdated");
        }

        $scope.updatePosition=function(){
            cObjectId=cObjectDragged.id;
            newPositionX=cObjectDragged.positionX;
            newPositionY=cObjectDragged.positionY;

            CObject.update({
                id:cObjectId, 
                positionX:newPositionX, 
                positionY:newPositionY
            });
            
            console.log("positionUpdated");
        }

      var dragStarted=false;
      var cObjectDragged;
      var startingPositionX;
      var startingPositionY;

      $scope.objectDragStarted=function(dragEvent,cObject){
        //console.log(dragEvent);
        dragStarted=true;
        cObjectDragged=cObject;
        console.log(cObjectDragged);
        startingX=cObjectDragged.positionX;
        startingY=cObjectDragged.positionY;
        startingMouseX=dragEvent.clientX;
        startingMouseY=dragEvent.clientY;
      }
      
      $scope.objectDragFinished=function(dragEvent){
        $scope.updatePosition();
        console.log(dragEvent);
        dragStarted=false;
        cObjectDragged=null;
        startingPositionX=0;
        startingPositionY=0;
      }

      $scope.objectDrag=function(dragEvent, cObject){
        if(dragStarted){
         //  console.log("offset",dragEvent.offsetX, dragEvent.offsetY);
          // console.log("client",dragEvent.clientX, dragEvent.clientY);
          var newPositionX=-startingMouseX+dragEvent.clientX+startingX;
          var newPositionY=-startingMouseY+dragEvent.clientY+startingY;

          cObjectDragged.positionX=newPositionX;
          cObjectDragged.positionY=newPositionY;

        }
      }



    }
]);


 cObject.factory('CObject', ['$resource',function($resource){
     return $resource('/cObject/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{project:'@id'}, url:'/cObject/create/' },
            'find': {method:'GET', params:{id:'@id'}, url:'/cObject/find/' },
         
            'update': {
                method:'POST', 
                params:{
                    id:'@id', 
                    name:'@name',
                    positionX:'@positionX',
                    positionY:'@positionY'

                }, 
                url:'/cObject/update/:id' 
            }


        });

}]);



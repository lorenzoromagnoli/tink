
var cObject = angular.module('app.cObject', ['ngRoute']);

 
cObject.controller('cObjectCtrl', ['$scope','$route', '$routeParams','$location', 'CObject', '$state', 

    function($scope, $routeParams, $route, $location, CObject, $state ) {

   //      $scope.$watch('$parent.selectedCObject', function () {//wait until the variable is initialized
            

     //         var cObject = CObject.get({cObjectId:id}, function(){

        // });
    // });
   
        // $scope.create=CObject.save({ProjectId:projectid}, function(){

        // })
        $scope.setObjectData=function(cO){
            $scope.name=cO.name;
            $scope.bigImage='/images/'+cO.image+'_big.png';
            $scope.smallImage='/images/'+cO.image+'_small.png';
            $scope.id=cO.id;
            
           // console.log('init',cO);
        }

        $scope.create = function() {
            var projectid=$scope.$parent.projectId; 

            var cObject=CObject.salva({
              project:projectid, 
              name: "New Object"}, 

              function(c){


                var newCobject={name:cObject.name, 
                                bigImage:cObject.bigImage, 
                                id:cObject.id, 
                                image:cObject.image, 
                                positionX: cObject.positionX,
                                positionY: cObject.positionY,
 }


                console.log(newCobject);

                //add newCobject to entities
                $scope.$parent.entities.push(newCobject);
                console.log("entities",$scope.$parent.entities);

                //add newCobject to cobjects
                $scope.$parent.cObjects.push(newCobject);
                console.log("cObjects", $scope.$parent.cObjects);


                //select entity
                $scope.$parent.selectCobject(newCobject.id);
                console.log("entities",$scope.$parent.entities);
            });
        }
      
      $scope.delete=function(){
        id=$scope.$parent.selectedEntity.id;
        console.log ("deleting",id);

         for (i=0; i<$scope.entities.length;i++){
            if ($scope.entities[i]){
              if (id==$scope.entities[i].id){


                var arrIndex=$scope.$parent.cObjects.indexOf($scope.entities[i]);
                //delete from the entities array
                $scope.$parent.entities.splice(i,1);
                //delete from the cObjects array
                $scope.$parent.cObjects.splice(arrIndex,1);     
                
                CObject.delete({
                  id:id

                });
                console.log("deleting id "+id);
                
                $state.go('edit');

                break;
              }
            }
          } 
        }


        $scope.updateName=function(id,name){
            CObject.update({id:id, name: name});
            //console.log("nameUpdated");
        }
    }
]);

 cObject.factory('CObject', ['$resource',function($resource){
     return $resource('/cObject/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{project:'@id'}, url:'/cObject/create/' },
            'find': {method:'GET', params:{id:'@id'}, url:'/cObject/cObject/find/' },
            'getCOData': {method:'GET', params:{id:'@id'}, url:'/cObject/getCOData/:id'},
            'getCOTrigger': {method:'GET', params:{id:'@id'}, url:'/cObject/getCOTrigger/:id'},
            'getCOAction': {method:'GET', params:{id:'@id'}, url:'/cObject/getCOAction/:id'},
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/cObject/destroy/:id' },

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



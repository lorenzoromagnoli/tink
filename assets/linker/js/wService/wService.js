
var wService = angular.module('app.wService', ['ngRoute']);

 
wService.controller('wServiceCtrl', ['$scope','$route', '$routeParams','$location', 'WService', '$state', 

    function($scope, $routeParams, $route, $location, WService, $state ) {

   //      $scope.$watch('$parent.selectedWService', function () {//wait until the variable is initialized
            

     //         var wService = WService.get({wServiceId:id}, function(){

        // });
    // });
   
        // $scope.create=WService.save({ProjectId:projectid}, function(){

        // })
        $scope.setObjectData=function(wS){
            $scope.name=wS.name;
            $scope.bigImage='/images/'+wS.image+'_big.png';
            $scope.smallImage='/images/'+wS.image+'_small.png';
            $scope.id=wS.id;
            
           // console.log('init',wS);
        }

        $scope.create = function() {
            var projectid=$scope.$parent.projectId; 

            var wService=WService.salva({
              project:projectid, 
              name: "New Web Service"}, 

              function(w){


                var newWservice={name:w.name, 
                                bigImage:w.bigImage, 
                                id:w.id, 
                                image:w.image, 
                                positionX: w.positionX,
                                positionY: w.positionY,
 }


                console.log(newWservice);

                //add newWservice to entities
                $scope.$parent.entities.push(newWservice);
                console.log("entities",$scope.$parent.entities);

                //add newWservice to wservices
                $scope.$parent.wServices.push(newWservice);
                console.log("wServices", $scope.$parent.wServices);


                //select entity
                $scope.$parent.selectWservice(newWservice.id);
                console.log("entities",$scope.$parent.entities);
            });
        }
      
      $scope.delete=function(){
        id=$scope.$parent.selectedEntity.id;
        for (i=0; i<$scope.entities.length;i++){
            if ($scope.entities[i]){
              if (id==$scope.entities[i].id){


                var arrIndex=$scope.$parent.wServices.indexOf($scope.entities[i]);
                //delete from the entities array
                $scope.$parent.entities.splice(i,1);
                //delete from the cObjects array
                $scope.$parent.wServices.splice(arrIndex,1);     
                
                WService.delete({
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
            WService.update({id:id, name: name});
            //console.log("nameUpdated");
        }
    }
]);

 wService.factory('WService', ['$resource',function($resource){
     return $resource('/wService/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{project:'@id'}, url:'/wService/create/' },
            'find': {method:'GET', params:{id:'@id'}, url:'/wService/wService/find/' },
            'getWSData': {method:'GET', params:{id:'@id'}, url:'/wService/getWSData/:id'},
            'getWSTrigger': {method:'GET', params:{id:'@id'}, url:'/wService/getWSTrigger/:id'},
            'getWSAction': {method:'GET', params:{id:'@id'}, url:'/wService/getWSAction/:id'},
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/wService/destroy/:id' },

            'update': {
                method:'POST', 
                params:{
                    id:'@id', 
                    name:'@name',
                    positionX:'@positionX',
                    positionY:'@positionY'

                }, 
                url:'/wService/update/:id' 
            }


        });

}]);



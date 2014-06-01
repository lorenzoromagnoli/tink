
var dAnalyst = angular.module('app.dAnalyst', ['ngRoute']);

 
dAnalyst.controller('dAnalystCtrl', ['$scope','$route', '$routeParams','$location', 'DAnalyst', '$state', 

    function($scope, $routeParams, $route, $location, DAnalyst, $state ) {

   //      $scope.$watch('$parent.selectedDAnalyst', function () {//wait until the variable is initialized
            

     //         var dAnalyst = DAnalyst.get({dAnalystId:id}, function(){

        // });
    // });
   
        // $scope.create=DAnalyst.save({ProjectId:projectid}, function(){

        // })
        $scope.setObjectData=function(dA){
            $scope.name=dA.name;
            $scope.bigImage='/images/'+dA.image+'_big.png';
            $scope.smallImage='/images/'+dA.image+'_small.png';
            $scope.id=dA.id;
            
           // console.log('init',dA);
        }

        $scope.create = function() {
            var projectid=$scope.$parent.projectId; 

            var dAnalyst=DAnalyst.salva({
              project:projectid, 
              name: "Data Analyst"}, 

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
                $scope.$parent.dAnalysts.push(newWservice);
                console.log("dAnalysts", $scope.$parent.dAnalysts);


                //select entity
                $scope.$parent.selectDAnalyst(newWservice.id);
                console.log("entities",$scope.$parent.entities);
            });
        }
      
      $scope.delete=function(){
        id=$scope.$parent.selectedEntity.id;
        for (i=0; i<$scope.entities.length;i++){
            if ($scope.entities[i]){
              if (id==$scope.entities[i].id){


                var arrIndex=$scope.$parent.dAnalysts.indexOf($scope.entities[i]);
                //delete from the entities array
                $scope.$parent.entities.splice(i,1);
                //delete from the cObjects array
                $scope.$parent.dAnalysts.splice(arrIndex,1);     
                
                DAnalyst.delete({
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
            DAnalyst.update({id:id, name: name});
            //console.log("nameUpdated");
        }
    }
]);

 dAnalyst.factory('DAnalyst', ['$resource',function($resource){
     return $resource('/dAnalyst/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{project:'@id'}, url:'/dAnalyst/create/' },
            'find': {method:'GET', params:{id:'@id'}, url:'/dAnalyst/dAnalyst/find/' },
            'getDAData': {method:'GET', params:{id:'@id'}, url:'/dAnalyst/getDAData/:id'},
            'getDATrigger': {method:'GET', params:{id:'@id'}, url:'/dAnalyst/getDATrigger/:id'},
            'getDAAction': {method:'GET', params:{id:'@id'}, url:'/dAnalyst/getDAAction/:id'},
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/dAnalyst/destroy/:id' },

            'update': {
                method:'POST', 
                params:{
                    id:'@id', 
                    name:'@name',
                    positionX:'@positionX',
                    positionY:'@positionY'

                }, 
                url:'/dAnalyst/update/:id' 
            }


        });

}]);



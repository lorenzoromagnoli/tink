
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
            $scope.smallImage='/images/'+cO.image+'_big.png';
            $scope.id=cO.id;
            
           // console.log('init',cO);
        }

        $scope.create = function() {
            var projectid=$scope.$parent.projectId; 

            var cObject=CObject.salva({
              project:projectid, 
              name: "New Object"}, 

              function(){
                console.log(cObject);
                $scope.$parent.cObjects.push(cObject);
                $scope.$parent.selectCobject(cObject);
             //  console.log($scope.$parent.selectedCObject);
            });
        }
      
      $scope.delete=function(){

        var arrIndex=$scope.$parent.cObjects.indexOf($scope.$parent.selectedCObject);
            $scope.$parent.cObjects.splice(arrIndex,1);

            CObject.delete({
              id:$scope.$parent.selectedCObject.id

            });
            console.log("deleting id "+ $scope.id);
            $scope.$parent.selectCobject(null);
        }


        $scope.updateName=function(){
            cObjectId=$scope.$parent.selectedCObject.id; 
            newname=$scope.$parent.selectedCObject.name;
            CObject.update({id:cObjectId, name: newname});
            //console.log("nameUpdated");
        }

    }
]);

 cObject.factory('CObject', ['$resource',function($resource){
     return $resource('/cObject/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{project:'@id'}, url:'/cObject/create/' },
            'find': {method:'GET', params:{id:'@id'}, url:'/cObject/find/' },
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



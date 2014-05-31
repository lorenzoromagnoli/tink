
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
            $scope.smallImage='/images/'+wS.image+'_big.png';
            $scope.id=wS.id;
            
           // console.log('init',wS);
        }

        $scope.create = function() {
            var projectid=$scope.$parent.projectId; 

            var wService=WService.salva({
              project:projectid, 
              name: "New Object"}, 

              function(){
                console.log(wService);
                $scope.$parent.wServices.push(wService);
                $scope.$parent.selectCobject(wService);
             //  console.log($scope.$parent.selectedWService);
            });
        }
      
      $scope.delete=function(){

        var arrIndex=$scope.$parent.wServices.indexOf($scope.$parent.selectedWService);
            $scope.$parent.wServices.splice(arrIndex,1);

            WService.delete({
              id:$scope.$parent.selectedWService.id

            });
            console.log("deleting id "+ $scope.id);
            $scope.$parent.selectCobject(null);
        }


        $scope.updateName=function(){
            wServiceId=$scope.$parent.selectedWService.id; 
            newname=$scope.$parent.selectedWService.name;
            WService.update({id:wServiceId, name: newname});
            //console.log("nameUpdated");
        }

    }
]);

 wService.factory('WService', ['$resource',function($resource){
     return $resource('/wService/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{project:'@id'}, url:'/wService/create/' },
            'find': {method:'GET', params:{id:'@id'}, url:'/wService/find/' },
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



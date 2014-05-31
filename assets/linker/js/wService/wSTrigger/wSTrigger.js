
var wSTrigger = angular.module('app.wSTrigger', ['ngRoute']);

 
wSTrigger.controller('wSTriggerCtrl', ['$scope','$route', '$routeParams','$location', 'WSTrigger', '$state', 'Connection',

    function($scope, $routeParams, $route, $location, WSTrigger ,$state, Connection) {

         $scope.$watch('$scope.$parent.selectedWSTrigger', function () {//wait until the variable is initialized
            //console.log('update selectedWSTrigger',$scope.$parent.selectedWSTrigger);
            
            if($scope.$parent.selectedWSTrigger){
                $scope.id=$scope.$parent.selectedWSTrigger.id; 
                $scope.name=$scope.$parent.selectedWSTrigger.codeVariables;
                $scope.codeVariables= $scope.$parent.selectedWSTrigger.codeVariables;
                $scope.codeSetup= $scope.$parent.selectedWSTrigger.codeSetup;
                $scope.codeFunction= $scope.$parent.selectedWSTrigger.codefunction;
            }
         })    

        $scope.create = function() {
          console.log("create");
            var wServiceId=$scope.$parent.selectedEntity.id;    
                console.log("create trigger",wServiceId);

            var wSTrigger=WSTrigger.salva({wService:wServiceId}, function(){
              console.log("newTrigger", wSTrigger);
                //$scope.$parent.wServices.push(wService);
                console.log($scope.$parent.selectedEntity.wSTriggers);
               $scope.$parent.selectedEntity.wSTriggers.push(wSTrigger);
            });
        }

        $scope.delete=function(){

            var arrIndex=$scope.$parent.selectedEntity.wSTriggers.indexOf($scope.$parent.selectedWSTrigger);
            $scope.$parent.selectedEntity.wSTriggers.splice(arrIndex,1);
            console.log(arrIndex);

            WSTrigger.delete({
              id:$scope.id 
            });


            for(i=0;i<$scope.$parent.connectionsid.length;i++){
              console.log('startId', $scope.$parent.connectionsid[i].start)

              if ($scope.$parent.connectionsid[i].start==$scope.id || $scope.$parent.connectionsid[i].end==$scope.id ){
                Connection.delete({
                  id:$scope.$parent.connectionsid[i].id
                });
                $scope.$parent.connections.splice(i,1)
                $scope.$parent.connectionsid.splice(i,1)
              }
            }



            $scope.$parent.selectWSTrigger(null);
            $state.go('edit.addwService');
        }

        $scope.updateName=function(){
            wSTriggerId=$scope.$parent.selectedWSTrigger.id; 
            newname=$scope.$parent.selectedWSTrigger.name;
            WSTrigger.update({id:wSTriggerId, name: newname});
            //console.log("nameUpdated");
        }

        $scope.updateCode=function(){
            wSTriggerId=$scope.$parent.selectedWSTrigger.id; 
            
            newCodeVariables=$scope.codeVariables;
            newCodeSetup=$scope.codeSetup;
            newCodeFunction=$scope.codeFunction;

            WSTrigger.update({
              id:wSTriggerId, 
              codeVariables:newCodeVariables,
              codeSetup:newCodeSetup,
              codeFunction:newCodeFunction,
            });

            console.log(newCodeVariables);
            updateParent();
            $scope.$parent.selectWSTrigger(null);
            $state.go('edit.addwService');


        }

        var updateParent= function(){
              $scope.$parent.selectedWSTrigger.codeVariables = $scope.codeVariables;
              $scope.$parent.selectedWSTrigger.codeSetup = $scope.codeSetup;
              $scope.$parent.selectedWSTrigger.codefunction = $scope.codeFunction;
              
        }



    }
]);


 wSTrigger.factory('WSTrigger', ['$resource',function($resource){
     return $resource('/wService/wSTrigger/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{wService:'@id'}, url:'/wService/wSTrigger/create/' },
            'find': {method:'GET', params:{wService:'@wService'}, url:'/wService/wSTrigger/find/' },
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/wService/wSTrigger/destroy/:id' },

             'update': {
                 method:'POST', 
                 params:{
                     id:'@id', 
                     name:'@name',
                     codeVariables:'@codeVariables',
                     codeSetup:'@codeSetup',
                     codeFunction:'@codeFunction'
                 }, 
                 url:'/wService/wSTrigger/update/:id' 
             }


        });

}]);



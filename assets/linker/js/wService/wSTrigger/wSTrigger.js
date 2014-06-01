
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

        $scope.delete=function(id){

            var arrIndex=$scope.$parent.selectedEntity.wSTriggers.indexOf($scope.$parent.selectedWSTrigger);
            $scope.$parent.selectedEntity.wSTriggers.splice(arrIndex,1);
            console.log("delete", id);

            WSTrigger.delete({
              id: id
            });
                       //serach there where connections and delete those
            $scope.$parent.deleteConnectionsbyActionID(id);


           // $scope.$parent.selectWSTrigger(null);
            $state.go('edit.addwService');
        }


        $scope.updateName=function(id, newname){
            WSTrigger.update({id:id, name: newname});
            console.log("nameUpdated");
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
     return $resource('/wSTrigger/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{wService:'@id'}, url:'/wSTrigger/create/' },
            'find': {method:'GET', params:{wService:'@wService'}, url:'/wSTrigger/find/' },
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/wSTrigger/delete/:id' },

             'update': {
                 method:'POST', 
                 params:{
                     id:'@id', 
                     name:'@name',
                     codeVariables:'@codeVariables',
                     codeSetup:'@codeSetup',
                     codeFunction:'@codeFunction'
                 }, 
                 url:'/wSTrigger/update/:id' 
             }


        });

}]);



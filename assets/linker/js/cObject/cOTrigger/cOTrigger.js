
var cOTrigger = angular.module('app.cOTrigger', ['ngRoute']);

 
cOTrigger.controller('cOTriggerCtrl', ['$scope','$route', '$routeParams','$location', 'COTrigger', '$state', 'Connection',

    function($scope, $routeParams, $route, $location, COTrigger ,$state, Connection) {

         $scope.$watch('$scope.$parent.selectedCOTrigger', function () {//wait until the variable is initialized
            //console.log('update selectedCOTrigger',$scope.$parent.selectedCOTrigger);
            
            if($scope.$parent.selectedCOTrigger){
                $scope.id=$scope.$parent.selectedCOTrigger.id; 
                $scope.name=$scope.$parent.selectedCOTrigger.codeVariables;
                $scope.codeVariables= $scope.$parent.selectedCOTrigger.codeVariables;
                $scope.codeSetup= $scope.$parent.selectedCOTrigger.codeSetup;
                $scope.codeFunction= $scope.$parent.selectedCOTrigger.codefunction;
            }
         })    

        $scope.create = function() {
          console.log("create");
            var cObjectId=$scope.$parent.selectedEntity.id;    
                console.log("create trigger",cObjectId);

            var cOTrigger=COTrigger.salva({cObject:cObjectId}, function(){
              console.log("newTrigger", cOTrigger);
                //$scope.$parent.cObjects.push(cObject);
                console.log($scope.$parent.selectedEntity.cOTriggers);
               $scope.$parent.selectedEntity.cOTriggers.push(cOTrigger);
            });
        }

        $scope.delete=function(id){

            var arrIndex=$scope.$parent.selectedEntity.cOTriggers.indexOf($scope.$parent.selectedCOTrigger);
            $scope.$parent.selectedEntity.cOTriggers.splice(arrIndex,1);
            console.log(arrIndex);

            COTrigger.delete({
              id:id 
            });
             
            $scope.$parent.selectCOTrigger(null);
            $state.go('edit.addcObject');
                       //serach there where connections and delete those
            $scope.$parent.deleteConnectionsbyActionID(id);


        }

        $scope.updateName=function(id, newname){
            COTrigger.update({id:id, name: newname});
            console.log("nameUpdated");
        }

        $scope.updateCode=function(){
            cOTriggerId=$scope.$parent.selectedCOTrigger.id; 
            
            newCodeVariables=$scope.codeVariables;
            newCodeSetup=$scope.codeSetup;
            newCodeFunction=$scope.codeFunction;

            COTrigger.update({
              id:cOTriggerId, 
              codeVariables:newCodeVariables,
              codeSetup:newCodeSetup,
              codeFunction:newCodeFunction,
            });

            console.log(newCodeVariables);
            updateParent();
            $scope.$parent.selectCOTrigger(null);
            $state.go('edit.addcObject');


        }

        var updateParent= function(){
              $scope.$parent.selectedCOTrigger.codeVariables = $scope.codeVariables;
              $scope.$parent.selectedCOTrigger.codeSetup = $scope.codeSetup;
              $scope.$parent.selectedCOTrigger.codefunction = $scope.codeFunction;
              
        }



    }
]);


 cOTrigger.factory('COTrigger', ['$resource',function($resource){
     return $resource('/cOTrigger/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{cObject:'@id'}, url:'/cOTrigger/create/' },
            'find': {method:'GET', params:{cObject:'@cObject'}, url:'/cOTrigger/find/' },
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/cOTrigger/delete/:id' },

             'update': {
                 method:'POST', 
                 params:{
                     id:'@id', 
                     name:'@name',
                     codeVariables:'@codeVariables',
                     codeSetup:'@codeSetup',
                     codeFunction:'@codeFunction'
                 }, 
                 url:'/cOTrigger/update/:id' 
             }


        });

}]);



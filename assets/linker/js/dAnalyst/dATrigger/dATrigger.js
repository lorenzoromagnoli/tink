
var dATrigger = angular.module('app.dATrigger', ['ngRoute']);

 
dATrigger.controller('dATriggerCtrl', ['$scope','$route', '$routeParams','$location', 'DATrigger', '$state', 'Connection',

    function($scope, $routeParams, $route, $location, DATrigger ,$state, Connection) {

         $scope.$watch('$scope.$parent.selectedDATrigger', function () {//wait until the variable is initialized
            //console.log('update selectedDATrigger',$scope.$parent.selectedDATrigger);
            
            if($scope.$parent.selectedDATrigger){
                $scope.id=$scope.$parent.selectedDATrigger.id; 
                $scope.name=$scope.$parent.selectedDATrigger.codeVariables;
                $scope.codeVariables= $scope.$parent.selectedDATrigger.codeVariables;
                $scope.codeSetup= $scope.$parent.selectedDATrigger.codeSetup;
                $scope.codeFunction= $scope.$parent.selectedDATrigger.codefunction;
            }
         })    

        $scope.create = function() {
          console.log("create");
            var dAnalystId=$scope.$parent.selectedEntity.id;    
                console.log("create trigger",dAnalystId);

            var dATrigger=DATrigger.salva({dAnalyst:dAnalystId}, function(){
              console.log("newTrigger", dATrigger);
                //$scope.$parent.dAnalysts.push(dAnalyst);
                console.log($scope.$parent.selectedEntity.dATriggers);
               $scope.$parent.selectedEntity.dATriggers.push(dATrigger);
            });
        }

        $scope.delete=function(id){

            var arrIndex=$scope.$parent.selectedEntity.dATriggers.indexOf($scope.$parent.selectedDATrigger);
            $scope.$parent.selectedEntity.dATriggers.splice(arrIndex,1);
            console.log("delete", id);

            DATrigger.delete({
              id: id
            });
                       //serach there where connections and delete those
            $scope.$parent.deleteConnectionsbyActionID(id);


           // $scope.$parent.selectDATrigger(null);
            $state.go('edit.adddAnalyst');
        }


        $scope.updateName=function(id, newname){
            DATrigger.update({id:id, name: newname});
            console.log("nameUpdated");
        }


        $scope.updateCode=function(){
            dATriggerId=$scope.$parent.selectedDATrigger.id; 
            
            newCodeVariables=$scope.codeVariables;
            newCodeSetup=$scope.codeSetup;
            newCodeFunction=$scope.codeFunction;

            DATrigger.update({
              id:dATriggerId, 
              codeVariables:newCodeVariables,
              codeSetup:newCodeSetup,
              codeFunction:newCodeFunction,
            });

            console.log(newCodeVariables);
            updateParent();
            $scope.$parent.selectDATrigger(null);
            $state.go('edit.adddAnalyst');


        }

        var updateParent= function(){
              $scope.$parent.selectedDATrigger.codeVariables = $scope.codeVariables;
              $scope.$parent.selectedDATrigger.codeSetup = $scope.codeSetup;
              $scope.$parent.selectedDATrigger.codefunction = $scope.codeFunction;
              
        }



    }
]);


 dATrigger.factory('DATrigger', ['$resource',function($resource){
     return $resource('/dATrigger/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{dAnalyst:'@id'}, url:'/dATrigger/create/' },
            'find': {method:'GET', params:{dAnalyst:'@dAnalyst'}, url:'/dATrigger/find/' },
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/dATrigger/delete/:id' },

             'update': {
                 method:'POST', 
                 params:{
                     id:'@id', 
                     name:'@name',
                     codeVariables:'@codeVariables',
                     codeSetup:'@codeSetup',
                     codeFunction:'@codeFunction'
                 }, 
                 url:'/dATrigger/update/:id' 
             }


        });

}]);



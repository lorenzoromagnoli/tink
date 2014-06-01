
var dAAction = angular.module('app.dAAction', ['ngRoute']);

 
dAAction.controller('dAActionCtrl', ['$scope','$route', '$routeParams','$location', 'DAAction', '$state', 

    function($scope, $routeParams, $route, $location, DAAction ,$state) {

         $scope.$watch('$scope.$parent.selectedDAAction', function () {//wait until the variable is initialized
            //console.log('update selectedDAAction',$scope.$parent.selectedDAAction);
            
            if($scope.$parent.selectedDAAction){
                $scope.id=$scope.$parent.selectedDAAction.id; 
                $scope.name=$scope.$parent.selectedDAAction.codeVariables;
                $scope.codeVariables= $scope.$parent.selectedDAAction.codeVariables;
                $scope.codeSetup= $scope.$parent.selectedDAAction.codeSetup;
                $scope.codeFunction= $scope.$parent.selectedDAAction.codefunction;
            }
         })    

        $scope.create = function() {
          console.log("create");
            var dAnalystId=$scope.$parent.selectedEntity.id; 
                
                console.log("create trigger",dAnalystId);

            var dAAction=DAAction.salva({dAnalyst:dAnalystId}, function(){
              console.log("newAction", dAAction);
                //$scope.$parent.dAnalysts.push(dAnalyst);
               $scope.$parent.selectedEntity.dAActions.push(dAAction);
            });
        }

        $scope.delete=function(id){

            var arrIndex=$scope.$parent.selectedEntity.dAActions.indexOf($scope.$parent.selectedDAAction);
            $scope.$parent.selectedEntity.dAActions.splice(arrIndex,1);
            console.log("delete",id);

            DAAction.delete({
              id:id 
            });
            //$scope.$parent.selectDAAction(null);
            $state.go('edit.adddAnalyst');

                                   //serach there where connections and delete those
            $scope.$parent.deleteConnectionsbyActionID(id);
        }

        $scope.updateName=function(id, newname){
            DAAction.update({id:id, name: newname});
            console.log("nameUpdated");
        }

        $scope.updateCode=function(){
            dAActionId=$scope.$parent.selectedDAAction.id; 
            
            newCodeVariables=$scope.codeVariables;
            newCodeSetup=$scope.codeSetup;
            newCodeFunction=$scope.codeFunction;

            DAAction.update({
              id:dAActionId, 
              codeVariables:newCodeVariables,
              codeSetup:newCodeSetup,
              codeFunction:newCodeFunction,
            });

            console.log(newCodeVariables);
            updateParent();
            $scope.$parent.selectDAAction(null);
            $state.go('edit.adddAnalyst');


        }

        var updateParent= function(){
              $scope.$parent.selectedDAAction.codeVariables = $scope.codeVariables;
              $scope.$parent.selectedDAAction.codeSetup = $scope.codeSetup;
              $scope.$parent.selectedDAAction.codefunction = $scope.codeFunction;
        }



    }
]);


 dAAction.factory('DAAction', ['$resource',function($resource){
     return $resource('/dAAction/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{dAnalyst:'@id'}, url:'/dAAction/create/' },
            'find': {method:'GET', params:{dAnalyst:'@dAnalyst'}, url:'/dAAction/find/' },
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/dAAction/delete/:id' },

             'update': {
                 method:'POST', 
                 params:{
                     id:'@id', 
                     name:'@name',
                     codeVariables:'@codeVariables',
                     codeSetup:'@codeSetup',
                     codeFunction:'@codeFunction'
                 }, 
                 url:'/dAAction/update/:id' 
             }


        });

}]);



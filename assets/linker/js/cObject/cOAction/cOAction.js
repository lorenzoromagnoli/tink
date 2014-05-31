
var cOAction = angular.module('app.cOAction', ['ngRoute']);

 
cOAction.controller('cOActionCtrl', ['$scope','$route', '$routeParams','$location', 'COAction', '$state', 

    function($scope, $routeParams, $route, $location, COAction ,$state) {

         $scope.$watch('$scope.$parent.selectedCOAction', function () {//wait until the variable is initialized
            //console.log('update selectedCOAction',$scope.$parent.selectedCOAction);
            
            if($scope.$parent.selectedCOAction){
                $scope.id=$scope.$parent.selectedCOAction.id; 
                $scope.name=$scope.$parent.selectedCOAction.codeVariables;
                $scope.codeVariables= $scope.$parent.selectedCOAction.codeVariables;
                $scope.codeSetup= $scope.$parent.selectedCOAction.codeSetup;
                $scope.codeFunction= $scope.$parent.selectedCOAction.codefunction;
            }
         })    

        $scope.create = function() {
          console.log("create");
            var cObjectId=$scope.$parent.selectedEntity.id; 
                
                console.log("create trigger",cObjectId);

            var cOAction=COAction.salva({cObject:cObjectId}, function(){
              console.log("newAction", cOAction);
                //$scope.$parent.cObjects.push(cObject);
               $scope.$parent.selectedEntity.cOActions.push(cOAction);
            });
        }

        $scope.delete=function(){

            var arrIndex=$scope.$parent.selectedEntity.cOActions.indexOf($scope.$parent.selectedCOAction);
            $scope.$parent.selectedEntity.cOActions.splice(arrIndex,1);
            console.log(arrIndex);

            COAction.delete({
              id:$scope.id 
            });
            $scope.$parent.selectCOAction(null);
            $state.go('edit.addcObject');
        }

        $scope.updateName=function(){
            cOActionId=$scope.$parent.selectedCOAction.id; 
            newname=$scope.$parent.selectedCOAction.name;
            COAction.update({id:cOActionId, name: newname});
            //console.log("nameUpdated");
        }

        $scope.updateCode=function(){
            cOActionId=$scope.$parent.selectedCOAction.id; 
            
            newCodeVariables=$scope.codeVariables;
            newCodeSetup=$scope.codeSetup;
            newCodeFunction=$scope.codeFunction;

            COAction.update({
              id:cOActionId, 
              codeVariables:newCodeVariables,
              codeSetup:newCodeSetup,
              codeFunction:newCodeFunction,
            });

            console.log(newCodeVariables);
            updateParent();
            $scope.$parent.selectCOAction(null);
            $state.go('edit.addcObject');


        }

        var updateParent= function(){
              $scope.$parent.selectedCOAction.codeVariables = $scope.codeVariables;
              $scope.$parent.selectedCOAction.codeSetup = $scope.codeSetup;
              $scope.$parent.selectedCOAction.codefunction = $scope.codeFunction;
        }



    }
]);


 cOAction.factory('COAction', ['$resource',function($resource){
     return $resource('/cOAction/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{cObject:'@id'}, url:'/cObject/cOAction/create/' },
            'find': {method:'GET', params:{cObject:'@cObject'}, url:'/cObject/cOAction/find/' },
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/cObject/cOAction/destroy/:id' },

             'update': {
                 method:'POST', 
                 params:{
                     id:'@id', 
                     name:'@name',
                     codeVariables:'@codeVariables',
                     codeSetup:'@codeSetup',
                     codeFunction:'@codeFunction'
                 }, 
                 url:'/cObject/cOAction/update/:id' 
             }


        });

}]);



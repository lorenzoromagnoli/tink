
var wSAction = angular.module('app.wSAction', ['ngRoute']);

 
wSAction.controller('wSActionCtrl', ['$scope','$route', '$routeParams','$location', 'WSAction', '$state', 

    function($scope, $routeParams, $route, $location, WSAction ,$state) {

         $scope.$watch('$scope.$parent.selectedWSAction', function () {//wait until the variable is initialized
            //console.log('update selectedWSAction',$scope.$parent.selectedWSAction);
            
            if($scope.$parent.selectedWSAction){
                $scope.id=$scope.$parent.selectedWSAction.id; 
                $scope.name=$scope.$parent.selectedWSAction.codeVariables;
                $scope.codeVariables= $scope.$parent.selectedWSAction.codeVariables;
                $scope.codeSetup= $scope.$parent.selectedWSAction.codeSetup;
                $scope.codeFunction= $scope.$parent.selectedWSAction.codefunction;
            }
         })    

        $scope.create = function() {
          console.log("create");
            var wServiceId=$scope.$parent.selectedEntity.id; 
                
                console.log("create trigger",wServiceId);

            var wSAction=WSAction.salva({wService:wServiceId}, function(){
              console.log("newAction", wSAction);
                //$scope.$parent.wServices.push(wService);
               $scope.$parent.selectedEntity.wSActions.push(wSAction);
            });
        }

        $scope.delete=function(id){

            var arrIndex=$scope.$parent.selectedEntity.wSActions.indexOf($scope.$parent.selectedWSAction);
            $scope.$parent.selectedEntity.wSActions.splice(arrIndex,1);
            console.log("delete",id);

            WSAction.delete({
              id:id 
            });
            //$scope.$parent.selectWSAction(null);
            $state.go('edit.addwService');

                                   //serach there where connections and delete those
            $scope.$parent.deleteConnectionsbyActionID(id);
        }

        $scope.updateName=function(id, newname){
            WSAction.update({id:id, name: newname});
            console.log("nameUpdated");
        }

        $scope.updateCode=function(){
            wSActionId=$scope.$parent.selectedWSAction.id; 
            
            newCodeVariables=$scope.codeVariables;
            newCodeSetup=$scope.codeSetup;
            newCodeFunction=$scope.codeFunction;

            WSAction.update({
              id:wSActionId, 
              codeVariables:newCodeVariables,
              codeSetup:newCodeSetup,
              codeFunction:newCodeFunction,
            });

            console.log(newCodeVariables);
            updateParent();
            $scope.$parent.selectWSAction(null);
            $state.go('edit.addwService');


        }

        var updateParent= function(){
              $scope.$parent.selectedWSAction.codeVariables = $scope.codeVariables;
              $scope.$parent.selectedWSAction.codeSetup = $scope.codeSetup;
              $scope.$parent.selectedWSAction.codefunction = $scope.codeFunction;
        }



    }
]);


 wSAction.factory('WSAction', ['$resource',function($resource){
     return $resource('/wSAction/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{wService:'@id'}, url:'/wSAction/create/' },
            'find': {method:'GET', params:{wService:'@wService'}, url:'/wSAction/find/' },
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/wSAction/delete/:id' },

             'update': {
                 method:'POST', 
                 params:{
                     id:'@id', 
                     name:'@name',
                     codeVariables:'@codeVariables',
                     codeSetup:'@codeSetup',
                     codeFunction:'@codeFunction'
                 }, 
                 url:'/wSAction/update/:id' 
             }


        });

}]);



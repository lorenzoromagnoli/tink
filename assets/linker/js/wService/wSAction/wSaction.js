
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
            var wSbjectId=$scope.$parent.selectedWService.id; 
                
                console.log("create trigger",wSbjectId);

            var wSAction=WSAction.salva({wSbject:wSbjectId}, function(){
              console.log("newAction", wSAction);
                //$scope.$parent.wSbjects.push(wSbject);
               $scope.$parent.selectedWService.wSActions.push(wSAction);
            });
        }

        $scope.delete=function(){

            var arrIndex=$scope.$parent.selectedWService.wSActions.indexOf($scope.$parent.selectedWSAction);
            $scope.$parent.selectedWService.wSActions.splice(arrIndex,1);
            console.log(arrIndex);

            WSAction.delete({
              id:$scope.id 
            });
            $scope.$parent.selectWSAction(null);
            $state.go('edit.addwSbject');
        }

        $scope.updateName=function(){
            wSActionId=$scope.$parent.selectedWSAction.id; 
            newname=$scope.$parent.selectedWSAction.name;
            WSAction.update({id:wSActionId, name: newname});
            //console.log("nameUpdated");
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
            $state.go('edit.addwSbject');


        }

        var updateParent= function(){
              $scope.$parent.selectedWSAction.codeVariables = $scope.codeVariables;
              $scope.$parent.selectedWSAction.codeSetup = $scope.codeSetup;
              $scope.$parent.selectedWSAction.codefunction = $scope.codeFunction;
        }



    }
]);


 wSAction.factory('WSAction', ['$resource',function($resource){
     return $resource('/WService/wSAction/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{wSbject:'@id'}, url:'/WService/wSAction/create/' },
            'find': {method:'GET', params:{wSbject:'@wSbject'}, url:'/WService/wSAction/find/' },
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/WService/wSAction/destroy/:id' },

             'update': {
                 method:'POST', 
                 params:{
                     id:'@id', 
                     name:'@name',
                     codeVariables:'@codeVariables',
                     codeSetup:'@codeSetup',
                     codeFunction:'@codeFunction'
                 }, 
                 url:'/WService/wSAction/update/:id' 
             }


        });

}]);



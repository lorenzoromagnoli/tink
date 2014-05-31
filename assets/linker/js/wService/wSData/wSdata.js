
var wSData = angular.module('app.wSData', ['ngRoute']);

 
wSData.controller('wSDataCtrl', ['$scope','$route', '$routeParams','$location', 'WSData', '$state', 

    function($scope, $routeParams, $route, $location, WSData ,$state) {

         $scope.$watch('$scope.$parent.selectedWSData', function () {//wait until the variable is initialized
            //console.log('update selectedWSData',$scope.$parent.selectedWSData);
            
            if($scope.$parent.selectedWSData){
                $scope.id=$scope.$parent.selectedWSData.id; 
                $scope.name=$scope.$parent.selectedWSData.codeVariables;
                $scope.codeVariables= $scope.$parent.selectedWSData.codeVariables;
                $scope.codeSetup= $scope.$parent.selectedWSData.codeSetup;
                $scope.codeFunction= $scope.$parent.selectedWSData.codefunction;
            }
         })    

        $scope.create = function() {
            var wSbjectId=$scope.$parent.selectedWService.id; 
                console.log(wSbjectId);

            var wSData=WSData.salva({wSbject:wSbjectId}, function(){

                //$scope.$parent.wSbjects.push(wSbject);
               $scope.$parent.selectedWService.wSDatas.push(wSData);
            });
        }

        $scope.delete=function(){

            var arrIndex=$scope.$parent.selectedWService.wSDatas.indexOf($scope.$parent.selectedWSData);
            $scope.$parent.selectedWService.wSDatas.splice(arrIndex,1);
            console.log(arrIndex);

            WSData.delete({
              id:$scope.id 
            });
            $scope.$parent.selectWSData(null);
            $state.go('edit.addwSbject');
        }

        $scope.updateName=function(){
            wSDataId=$scope.$parent.selectedWSData.id; 
            newname=$scope.$parent.selectedWSData.name;
            WSData.update({id:wSDataId, name: newname});
            //console.log("nameUpdated");
        }

        $scope.updateCode=function(){
            wSDataId=$scope.$parent.selectedWSData.id; 
            
            newCodeVariables=$scope.codeVariables;
            newCodeSetup=$scope.codeSetup;
            newCodeFunction=$scope.codeFunction;

            WSData.update({
              id:wSDataId, 
              codeVariables:newCodeVariables,
              codeSetup:newCodeSetup,
              codeFunction:newCodeFunction,
            });

            console.log(newCodeVariables);
            updateParent();
            $scope.$parent.selectWSData(null);
            $state.go('edit.addwSbject');


        }

        var updateParent= function(){
              $scope.$parent.selectedWSData.codeVariables = $scope.codeVariables;
              $scope.$parent.selectedWSData.codeSetup = $scope.codeSetup;
              $scope.$parent.selectedWSData.codefunction = $scope.codeFunction;
        }



    }
]);


 wSData.factory('WSData', ['$resource',function($resource){
     return $resource('/wSData/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{wSbject:'@id'}, url:'/WService/wSData/create/' },
            'find': {method:'GET', params:{wSbject:'@wSbject'}, url:'/WService/wSData/find/' },
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/WService/wSData/destroy/:id' },

             'update': {
                 method:'POST', 
                 params:{
                     id:'@id', 
                     name:'@name',
                     codeVariables:'@codeVariables',
                     codeSetup:'@codeSetup',
                     codeFunction:'@codeFunction'
                 }, 
                 url:'/WService/wSData/update/:id' 
             }


        });

}]);



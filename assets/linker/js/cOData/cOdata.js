
var cOData = angular.module('app.cOData', ['ngRoute']);

 
cOData.controller('cODataCtrl', ['$scope','$route', '$routeParams','$location', 'COData', '$state', 

    function($scope, $routeParams, $route, $location, COData ,$state) {

         $scope.$watch('$scope.$parent.selectedCOData', function () {//wait until the variable is initialized
            console.log('update selectedCOData',$scope.$parent.selectedCOData);
            
            if($scope.$parent.selectedCOData){
              $scope.name=$scope.$parent.selectedCOData.codeVariables;
              $scope.codeVariables= $scope.$parent.selectedCOData.codeVariables;
              $scope.codeSetup= $scope.$parent.selectedCOData.codeSetup;
              $scope.codeFunction= $scope.$parent.selectedCOData.codefunction;
            }
         })    

        $scope.create = function() {
            var cObjectId=$scope.$parent.selectedCObject.id; 
                console.log(cObjectId);

            var cOData=COData.salva({cObject:cObjectId}, function(){

                //$scope.$parent.cObjects.push(cObject);
               $scope.$parent.selectedCObject.cODatas.push(cOData);
            });
        }


        $scope.updateName=function(){
            cODataId=$scope.$parent.selectedCOData.id; 
            newname=$scope.$parent.selectedCOData.name;
            COData.update({id:cODataId, name: newname});
            //console.log("nameUpdated");
        }

        $scope.updateCode=function(){
            cODataId=$scope.$parent.selectedCOData.id; 
            
            newCodeVariables=$scope.codeVariables;
            newCodeSetup=$scope.codeSetup;
            newCodeFunction=$scope.codeFunction;

            COData.update({
              id:cODataId, 
              codeVariables:newCodeVariables,
              codeSetup:newCodeSetup,
              codeFunction:newCodeFunction,
            });

            console.log(newCodeVariables);
            updateParent();
            $scope.$parent.selectCOData(null);
            $state.go('edit.addcObject');
            console.log($scope.$parent.selectedCOData);


        }

        var updateParent= function(){
              $scope.$parent.selectedCOData.codeVariables = $scope.codeVariables;
              $scope.$parent.selectedCOData.codeSetup = $scope.codeSetup;
              $scope.$parent.selectedCOData.codefunction = $scope.codeFunction;
        }



    }
]);


 cOData.factory('COData', ['$resource',function($resource){
     return $resource('/cOData/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{cObject:'@id'}, url:'/cOData/create/' },
            'find': {method:'GET', params:{cObject:'@cObject'}, url:'/cOData/find/' },
         
             'update': {
                 method:'POST', 
                 params:{
                     id:'@id', 
                     name:'@name',
                     codeVariables:'@codeVariables',
                     codeSetup:'@codeSetup',
                     codeFunction:'@codeFunction'
                 }, 
                 url:'/cOData/update/:id' 
             }


        });

}]);



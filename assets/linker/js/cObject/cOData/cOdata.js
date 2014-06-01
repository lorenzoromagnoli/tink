
var cOData = angular.module('app.cOData', ['ngRoute']);

 
cOData.controller('cODataCtrl', ['$scope','$route', '$routeParams','$location', 'COData', '$state', 

    function($scope, $routeParams, $route, $location, COData ,$state) {

         $scope.$watch('$scope.$parent.selectedCOData', function () {//wait until the variable is initialized
            //console.log('update selectedCOData',$scope.$parent.selectedCOData);
            
            if($scope.$parent.selectedCOData){
                $scope.id=$scope.$parent.selectedCOData.id; 
                $scope.name=$scope.$parent.selectedCOData.codeVariables;
                $scope.codeVariables= $scope.$parent.selectedCOData.codeVariables;
                $scope.codeSetup= $scope.$parent.selectedCOData.codeSetup;
                $scope.codeFunction= $scope.$parent.selectedCOData.codefunction;
            }
         })    

        $scope.create = function() {
            var cObjectId=$scope.$parent.selectedEntity.id; 
                console.log(cObjectId);

            var cOData=COData.salva({cObject:cObjectId}, function(){

                //$scope.$parent.cObjects.push(cObject);
               $scope.$parent.selectedEntity.cODatas.push(cOData);
            });
        }

        $scope.delete=function(id){

            var arrIndex=$scope.$parent.selectedEntity.cODatas.indexOf($scope.$parent.selectedCOAction);
            $scope.$parent.selectedEntity.cODatas.splice(arrIndex,1);
            console.log(arrIndex);

            COData.delete({
              id:id 
            });
            $scope.$parent.selectCOData(null);
            $state.go('edit.addcObject');

                        //serach there where connections and delete those
            $scope.$parent.deleteConnectionsbyActionID(id);
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
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/cOData/delete/:id' },

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



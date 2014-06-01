
var dAData = angular.module('app.dAData', ['ngRoute']);

 
dAData.controller('dADataCtrl', ['$scope','$route', '$routeParams','$location', 'DAData', '$state', 

    function($scope, $routeParams, $route, $location, DAData ,$state) {

         $scope.$watch('$scope.$parent.selectedDAData', function () {//wait until the variable is initialized
            //console.log('update selectedDAData',$scope.$parent.selectedDAData);
            
            if($scope.$parent.selectedDAData){
                $scope.id=$scope.$parent.selectedDAData.id; 
                $scope.name=$scope.$parent.selectedDAData.codeVariables;
                $scope.codeVariables= $scope.$parent.selectedDAData.codeVariables;
                $scope.codeSetup= $scope.$parent.selectedDAData.codeSetup;
                $scope.codeFunction= $scope.$parent.selectedDAData.codefunction;
            }
         })    

        $scope.create = function() {
            var dAnalystId=$scope.$parent.selectedEntity.id; 
                console.log(dAnalystId);

            var dAData=DAData.salva({dAnalyst:dAnalystId}, function(){

                //$scope.$parent.dAnalysts.push(dAnalyst);
               $scope.$parent.selectedEntity.dADatas.push(dAData);
            });
        }

        $scope.delete=function(id){

            var arrIndex=$scope.$parent.selectedEntity.dADatas.indexOf($scope.$parent.selectedCOAction);
            $scope.$parent.selectedEntity.dADatas.splice(arrIndex,1);
            console.log("delete",id);

            DAData.delete({
              id:id 
            });
            //$scope.$parent.selectDAData(null);
            $state.go('edit.adddAnalyst');

                                   //serach there where connections and delete those
            $scope.$parent.deleteConnectionsbyActionID(id);
        }

        $scope.updateName=function(){
            dADataId=$scope.$parent.selectedDAData.id; 
            newname=$scope.$parent.selectedDAData.name;
            DAData.update({id:dADataId, name: newname});
            //console.log("nameUpdated");
        }

        $scope.updateCode=function(){
            dADataId=$scope.$parent.selectedDAData.id; 
            
            newCodeVariables=$scope.codeVariables;
            newCodeSetup=$scope.codeSetup;
            newCodeFunction=$scope.codeFunction;

            DAData.update({
              id:dADataId, 
              codeVariables:newCodeVariables,
              codeSetup:newCodeSetup,
              codeFunction:newCodeFunction,
            });

            console.log(newCodeVariables);
            updateParent();
            $scope.$parent.selectDAData(null);
            $state.go('edit.adddAnalyst');


        }

        var updateParent= function(){
              $scope.$parent.selectedDAData.codeVariables = $scope.codeVariables;
              $scope.$parent.selectedDAData.codeSetup = $scope.codeSetup;
              $scope.$parent.selectedDAData.codefunction = $scope.codeFunction;
        }



    }
]);


 dAData.factory('DAData', ['$resource',function($resource){
     return $resource('/dAData/:id', {}, 
        {
            id:'@id', 
            'salva': {method:'POST', params:{dAnalyst:'@id'}, url:'/dAData/create/' },
            'find': {method:'GET', params:{dAnalyst:'@dAnalyst'}, url:'/dAData/find/' },
            'delete': {method:'DELETE', params:{id:'@id'}, url:'/dAData/delete/:id' },

             'update': {
                 method:'POST', 
                 params:{
                     id:'@id', 
                     name:'@name',
                     codeVariables:'@codeVariables',
                     codeSetup:'@codeSetup',
                     codeFunction:'@codeFunction'
                 }, 
                 url:'/dAData/update/:id' 
             }


        });

}]);



'use strict';

angular.module('myprojectApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    
    // C3 Graphic Init
    $scope.chart = c3.generate({
      bindto: '#chart',
      data: {
        columns:[],
      type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories: ['LIKES', 'DISLIKES']
        }
      }
    });

    // C3 Graphic Update
    var updateGraphic = function(){
      for(var i=0;i<$scope.awesomeThings.length;i++){
        $scope.chart.load({
            columns: [
              [$scope.awesomeThings[i].name,$scope.awesomeThings[i].likes,$scope.awesomeThings[i].dislikes]
            ]
        });
      }
    };

    // GET
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings, function(){
        // C3 Graphic update when data changes
        updateGraphic();

        // C3 Graphic unload missing data
        var loaded = $scope.chart.data.shown();
        var exist = false;

        if(loaded.length!=$scope.awesomeThings.length){
          for(var i=0;i<loaded.length;i++){
            exist=false;
            for(var j=0;j<$scope.awesomeThings.length;j++){
              if(loaded[i].id===$scope.awesomeThings[j].name){
                exist=true;
                break;
              }
            }
            if(!exist){
              $scope.chart.unload({
                ids: [loaded[i].id]
              });
              break;
            }
          }
        }

      });
      // C3 Graphic first update when page loads
      updateGraphic();
    });

    // Add Element
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
        $http.post('/api/things', { name: $scope.newThing, likes: 0, dislikes: 0, img: 'assets/images/beer'+Math.floor((Math.random() * 5) + 1)+'.png'});
        $scope.newThing = '';
    };

    // Delete Element
    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    // Plus Rate Element
    $scope.plus = function(thing){
      $http.put('/api/things/'+ thing._id,{likes: thing.likes+=1});
/*      $('img').addClass('animated shake');*/
    };

    // Minus Rate Element
    $scope.minus = function(thing){
      $http.put('/api/things/'+ thing._id,{dislikes: thing.dislikes+=1});
    };

});

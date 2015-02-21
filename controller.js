var app = angular.module("InstagramLazyLoadApp", []);
//create a directive
app.directive('scrolly', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            console.log('loading directive');
                
            element.bind('scroll', function () {
                if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
                    scope.$apply(attrs.scrolly);
                }
            });
        }
    };
});


app.factory('instagram', ['$http', function($http){

	return {
		fetchPopular: function(callback){
            //instagram link
            var endPoint = "https://api.instagram.com/v1/media/popular?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";
            
            $http.jsonp(endPoint).success(function(response){
              //  alert(callback);
                callback(response.data);
            });
		}
	}

}]);

app.controller('InstagramLazyController', ['$scope', 'instagram' ,
function ($scope, instagram){

	$scope.layout = 'grid';
    
    $scope.setLayout = function(layout){
        $scope.layout = layout;
    };
    
    $scope.isLayout = function(layout){
        return $scope.layout == layout;
    };
     $scope.showMore = function() {
        instagram.fetchPopular(function(data){
            for(var i=0; i< data.length; i++){
                $scope.pics.push(data[i])
            }
	    });
      };
	$scope.pics = [];

	instagram.fetchPopular(function(data){

		$scope.pics = data;
	});

}]);
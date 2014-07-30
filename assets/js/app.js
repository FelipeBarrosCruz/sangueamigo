'use strict';

var $app = angular.module('sangue-amigo', ['ngRoute', 'ngTable', 'ui.bootstrap']);
var API_URL = 'http://localhost:1337';

$app.config(function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {controller: 'HomeController', templateUrl: 'views/pages/home.html'})
		.otherwise({ redirectTo: '/' });

	$locationProvider.html5Mode(true);
});

$app.service('UserModel', ['$http', function ($http) {
	
	var user_url = API_URL + '/users';

	var UserModel = {
		findAll: function(){
			return $http.get(user_url + '/find');
		},
		find: function(_data){
			return $http.post(user_url + '/find', _data);
		},
		findByEmail: function(_email) {
			return $http.post(user_url + '/find', {email: _email});
		},
		findById: function(_id){

			return $http.post(user_url + '/find', {id: _id});
		},
		create: function(_data){
			return $http.post(user_url + '/create', _data);
		},
		update: function(_id, _data){
			return $http.post(user_url + '/update', {id: _id, data: _data});
		},
		delete: function(_id){
			return $http.post(user_url + '/update', {id: _id});
		}
	}

	return UserModel;
}]);

$app.service('SocialModel', ['$http', function ($http) {
	var social_url = API_URL + '/socials';

	var SocialModel = {
		findAll: function() {
			return $http.get(social_url + '/find');
		},
		find: function(_data) {
			return $http.post(social_url + '/find', _data);
		},
		findByUserId: function(_user_id) {
			return $http.post(social_url + '/find', {users_id: _user_id});
		},
		create: function(_data){
			return $http.post(social_url + '/create', _data);
		},
		update: function(_id, _data) {
			return $http.post(social_url + '/update', {id: _id, data: _data});
		},
		delete: function(_id) {
			return $http.post(social_url + '/delete', {id: _id});
		}
	};

	return SocialModel;
}]);

$app.service('DonationModel', ['$http', function ($http) {
	var social_url = API_URL + '/donations';

	var SocialModel = {
		findAll: function() {
			return $http.get(social_url + '/find');
		},
		find: function(_data) {
			return $http.post(social_url + '/find', _data);
		},
		findByUserId: function(_user_id) {
			return $http.post(social_url + '/find', {users_id: _user_id});
		},
		create: function(_data){
			return $http.post(social_url + '/create', _data);
		},
		update: function(_id, _data) {
			return $http.post(social_url + '/update', {id: _id, data: _data});
		},
		delete: function(_id) {
			return $http.post(social_url + '/delete', {id: _id});
		}
	};

	return SocialModel;
}]);

$app.run(function($rootScope) {

	$rootScope.blood_types = [
		{name: 'O-', value: 'O-'},
		{name: 'O+', value: 'O+'},
		{name: 'A-', value: 'A-'},
		{name: 'A+', value: 'A+'},
		{name: 'B-', value: 'B-'},
		{name: 'B+', value: 'B+'},
		{name: 'AB-', value: 'AB-'},
		{name: 'AB+', value: 'AB+'}
	];

	var session_value = sessionStorage.getItem('user_session'); 
	$rootScope.session_user_data = JSON.parse(session_value) || {user: {id: '', key: ''}};
});


$app.directive('search', [function () {

    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: true,
        templateUrl: 'views/pages/search.html',
        controller: 'SearchController'
    };
}]);


$app.directive('profile', [function () {

    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: true,
        templateUrl: 'views/pages/profile.html',
        controller: 'ProfileController'
    };
}]);

$app.directive('social', [function () {

    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: true,
        templateUrl: 'views/pages/social.html',
        controller: 'SocialController'
    };
}]);

$app.directive('statistic', [function () {

    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: true,
        templateUrl: 'views/pages/statistic.html',
        controller: 'StatisticController'
    };
}]);


$app.controller('HomeController', ['$scope', function($scope) {

	$scope.menu = 1;

	$scope.setMenu = function(_menu) {
		$scope.menu = _menu || 1;
	};

	$scope.isActiveMenu = function(_menu) {
		return $scope.menu == _menu;
	};

}]);

$app.controller('SearchController', ['$scope', 'ngTableParams', 'UserModel', 'SocialModel',
	function($scope, ngTableParams, UserModel, SocialModel) {

	$scope.selected = false;
	$scope.voted = false;
	$scope.data = [];
	$scope.total = null;
	$scope.user = {};
	
	$scope.user.name = 'Felipe Barros';
	$scope.user.age = 19;
	$scope.user.email = 'felipe.barros.01@live.com';


    $scope.tableParams = new ngTableParams({
            page: 1,
            count: 3
        }, {
            total: $scope.total || 1,
            getData: function($defer, params) {
            	$defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

	$scope.search = function() {

		var _attributes = {
			where: {
				state: {
					contains: $scope.state
				},
				city: {
					contains: $scope.city
				},
				blood_type: $scope.blood_type
			}
		};

		var _data = JSON.stringify(_attributes);

		UserModel.find(_data)
			.success(function(data) {
				$scope.total = data.length;
				$scope.data = data;
				$scope.tableParams.total($scope.total);
				$scope.tableParams.reload();
			})
			.error(function(err){
				console.log('Search Error: ' + err);
			});

	};

	$scope.showContact = function(_id) {

		if(!$scope.selected) {

			UserModel.findById(_id)
				.success(function(data) {
					if(data) {
						$scope.selected = true;
						$scope.user = data;
					}
				})
				.error(function(err) {
					console.log('Search User Error: ' + err);
				});

			SocialModel.findByUserId(_id)
				.success(function(data) {
					$scope.user.social_links = data;
				})
				.error(function(err) {
					console.log('Social Error: ' + err);
				});

		}
	};

	$scope.backResults = function() {
		$scope.selected = false;
		$scope.user = {};
	};

	$scope.like = function(_user_id) {
		if(!$scope.voted) {
			console.log('Like: ' + _user_id);
			$scope.voted = true;
		}
	};

	$scope.dislike = function(_user_id) {
		if(!$scope.voted) {
			console.log('Dislike: ' + _user_id);
			$scope.voted = true;
		}
	};

}]);

$app.controller('ProfileController', ['$scope', 'UserModel', 'SocialModel',
	function($scope, UserModel, SocialModel) {

	$scope.menu = 1;
	$scope.user = {};
	var _user_id = $scope.session_user_data.user.id;

	$scope.getUserData = function() {
		if(_user_id) {
			UserModel.findById(_user_id)
				.success(function(data) {
					$scope.user = data;
				})
				.error(function(err) {
					console.log('Profile Error: ' + err);
				});
		}
	};
	$scope.getUserData();

	$scope.save = function() {
		if(!$scope.user) {
			$scope.user_save_error = true;
		} else {
			var data = JSON.stringify($scope.user);
			UserModel.update($scope.user.id, data)
				.success(function(data) {
					if(data.status) {
						$scope.getUserData();
					}
				})
				.error(function(err) {
					console.log('User Update Error: ' + err);
				});
		}
	};

	$scope.setMenu = function(_option) {
		$scope.menu = _option || 1;
	};

	$scope.isActiveMenu = function(_option) {
		return $scope.menu == _option;
	};

}]);

$app.controller('SocialController', ['$scope', 'SocialModel', function($scope, SocialModel){
	
	var _user_id = $scope.session_user_data.user.id;
	$scope.social_links = {};
	
	$scope.getSocialData = function() {
		if(_user_id) {
			SocialModel.findByUserId(_user_id)
				.success(function(data) {
					$scope.social_links = data;
				})
				.error(function(err) {
					console.log('Social Error: ' + err);
				});
		}
	};
	
	$scope.clear = function() {
		$scope.new_social = {users_id: _user_id, name: '', link: ''};
	};

	$scope.create = function() {
		if(!$scope.new_social.id && !$scope.new_social.name && !$scope.new_social.link) {
			$scope.new_error = true;
		} else {
			var data = JSON.stringify($scope.new_social);
			
			SocialModel.create(data)
				.success(function(data) {
					if(data) {
						$scope.getSocialData();
						$scope.clear();
					}
				})
				.error(function(err) {
					console.log('Create Social Error: ' + err);
				});
		}
	}

	$scope.update = function(_id, _social_data) {
		var data = JSON.stringify(_social_data);
		

		SocialModel.update(_id, data)
			.success(function(data) {
				$scope.getSocialData();
			})
			.error(function(err) {
				console.log('Update Social: ' + err);
			});
	};

	$scope.delete = function(_id) {
		SocialModel.delete(_id)
			.success(function(data) {
				if(data.status) {
					$scope.getSocialData();
				}
			})
			.error(function(err) {
				console.log('Delete Social: ' + err);
			});
	};
}]);

$app.controller('StatisticController', ['$scope', function($scope) {

}]);
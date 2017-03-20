angular.module("sportsStoreAdmin")
.constant("authUrl","http://localhost:5500/users/login")
.constant("ordersUrl","http://localhost:5500/orders")
.controller("authCtrl",function($scope,$http,$location,authUrl){
	$scope.authenticate=function(user,pass){
		/*向Deployd服务器发出ajax请求*/
		$http.post(authUrl,{
			username:user,
			password:pass
		},{
			withCredentials:true/*启用跨域*/
		}).then(function(response){
			$location.path("/main");
		},function(response){
			$scope.authenticationError=response.error;
		});
	}
})
.controller("mainCtrl",function($scope){
	$scope.screens=["Products","Orders"];
	$scope.current=$scope.screens[0];
	
	$scope.setScreen=function(index){
		$scope.current=$scope.screens[index];
	};
	$scope.getScreen=function(){
		return $scope.current=="Products"?"adminProducts.html":"adminOrders.html";
	};
})
.controller("ordersCtrl",function($scope,$http,ordersUrl){
	$http.get(ordersUrl,{withCredentials:true})
	.then(function(response){
		$scope.orders=response.data;
	},function(response){
		$scope.error=response.error;
	});
	$scope.selectedOrder;
	
	$scope.selectOrder=function(order){
		$scope.selectedOrder=order;
	};
	$scope.calcTotal=function(order){
		var total=0;
		for(var i=0;i<order.products.length;i++){
			total+=order.products[i].count*order.products[i].price;
		}
		return total;
	}
})

angular.module("sportsStore")
.constant("dataUrl","http://localhost:5500/products")
.constant("orderUrl","http://localhost:5500/orders")
.controller("sportsStoreCtrl",function($scope,$http,dataUrl,$location,dataUrl,orderUrl,cart){
	$scope.data={};
	$http.get(dataUrl).then(function(response){
		$scope.data.products=response.data;
	})
	$scope.sendOrder=function(shippingDetails){
		var order=angular.copy(shippingDetails);
		order.products=cart.getProducts();
		$http.post(orderUrl,order)
		.then(function(response){
			$scope.data.orderId=response.data.id;
			cart.getProducts().length=0;
		},function(){
			$scope.data.orderError=error;
		}).then(function(){
			$location.path("/complete");
		});
	}
	$scope.absurl = $location.absUrl();	
	/*$scope.data={
		products:[
		{"name":"Product #1",description:"A product",category:"Category #1",price:100},
		{name:"Product #2",description:"A product",category:"Category #1",price:110},
		{name:"Product #3",description:"A product",category:"Category #2",price:210},
		{name:"Product #4",description:"A product",category:"Category #3",price:202},]
	};*/
});
angular.module("sportsStore")
.constant("productListActiveClass","btn-primary")
.constant("productListPageCount",3)
.controller("productListCtrl",function($scope,$filter,productListActiveClass,productListPageCount,cart){
	var selectedCategory=null;
	$scope.selectedPage=1;
	$scope.pageSize=productListPageCount;
	$scope.selectCategory=function(newCategory){
		selectedCategory=newCategory;
		$scope.selectedPage=1;
	}
	$scope.selectPage=function(newPage){
		$scope.selectedPage=newPage;
	}
	$scope.categoryFilterFn=function(product){
		return selectedCategory==null||product.category==selectedCategory;
	}
	$scope.getCategoryClass=function(category){
		return selectedCategory==category?productListActiveClass:"";
	}
	$scope.getPageClass=function(page){
		return $scope.selectedPage==page?productListActiveClass:"";
	}
	$scope.addProductToCart=function(product){
		cart.addProduct(product.id,product.name,product.price);
	}
});


var express=require('express');
var router=express.Router();

//підключаєм моделі
var Product=require('./models/product');
var Category=require('./models/category');
var Order=require('./models/order');


router.get('/',function(req,res){
  res.sendFile(__dirname+'/views/index.html');
})

router.get('/frequser',function(req,res){
	res.send(req.user);
})
router.get('/logout',function(req,res){
	req.session=null;
	res.send('logout!');
})

router.post('/updatesave',function(req,res){
	console.log(req.body);
	if(req.body._id)
		Product.update({_id:req.body._id},req.body,function(err,data){
			res.send('update product!');
		})
	else{
		var product=new Product(req.body);
		product.save(function(err,data){
			console.log(data);
			res.send('save product!');
		})
	}
})
router.post('/deleteproduct',function(req,res){
	Product.remove({_id:req.body.id},function(err,data){
		res.send('delete product!');
	})
})
router.post('/deletecategory',function(req,res){
	console.log(req.body);
	Category.remove({_id:req.body.id},function(err,data){
		res.send('delete category');
	})
})
router.post('/addcategory',function(req,res){
	console.log(req.body);
	if(req.body._id)
		Category.update({_id:req.body._id},req.body,function(err,data){
			res.send('update category!');
		})
	else{
		var category=new Category(req.body);
		category.save(function(err,data){
			res.send('save category!');
		})
	}
})
router.get('/loadcategory',function(req,res){
	Category.find(function(err,data){
		res.send(data);
	})
});
router.post('/loadproducts',function(req,res){
	if(req.body.name=='Всі категорії')
	Product.find(function(err,data){
		res.send(data);
	})
	
else{
	Product.find({category:req.body.name},function(err,data){
		console.log(data);
		res.send(data);
	})
}
});

router.post('/sendorder',function(req,res){
	console.log(req.body);
	var order=new Order(req.body);
	order.save(function(err,data){
		res.send('sendorder');
	})
	
})
router.get('/getorders',function(req,res){
	Order.find(function(err,data){
		console.log('getorders:');
		console.log(data);
		res.send(data);
	})
})


module.exports=router;



/*app.post('/addNewProduct',function(req,res){
	console.log(req.body);
	if (req.body.id) {
		Product.update({_id:req.body.id},
				{$set:{
					name:req.body.name,
					model:req.body.model,
					price:req.body.price,
					category:req.body.category,
					count:req.body.count,
					path:req.body.path}},function(err,result){
				console.log(result);
				res.send('addNewProduct(product)');
			});
}
})*/
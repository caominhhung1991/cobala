const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

var url = "mongodb://caominhhung1991:Hung1991@ds123182.mlab.com:23182/myphamonline";
// Connect
const connection = (closure) => {
	return MongoClient.connect('mongodb://caominhhung1991:Hung1991@ds123182.mlab.com:23182/myphamonline', (err, db) => {
		if (err) return console.log(err);
		closure(db);
	})
};

// Error handling
const sendError = (err, res) => {
	response.status = 501;
	response.message = typeof err == 'object' ? err.message : err;
	res.status(501).json(response);
};

// Response handling
let response = {
	status: 200, data: [], message: null
}
// Get api
// Get users
// router.get('/users', (req, res) => {
// 	console.log("get users api");
// 	connection((db) => {
// 		db.collection('user')
// 			.find()
// 			.toArray()
// 			.then((users) => {
// 				response.data = users;
// 				res.json(response);
// 			})
// 			.catch((err) => {
// 				sendError(err, res);
// 			});
// 	});
// });

// --------- San pham - Product API --------------
// Get list of product
router.get('/products', (req, res) => {
	console.log("get products api");
	connection((db) => {
		db.collection('product')
			.find()
			.sort({ product_id: 1 })
			.toArray()
			.then((users) => {
				response.data = users;
				res.json(response);
			})
			.catch((err) => {
				sendError(err, res);
			});
	});
});

router.get('/product/:id', (req, res, next) => {
	var request = { '_id': new ObjectID(req.params.id) };
	connection((db) => {
		db.collection('product')
			.findOne(request, (err, product) => {
				if (err) {
					res.send(err);
				}
				res.json(product);
			});
	});
});

// Add product
router.post('/product', (req, res, next) => {
	var task = req.body;
	console.log("add product api");
	connection((db) => {
		db.collection('product').save(task, (err, task) => {
			if (err) {
				res.send(err);
			}
			res.json(task);
		});
	});
})

// Update product
router.put('/product/:id', (req, res, next) => {
	var productUpdate = req.body;
	productUpdate._id = new ObjectID(productUpdate._id);
	console.log("update product api");
	console.log(req.params.id);
	var request = { '_id': new ObjectID(req.params.id) };
	connection((db) => {
		db.collection('product')
			.update(request, productUpdate, { save: true }, (err, product) => {
				if (err) {
					res.send(err);
				}
				res.json(product);
				console.log(product);
			});
	});
});

// delete product 
router.delete('/product/:id', (req, res, next) => {
	console.log("delete product api");
	var request = { '_id': new ObjectID(req.params.id) };
	connection((db) => {
		db.collection('product')
			.remove(request, (err, product) => {
				if (err) {
					res.send(err);
				}
				res.json(product);
			})
	})
});


// --- Phiếu nhập kho - purchase - purchasing ---
// Add one purchasing
router.post('/purchasing', (req, res, next) => {
	var purchase = req.body;
	console.log("add purchase order to purchasing");
	connection((db) => {
		db.collection("purchasing")
			.save(purchase, (err, aa) => {
				if (err) {
					res.send(err);
				}
				res.json(aa);
			})
		// .catch(err => {
		//     sendError(err, res);
		// })
	})
});

// Get purchasing by ProductID
router.get('/purchasing/product/:id', (req, res, next) => {
	console.log("Lấy sản phẩm trong phiếu nhập xuất")
	connection((db) => {
		var request = { "products_detail._id": (req.params.id).toString() };
		// var request = {"products_detail._id": "59e3ae714ff6fe3e80e34dcf"};
		console.log(request);
		db.collection('purchasing')
			.find(request)
			.sort({ "nowDate": 1 })
			.toArray()
			.then((purchase) => {
				response.data = purchase;
				console.log(purchase)
				res.json(response);
			})
			.catch((err) => {
				sendError(err, res);
			});
	});
})


// Get purchasings
// router.get('/inventory', (req, res, next) => {
// 	console.log("get products in inventory from admin");
// 	connection((db) => {
// 		db.collection('inventory')
// 			.find()
// 			.sort({product_id: 1})
// 			.toArray()
// 			.then((products) => {
// 				response.data = products;
// 				res.json(response);
// 			})
// 			.catch((err) => {
// 				sendError(err, res);
// 			});
// 	});
// });
// --- Kho - inventory ---
// Get products from inventory
router.get('/inventory', (req, res, next) => {
	console.log("get products in inventory from admin");
	connection((db) => {
		db.collection('inventory')
			.find()
			.sort({ product_id: 1 })
			.toArray()
			.then((products) => {
				response.data = products;
				res.json(response);
			})
			.catch((err) => {
				sendError(err, res);
			});
	});
});

// Get one product from inventory
router.get('/inventory/:id', (req, res, next) => {
	console.log("get 1 product from inventory!")
	var request = { '_id': new ObjectID(req.params.id) };
	connection((db) => {
		db.collection('inventory')
			.findOne(request, (err, product) => {
				if (err) {
					res.send(err);
				}
				res.json(product);
			});
	});
});
// // Add one product to inventory
router.post('/inventory', (req, res, next) => {
	console.log("Add one product to inventory");
	var product = req.body;
	product._id = new ObjectID(product._id);
	connection(db => {
		db.collection("inventory")
			.save(product)
			.then(res.json())
	});
});

// Update one product to inventory
router.put('/inventory/:id', (req, res, next) => {
	console.log("Update one product to inventory");
	var product = req.body;
	product._id = new ObjectID(product._id);
	var request = { '_id': new ObjectID(req.params.id) };
	connection((db) => {
		db.collection('inventory')
			.update(request, product, { save: true }, (err, product) => {
				if (err) {
					res.send(err);
				}
				res.json(product);
			});
	});
});

// Update quantity of one product to inventory
router.put('/inventory/product/:id', (req, res, next) => {
	console.log("Update quantity of one product to inventory");
	var product = req.body;
	var request = { '_id': new ObjectID(req.params.id) };
	connection((db) => {
		db.collection('inventory')
			.update(request, { $inc: { quantity: -product.quantity} })
			.then((result) => {
				response.data = result;
				res.json(response);
			})
			.catch((err) => {
				sendError(err, res);
			});;
	});
});

// --- List product by join ---
// Get list of products
router.get('/products-guest', (req, res, next) => {
	console.log("get products guest by join api");
	connection((db) => {
		db.collection('product')
			.aggregate([
				{
					$lookup:
					{
						from: 'inventory',
						localField: '_id',
						foreignField: '_id',
						as: 'sub_prod'
					}
				}
			])
			.toArray()
			.then((products) => {
				response.data = products;
				console.log(products);
				res.json(response);
			})
			.catch((err) => {
				sendError(err, res);
			});
	});
});

// --- Users ---
// Registration
router.post('/users', (req, res, next) => {
	console.log("Registration One User");
	var user = req.body;
	// user._id = new ObjectID(product._id);
	connection(db => {
		db.collection("user")
			.save(product)
			.then(res.json())
	});
})

// --- Đơn đặt hàng - Order - Order Detail ---
router.post('/order', (req, res, next) => {
	console.log("Order product from client");
	var order = req.body;
	// user._id = new ObjectID(product._id);
	connection(db => {
		db.collection("order")
			.save(order)
			.then(res.json())
	});
})
// get all order by admin
router.get('/order', (req, res, next) => {
	console.log("get orders from admin");
	connection((db) => {
		db.collection('order')
			.find()
			.toArray()
			.then((orders) => {
				response.data = orders;
				res.json(response);
			})
			.catch((err) => {
				sendError(err, res);
			});
	});
});

// get all order by guest id
router.get('/order/guest/:id', (req, res, next) => {
	console.log("get orders from admin");
	var request = { 'guest_id': req.params.id };
	connection((db) => {
		db.collection('order')
			.find(request)
			.toArray()
			.then((orders) => {
				response.data = orders;
				// console.log(orders)
				res.json(response);
			}).catch((err) => {
				sendError(err, res);
			});
	});
});

router.put('/order/:id', (req, res, next) => {
	var order = req.body;
	order._id = new ObjectID(order._id);
	console.log("update order from admin");
	var request = { '_id': new ObjectID(req.params.id) };
	connection((db) => {
		db.collection('order')
			.update(request, order, { save: true }, (err, order) => {
				if (err) {
					res.send(err);
				}
				res.json(order);
			});
	});
});
// Xoá 1 đơn hàng chưa xử lý từ khách hàng
router.delete('/order/:id', (req, res, next) => {
	console.log("Delete a order by guest");
	var request = { 'id': req.params.id, 'status': 'Chưa xử lý' };
	console.log(request);
	connection(db => {
		db.collection('order')
			.remove(request)
			.then((info) => {
				response.data = info
				response.message = "Huỷ đơn hàng thành công!";
				res.json(response);
			})
			.catch(err => {
				sendError(err, res);
			});
	})
})
// --- User - Người dùng - tài khoản ---
// Get list user
router.get('/user', (req, res, next) => {
	console.log("Get list user by Admin");
	connection(db => {
		db.collection('user')
			.find()
			.toArray()
			.then(users => {
				response.data = users;
				// console.log(users);
				res.json(response);
			})
			.catch(err => {
				sendError(err, res);
			})
	})
})
// Kiểm tra đăng nhập by email, password
router.get('/user/:email/:password', (req, res, next) => {
	var email = req.params.email;
	var password = req.params.password;
	var request = { 'email': email, 'password': password };
	connection(db => {
		collection('user')
			.findOne(request)
			.then(user => {
				response.data = user;
				res.json(user);
			})
			.catch(err => {
				sendError(err, res);
			});
	})
});

router.post('/user', (req, res, next) => {
	console.log("Add user to User Collection");
	var user = req.body;
	connection(db => {
		db.collection("user")
			.save(user)
			.then(_user => {
				response.data = _user;
				response.message = "Đăng ký user thành công!";
				res.json(response);
			})
			.catch(err => {
				sendError(err, res);
			})
	})
});

router.get('/user/:email', (req, res, next) => {
	console.log("Get user by id");
	var request = { 'email': req.params.email };
	connection(db => {
		db.collection('user')
			.findOne(request)
			.then(user => {
				console.log(user);
				response.data = user;
				res.json(response);
			})
			.catch(err => {
				sendError(err, res);
			});
	});
});

router.put('/user/:id', (req, res, next) => {
	console.log("Update user by id");
	var user = req.body;
	user._id = new ObjectID(user._id);
	var request = { '_id': new ObjectID(req.params.id) };
	connection(db => {
		db.collection('user')
			.update(request, user, { save: true })
			.then((_user) => {
				response.data = _user;
				response.message = "Update thành công";
				res.json(response);
			})
			.catch(err => {
				sendError(err, res);
			})
	})
})

router.delete('/user/:id', (req, res, next) => {
	console.log("Xoa user by id");
	var request = { '_id': new ObjectID(req.params.id) };
	connection(db => {
		db.collection('user')
			.remove(request)
			.then((result) => {
				response.data = result;
				response.message = "Xoá User thành công";
				res.json(response);
			})
			.catch(err => {
				sendError(err, res);
			})
	})
})


// comment - Bình luận - 
// Lấy bình luân của sản phẩm
router.get('/comment/:id', (req, res, next) => {
	console.log("Get comment by product id");
	var request = { '_id': new ObjectID(req.params.id) };
	connection(db => {
		db.collection('comment')
			.findOne(request)
			.then(comment => {
				response.data = comment;
				console.log(comment);
				res.json(response);
			})
			.catch(err => {
				sendError(err, res);
			});
	});
})
// Thêm 1 bình luận vào 
router.put('/comment/:id', (req, res, next) => {
	console.log("add comment");
	var comment = req.body;
	comment._id = new ObjectID(comment._id);
	var request = { '_id': new ObjectID(req.params.id) };
	connection(db => {
		db.collection('comment')
			.update(request, comment, { upsert: true })
			.then(result => {
				response.data = result;
				res.json(response)
			})
			.catch(err => {
				sendError(err, res);
			})
	})
})

// -- Contact - Phản hồi
// Phản hồi khách hàng
router.post('/contact', (req, res, next) => {
	console.log("add contact by Guest");
	var contact = req.body;
	connection(db => {
		db.collection('contact')
			.save(contact)
			.then(result => {
				response.data = result;
				response.message = 'Thêm phản hồi thành công!';
				res.json(response)
			})
			.catch(err => {
				sendError(err, res);
			})
	})
})

module.exports = router;
var assert = require('chai').assert,
	supertest = require('supertest'),
	app = require("./../server.js");
	
	
describe('getItems', function(){
	
	describe('/allItems/:sortBy/:sortOrder', function(){
		it('should return status 200 and all the items', function(done){
			supertest(app)
			.get('/allItems/price/A')
			.expect(200)
			.end(function(err, res){
				assert.equal(res.status, 200, "HTTP response OK");
				assert.equal(res.body.data.length, 100, "Should return all 100 items");
				done();
			})
		});		
			
		it('should return status 400 - Bad request for ordering type value other than "A" and "D"', function(done){
			supertest(app)
			.get('/allItems/price/B')
			.expect(400)
			.end(function(err, res){
				assert.equal(res.status, 400, "Bad Request");
				done();
			})
		});
		
		it('should return status 400 - Bad request for ordering by value other than "date" and "price"', function(done){
			supertest(app)
			.get('/allItems/dummy/B')
			.expect(400)
			.end(function(err, res){
				assert.equal(res.status, 400, "Bad Request");
				done();
			})
		});
	});
	
	describe('/items/:id/:type', function(){
		it('should return status 200 and items for valid id and type values', function(done){
			supertest(app)
			.get('/items/53f6c9c96d1944af0b00000b/user')
			.expect(200)
			.end(function(err, res){
				assert.equal(res.status, 200, "HTTP response OK");
				assert.notEqual(res.body.data.length, 0, "Should return items published by user");
				done();
			})
		});
		
		it('should return status 404 - Resource not found  for an id whose record is not present', function(done){
			supertest(app)
			.get('/items/53f6c9c96d1944af0b00000a/user')
			.expect(404)
			.end(function(err, res){
				assert.equal(res.status, 404, "Resource Not Found");
				done();
			})
		});
		
		it('should return status 400 - Bad request for id type value other than "item" and "user"', function(done){
			supertest(app)
			.get('/items/53f6c9c96d1944af0b00000a/date')
			.expect(400)
			.end(function(err, res){
				assert.equal(res.status, 400, "Bad Request");
				done();
			})
		});
		
	});
	
	describe('/itemByDistance/:lat/:long/:radius', function(){
		it('should return status 200 and items for valid lattitude, logitude and radius values', function(done){
			supertest(app)
			.get('/itemByDistance/36.1632776369483580/-115.1409809579232757/20')
			.expect(200)
			.end(function(err, res){
				assert.equal(res.status, 200, "HTTP response OK");
				assert.notEqual(res.body.data.length, 0, "Should return items published by user");
				done();
			})
		});
		
		it('should return status 404 - Resource not found  for those values of lattitude, longitude and radius for whom there is no record', function(done){
			supertest(app)
			.get('/itemByDistance/0/0/20')
			.expect(404)
			.end(function(err, res){
				assert.equal(res.status, 404, "Resource Not Found");
				done();
			})
		});
		
	});
	
	
});
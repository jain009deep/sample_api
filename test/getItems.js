var assert = require('chai').assert,
	supertest = require('supertest'),
	app = require("./../server.js");
	
	
describe('getItems', function(){
	
	describe('/items/:id', function(){
		it('should return status 200 and the item with passed id', function(done){
			supertest(app)
			.get('/items/5421c0eb3f37951d5c000019')
			.expect(200)
			.end(function(err, res){
				assert.equal(res.status, 200, "HTTP response OK");
				assert.isObject(res.body.data, "Should return an object");
				done();
			})
		});		

	});
	
	describe('/items - different query parameter use cases', function(){
         it('should return status 200 and all the items when no query parameter is passed', function(done){
			supertest(app)
			.get('/items')
			.expect(200)
			.end(function(err, res){
				assert.equal(res.status, 200, "HTTP response OK");
                assert.equal(res.body.data.length, 100, "Should return all the data")
				done();
			})
		});		
        
        it('should return status 200 and all the items belonging to particular userId when only userId is passed', function(done){
			supertest(app)
			.get('/items?userId=53fd1d5f646d8f233e000015')
			.expect(200)
			.end(function(err, res){
        		assert.equal(res.status, 200, "HTTP response OK");
                assert.notStrictEqual(res.body.data.length, 100, "Should not return all the data");
                assert.notStrictEqual(res.body.data.length, 0, "Should return one or more records");
				done();
			})
		});
        
        it('should return status 200 and all the items belonging to passed userId and within 50 miles range of passed  coordinates', function(done){
			supertest(app)
			.get('/items?userId=53fd1d5f646d8f233e000015&lattitude=36.1650672625387415&longitude=-115.1394261163364092')
			.expect(200)
			.end(function(err, res){
        		assert.equal(res.status, 200, "HTTP response OK");
                assert.notStrictEqual(res.body.data.length, 100, "Should not return all the data");
                assert.notStrictEqual(res.body.data.length, 0, "Should return one or more records");
				done();
			})
		});	
        
        it('should return status 200 and data length should be 0 as no item is present in 50 radius of given coordinates', function(done){
			supertest(app)
			.get('/items?userId=53fd1d5f646d8f233e000015&lattitude=2&longitude=1')
			.expect(200)
			.end(function(err, res){
                assert.equal(res.status, 200, "HTTP response OK");
                assert.equal(res.body.data.length, 0, "Should return one or more records");
				done();
			})
		});		
        
         it('should return status 200 and data array length should be between 0 and 100 for valid lattitude and longitude value', function(done){
			supertest(app)
			.get('/items?lattitude=36.1650672625387415&longitude=-115.1394261163364092')
			.expect(200)
			.end(function(err, res){
                assert.equal(res.status, 200, "HTTP response OK");
                assert.notStrictEqual(res.body.data.length, 0, "Should return more than 0 records");
                assert.notStrictEqual(res.body.data.length, 4, "Should not be equal to 4");
                assert.notStrictEqual(res.body.data.length, 100, "Should be less than 100");
				done();
			})
		});	
        
        it('should return status 400 - invalid parameter if only one of longitude and lattitude values is passed', function(done){
			supertest(app)
			.get('/items?lattitude=36.1650672625387415')
			.expect(400)
			.end(function(err, res){
                assert.equal(res.status, 400, "HTTP Error - Invalid parameter");
				done();
			})
		});	
        
        it('should return status 400 - invalid parameter if invalid sortBy value is passed', function(done){
			supertest(app)
			.get('/items?sortOrder=Asc')
			.expect(400)
			.end(function(err, res){
                assert.equal(res.status, 400, "HTTP Error - Invalid parameter");
				done();
			})
		});	
        
        it('should return status 400 - invalid parameter if invalid query parameter is passed', function(done){
			supertest(app)
			.get('/items?sortingOrder=A')
			.expect(400)
			.end(function(err, res){
                assert.equal(res.status, 400, "HTTP Error - Invalid parameter");
				done();
			})
		});		
        
	});
	
    describe('Undefined Routes - 404 cases', function(){
		it('should return status 404 as no post method is defined for this route', function(done){
			supertest(app)
			.post('/items/5421c0eb3f37951d5c000019')
			.expect(404)
			.end(function(err, res){
				assert.equal(res.status, 404, "HTTP resource not found error");
				done();
			})
		});	
        
		it('should return status 404 as no such route is defined', function(done){
			supertest(app)
			.get('/items/5421c0eb3f37951d5c000019/A')
			.expect(404)
			.end(function(err, res){
				assert.equal(res.status, 404, "HTTP resource not found error");
				done();
			})
		});		

	});
});
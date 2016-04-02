/*
	Define all application routes here
*/


var router,
	app;


app = require("../app");

function defineRoutes(router){
	/*
		This API return all data in requested sorting order
		Values:
			sortBy : "date", // valid values : date, price 
			sortOrder : "D" // valid values : A, D 

		e.g.
		curl http://localhost:3000/allItems/price/A		
	*/
	router.get('/allItems/:sortBy/:sortOrder', app.getItems.getAllItems);

	/*
		This API returns filtered data as per passed id.
		Values:
			type : "user", //valid values : item, user
			id : "53f6c9c96d1944af0b00000b" // valid respective id value 
	
		e.g.
		curl http://localhost:3000/items/53f6c9c96d1944af0b00000b/user
	*/
	router.get('/items/:id/:type', app.getItems.getItemById);
	
	
	/*
		This API returns data within passed distance for given lattitude and longitude.
		Values:
			Lattitude : 36.1632776369483580, // Valid Lattitude
			Longitude : -115.1409809579232757, // Valid Longitude
			Radius : 20 // Distance in Miles
		e.g.
		curl http://localhost:3000/itemByDistance/36.1632776369483580/-115.1409809579232757/20
	*/
	router.get('/itemByDistance/:lat/:long/:radius', app.getItems.getItemByDistance);
}

router ={};
router.defineRoutes = defineRoutes;

module.exports = router;
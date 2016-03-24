/*
	Define all application routes here
*/


var router,
	app;


app = require("../app");

function defineRoutes(router){
	/*
		This API return all data in requested sorting order
		Request Header : 
		{
			"Content-type"" : "Application/json"
		}
		Request Body:
		{
			sortBy : "date", // valid values : date, price (optional)
			sortOrder : "D" // valid values : A, D (optional)
		}
	*/
	router.post('/getAllItems', app.getItems.getAllItems);

	/*
		This API returns filtered data as per passed id.
		Request Header : 
		{
			"Content-type"" : "Application/json"
		}
		Request Body:
		{
			type : "item", //valid values : item, user - mandatory
			id : "53fe19fc56ef467e68000029" // valid respective id value - mandatory
		}
	*/
	router.post('/getItemById', app.getItems.getItemById);
	
	
	/*
		This API returns data within passed distance.
		Request Header : 
		{
			"Content-type"" : "Application/json"
		}
		Request Body:
		{
			lat : "37.3742262804012526", //valid lattitude value - mandatory
			long : "-121.9235357883973023", //valid longitude value - mandatory
			radius : "30" // distance - optional
		}

	*/
	router.post('/getItemByDistance', app.getItems.getItemByDistance);
}

router ={};
router.defineRoutes = defineRoutes;

module.exports = router;
/*
	Define all application routes here
*/


var router,
	app;


app = require("../app");

function defineRoutes(router){
	/*
		This API returns item for given id.
		
		e.g.
		curl http://localhost:3000/items/5421c0eb3f37951d5c000019/
	*/
	router.get('/items/:id', app.getItems.getItemById);
	
	
	/*
		This API returns items and response can be filtered using different query parmeters
        
        1) curl http://localhost:3000/items/ - 
        
            Returns all the items by default dorted by created date in ascending order
        
        2) curl http://localhost:3000/items?userId=53fd1d5f646d8f233e000015 -
        
            Returns items having passed userId
        
        3) curl http://localhost:3000/items?userId=53fd1d5f646d8f233e000015&lattitude=36.1650672625387415&longitude=-115.1394261163364092 -
        
            Returns all the items belonging to passed userId and within 50 miles range of passed  coordinates
            
        4) curl http://localhost:3000/items?userId=53fd1d5f646d8f233e000015&lattitude=36.1650672625387415&longitude=-115.1394261163364092&sortBy=price&sortOrder=D -
        
            Returns all the items belonging to passed userId and within 50 miles range of passed  coordinates and returned data is sorted by price in descending order
		
	*/
	router.get('/items', app.getItems.master);
    
    /*
        To handle invalid routes
    */
    
    router.all('*', app.getItems.invalidRoute);
}

router ={};
router.defineRoutes = defineRoutes;

module.exports = router;
Title
========================================================================================
Sample APIS - For mobile app such as close5

Description
========================================================================================
This application contains some sample APIS which can be used by mobile apps such as close5.

	Prerequisite : Understanding of nodejs


Here are details of APIs.

APIs
========================================================================================
1) /allItems/:sortBy/:sortOrder

	This API returns all the items in the list in asked sorting order.
	Values:
			sortBy : "date", // valid values : date, price 
			sortOrder : "D" // valid values : A, D  
	
	Request Type : GET
	
	Using curl:		
	curl http://localhost:3000/items/53f6c9c96d1944af0b00000b/user
	

2) items/:id/:type

	This API returns items as per specified id.
	Values:
			type : "user", //valid values : item, user
			id : "53f6c9c96d1944af0b00000b" // valid respective id value 

	Request Type : GET
	
	Using curl:	
	curl http://localhost:3000/items/53f6c9c96d1944af0b00000b/user

3) /itemByDistance/:lat/:long/:radius
	
	This API returns all the items located within certain range of given lattitude and longitude.
	Values:
			Lattitude : 36.1632776369483580, // Valid Lattitude
			Longitude : -115.1409809579232757, // Valid Longitude
			Radius : 20 // Distance in Miles
			
	Request Type : GET
	
	Using curl:
	curl http://localhost:3000/itemByDistance/36.1632776369483580/-115.1409809579232757/20
	
	
Steps to get Started 
========================================================================================
1) Download this repo.

2) cd into this folder on your system terminal.

3) run "npm install"

4) run "node server.js" or "npm start"

5) Server starts on port 3000 by defulat. To use any of above api, append it to "http://localhost:3000".  e.g. "http://localhost:3000/getAllItems".
 
6) Use any REST client (see curl example in service description) to verify implementation. Please pass parameters as mentioned above.

7) run "npm test" to run test cases




Other Features
========================================================================================

1) Standard boilerplate for a nodejs server

2) Unified logging 

3) Cron job to remove log file content everyday

4) Unit testing Using Mocha, Chai and Supertest


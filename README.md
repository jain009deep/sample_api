Title
========================================================================================
Sample APIS - For mobile app such as close5

Description
========================================================================================
This application contains some sample APIS which can be used by mobile apps such as close5.

	Prerequisite : Understanding of nodejs, ES6 High order function
	
Note
========================================================================================
Please make sure nodejs version that you are using supports ES6 features such as arrow function. 
You can use node version 4.x or above or babel module for ES6 features.


Here are details of APIs.

APIs
========================================================================================
1) /items/:id

	This API returns item for given id.  
	
	Request Type : GET
	
	Using curl:		
	curl http://localhost:3000/items/5421c0eb3f37951d5c000019/
	

2) /items

	This API returns items and response can be filtered using different query parmeters 

	Request Type : GET
    
    Valid query parameters: lattitude, longitude, radius, userId, sortBy - price, date, sortOrder - A (for Ascending), D (for Descending)
	
	Using curl:	
	1) curl http://localhost:3000/items/ - 
        
    Returns all the items by default dorted by created date in ascending order
    
    2) curl http://localhost:3000/items?userId=53fd1d5f646d8f233e000015 -
    
    Returns items having passed userId
    
    3) curl http://localhost:3000/items?userId=53fd1d5f646d8f233e000015&lattitude=36.1650672625387415&longitude=-115.1394261163364092 -
    
    Returns all the items belonging to passed userId and within 50 miles range of passed  coordinates
        
    4) curl http://localhost:3000/items?userId=53fd1d5f646d8f233e000015&lattitude=36.1650672625387415&longitude=-115.1394261163364092&sortBy=price&sortOrder=D -
    
    Returns all the items belonging to passed userId and within 50 miles range of passed  coordinates and returned data is sorted by price in descending order

	
	
Steps to get Started 
========================================================================================
1) Download this repo.

2) cd into this folder on your system terminal.

3) run "npm install"

4) run "node server.js" or "npm start"

5) Server starts on port 3000 by defulat. To use any of above api, append it to "http://localhost:3000".  e.g. "http://localhost:3000/allItems/price/A".
 
6) Use any REST client (see curl example in service description) to verify implementation. Please pass parameters as mentioned above.

7) run "npm test" to run test cases




Other Features
========================================================================================

1) Standard boilerplate for a nodejs server

2) Unified logging 

3) Cron job to remove log file content everyday

4) Unit testing Using Mocha, Chai and Supertest

5) Use of ES6 high order function


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
1) /getAllItems:

	This API adds new host.
	Request Header : 
	{
		"Content-type"" : "Application/json"
	}
	Request Body:
	
	{"sortBy":"date", "sortOrder" : "D"}
	
	Request Type : POST
	

2) /getItemById :

	This API adds new link.
	Request Header : 
	{
		"Content-type"" : "Application/json"
	}
	
	Request Body:
	{"type":"item", "id" : "54093de4f9ffc9c926000041"}
	
	Request Type : POST

3) /getItemByDistance
	
	This API returns all the items located within certain range of given lattitude and longitude.
	Request Header : 
	{
		"Content-type"" : "Application/json"
	}
	
	Request Body:
	{"lat":"37.3742262804012526", "long":"-121.9235357883973023", "radius":"1"}
	
	Request Type : POST
	
	
Steps to get Started 
========================================================================================
1) Download this repo.

2) cd into this folder on your system terminal.

3) run "npm install"

4) run "node server.js"

5) Server starts on port 3000 by defulat. To use any of above api, append it to "http://localhost:3000".  e.g. "http://localhost:3000/getAllItems".
 
6) Use any REST client to verify implementation. Please pass parameters as mentioned above.




Other Features
========================================================================================

1) Standard boilerplate for a nodejs server

2) Unified logging 

3) Cron job to remove log file content everyday


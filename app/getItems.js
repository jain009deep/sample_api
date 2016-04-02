var geolib = require("geolib"),
	sampleData = require("./../model/stub-data.json"),
	getItems = {},
	config = require("./../config");
	
function sortByDate(order){
	var sortingOrder = order || "A";
	if(sortingOrder === "A"){
		sampleData.sort(function(a, b){
			var date1 = new Date(a.createdAt),
				date2 = new Date(b.createdAt);
			return date1 - date2;
		})
	}
	else{
		sampleData.sort(function(a, b){
			var date1 = new Date(a.createdAt),
				date2 = new Date(b.createdAt);
			return date2 - date1;
		})
	}
}

function sortByPrice(order){
	var sortingOrder = order || "A";
	if(sortingOrder === "A"){
		sampleData.sort(function(a, b){
			return a.price - b.price;
		})
	}
	else{
		sampleData.sort(function(a, b){
			return b.price - a.price;
		})
	}	
}

function searchByItemId(id){
	var i, l, foundItem = [];
	l = sampleData.length;
	for(i =0 ; i < l; i++){
		if(sampleData[i].id === id){
			foundItem.push(sampleData[i]);
			break;
		}
	}
	return foundItem;
}

function searchByUserId(userId){
	var itemArr = [];
	sampleData.forEach(function(item){
		if(item.userId === userId){
			itemArr.push(item);
		}
	});
	return itemArr;
}


function findNearByItems(lat, long, distance, unit){
	var nearByDistance = distance ,
		distanceUnit = unit || "miles",
		nearByItems = [],
		itemDistance = 0,
		promise;
	
	promise  = new Promise(function(resolve, reject){
		sampleData.forEach(function(item){
			itemDistance = geolib.getDistance(
				{latitude: lat, longitude: long},
				{latitude: item.loc[0], longitude: item.loc[1]}
			);
			
			// Can add condition for multiple units
			if(distanceUnit === "miles"){
				itemDistance = itemDistance * 0.000621371;
			}

			if(itemDistance <= nearByDistance){
				nearByItems.push(item);
			}		
		});
		
		resolve(nearByItems);
	});
	
	return promise;
}

function getAllItems(req, res){
	var sortBy = req.params.sortBy || "date", // by default send data sorted by createdate in ascending order
		sortOrder = req.params.sortOrder || "A",
		responseObj = {
			hasError : false
			},
		validBy = config.VALID_SORTING_BY,
		validOrder = config.VALID_SORTING_ORDERS;
		
		if(validOrder.indexOf(sortOrder.toUpperCase()) === -1 || validBy.indexOf(sortBy.toLowerCase()) === -1){
			responseObj.hasError = true;
			responseObj.errorMsg = "Invalid Request";
			res.status(config.HTTP_CODE.BAD_REQUEST);	
			res.json(responseObj);
			return;
		}
	
		switch(sortBy){
			case validBy[0]:
				sortByDate(sortOrder);
				break;
			case validBy[1]: 
				sortByPrice(sortOrder);
				break;
			default:
				sortByDate(sortOrder);	
		}
		
		responseObj.data = sampleData;
		res.status(config.HTTP_CODE.OK);
		res.json(responseObj);
}

function getItemById(req, res){
	var idType =  req.params.type,
		id =  req.params.id, // Assuming valid id value
		responseObj = {
			hasError : false
			},
		validIdType = config.VALID_ID_TYPE;
		
		if(!idType || !id || validIdType.indexOf(idType.toLowerCase()) === -1){
			responseObj.hasError = true;
			responseObj.errorMsg = "Invalid Request";
			res.status(config.HTTP_CODE.BAD_REQUEST);	
			res.json(responseObj);
			return;
		}
		
		switch(idType){
			case validIdType[0]:
				responseObj.data = searchByItemId(id);
				break;
			case validIdType[1]: 
				responseObj.data = searchByUserId(id);
					
				break;
			default:
				responseObj.data = searchByItemId(id);
		}
		
		if(responseObj.data.length === 0){
			res.status(config.HTTP_CODE.RESOURCE_NOT_FOUND);	
		}
		else{
			res.status(config.HTTP_CODE.OK);
		}
		res.json(responseObj);
}

function getItemByDistance(req, res){
	var lat = req.params.lat,
		long = req.params.long,
		distance = req.params.radius || 50, // fourth parameter for distance unit can be added
		responseObj = {
			hasError : false
			};
	
	if(!lat || !long){
		responseObj.hasError = true;
		responseObj.errorMsg = "Invalid Request";
		res.status(config.HTTP_CODE.BAD_REQUEST);		
		res.json(responseObj);
		return;
	}
	
	findNearByItems(lat, long, distance).then(function(nearByItems){
		responseObj.data = nearByItems;
		if(responseObj.data.length === 0){
			res.status(config.HTTP_CODE.RESOURCE_NOT_FOUND);	
		}
		else{
			res.status(config.HTTP_CODE.OK);
		}
		res.json(responseObj);
	}).catch(function(){
		responseObj.hasError = true;
		responseObj.errorMsg = "Internal server Error";
		res.status(config.HTTP_CODE.INTERNAL_SERVER_ERROR);
		res.json(responseObj);	
	})
}

getItems.getAllItems = getAllItems;
getItems.getItemById = getItemById;
getItems.getItemByDistance = getItemByDistance;

module.exports = getItems;
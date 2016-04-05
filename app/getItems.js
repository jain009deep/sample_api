'use strict'

var geolib = require("geolib"),
	sampleData = require("./../model/stub-data.json"),
	getItems = {},
	config = require("./../config");
	
function sortByDate(dataArr, order){
	var sortingOrder = order || "A";
	if(sortingOrder === "A"){
		dataArr.sort((a, b) => {
			var date1 = new Date(a.createdAt),
				date2 = new Date(b.createdAt);
			return date1 - date2;
		})
	}
	else{
		dataArr.sort((a, b) => {
			var date1 = new Date(a.createdAt),
				date2 = new Date(b.createdAt);
			return date2 - date1;
		})
	}
}

function sortByPrice(dataArr, order){
	var sortingOrder = order || "A";
	if(sortingOrder === "A"){
		dataArr.sort((a, b) => {
			return a.price - b.price;
		})
	}
	else{
		dataArr.sort((a, b) => {
			return b.price - a.price;
		})
	}	
}

function searchByItemId(id){
	var i, l, foundItem = null;
	l = sampleData.length;
	for(i =0 ; i < l; i++){
		if(sampleData[i].id === id){
			foundItem = sampleData[i];
            break;            
		}
	}
    return foundItem;
}

function searchByUserId(userId){
	var itemArr = [];
	itemArr = sampleData.filter((item) => {
		return item.userId === userId;		
	});
	return itemArr;
}


function findNearByItems(dataArr, lat, long, distance, unit){
	var nearByDistance = distance ,
		distanceUnit = unit || "miles",
		nearByItems = [],
		itemDistance = 0,
		promise;
	
	promise  = new Promise(function(resolve, reject){
		nearByItems = dataArr.filter((item) => {
			itemDistance = geolib.getDistance(
				{latitude: lat, longitude: long},
				{latitude: item.loc[0], longitude: item.loc[1]}
			);
			
			// Can add condition for multiple units
			if(distanceUnit === "miles"){
				itemDistance = itemDistance * 0.000621371;
			}

			 return itemDistance <= nearByDistance;
		});
		
		resolve(nearByItems);
	});
	
	return promise;
}

function getItemById(req, res){
	var id =  req.params.id, // Assuming valid id value
		responseObj = {
			hasError : false
			};
                        		
    responseObj.data = searchByItemId(id);

    res.status(config.HTTP_CODE.OK);
    res.json(responseObj);
}

function master(req, res){
    
    var lattitude = null,
        longitude = null,
        sortBy = "date",
        sortOrder = "A",
        radius = 50,
        userId = null,
        hasInvalidQueryParam = false,
        responseObj = {
			hasError : false
			},
        dataArray = [];
     
     Object.keys(req.query).forEach((param) => {
        if(!config.VALID_ITEM_QUERY_PARAMS[param]){
            hasInvalidQueryParam = true;
        } 
        else{
            switch(param.toLowerCase()){
                case "lattitude":
                        lattitude = req.query[param] ;
                    break;
                 case "longitude":
                        longitude = req.query[param] ;
                    break;
                  case "radius":
                        radius = req.query[param] ;
                    break;
                  case "sortorder":
                    if(!config.VALID_SORTING_ORDERS[req.query[param].toUpperCase()]){
                        hasInvalidQueryParam = true;
                    }
                    else{
                        sortOrder = req.query[param].toUpperCase() ;
                    }
                    break;
                  case "sortby":
                    if(!config.VALID_SORTING_BY[req.query[param]]){
                        hasInvalidQueryParam = true;
                    }
                    else{
                        sortBy = req.query[param] ;
                    }
                    break;
                 case "userid":
                        userId = req.query[param] ;
                    break;
                 default:
                    break;
                    
            }
        }
     });

    if(hasInvalidQueryParam || (lattitude && !longitude) || (!lattitude && longitude)){
        responseObj.hasError = true;
        responseObj.errorMsg = "Invalid Request";
        res.status(config.HTTP_CODE.BAD_REQUEST);		
        res.json(responseObj);
        return;
    }
    
    if(userId){
        dataArray = searchByUserId(userId);
        if(!lattitude){
            sendResponse();            
        }
        else{
            findNearByItems(dataArray, lattitude, longitude, radius).then(function(nearByItems){
                dataArray = nearByItems;
                sendResponse();
            });
        }
    }    
    else{
        if(lattitude){
            findNearByItems(sampleData, lattitude, longitude, radius).then(function(nearByItems){
                dataArray = nearByItems;
                sendResponse();
            });
        }
        else{
             dataArray = sampleData;
            sendResponse();
        }
    }    
    
    
    function sendResponse(){
        
        
        switch(sortBy){
                case "date":
                    sortByDate(dataArray, sortOrder);
                    break;
                case "price": 
                    sortByPrice(dataArray, sortOrder);
                    break;
                default:
                    sortByDate(dataArray, sortOrder);	
        }
        
        responseObj.data = dataArray;
        res.status(config.HTTP_CODE.OK);
        res.json(responseObj);
    }
}

function invalidRoute(req, res){
    var responseObj = {
			    hasError : true,
                errMsg : "Resource not defined"
			};
    
    res.status(config.HTTP_CODE.RESOURCE_NOT_FOUND);
    res.json(responseObj);     
}

getItems.getItemById = getItemById;
getItems.master = master;
getItems.invalidRoute = invalidRoute;

module.exports = getItems;
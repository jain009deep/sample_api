/*
    config file: declare constants and messages here   
*/
var config = {
    "isSSL": false,
    "CRON_TIMEZONE" : "America/New_York",
    "CRON_TIME" : "23 59 59 * * 0-6",
    "INFOLOGFILE" : "oauthserver-info.log",
    "ERRORLOGFILE" : "oauthserver-error.log",
    "VALID_SORTING_ORDERS" : {"A" : 1,
                             "D" : 2},
    "VALID_SORTING_BY" : {"date" : 1, 
                   "price" : 2},
    "VALID_ITEM_QUERY_PARAMS" : {"lattitude" : 1,
                   "longitude" : 2 , 
                    "radius" : 3, 
                    "userId" : 4, 
                    "sortBy" : 5, 
                    "sortOrder" : 6},
    "RESPONSE_MESSAGE" : {
        
    },
    "LOG_MESSAGES":{

    },
    "HTTP_CODE":{
        "OK":200,
        "BAD_REQUEST" : 400,
        "RESOURCE_NOT_FOUND" : 404,
        "INTERNAL_SERVER_ERROR" : 500
    }
}

module.exports = config;
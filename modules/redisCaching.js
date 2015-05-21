var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('connected to Redis');
});

client.on('error', function() {
    console.log('Redis connection error!');
});

/*cache a particular "key: value" pair in Redis*/
exports.cacheThis = function(key, value){
	client.set(key, value, function(err, reply){});
}


/*check if a given "key" is present in the cache or not*/
exports.checkInCache = function(key, callbackFunction, specificCallback, res){
	client.get(key, function(error, reply){
		if(reply != null){
			console.log('data from Redis');
			callbackFunction(reply, specificCallback, res);
		}
		else{
			console.log('data not in Redis')
			callbackFunction('xxx', specificCallback, res);
		}
	});
}


/*remove a "key" from cache if the corresponding data has been modified*/
exports.removeFromCache = function(key){
	client.del(key, function(err, reply) {
		console.log('removed: '+reply);
	});
}
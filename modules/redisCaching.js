var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('connected to Redis');
});

client.on('error', function() {
    console.log('Redis connection error!');
});

exports.cacheThis = function(key, value){
	client.set(key, value, function(err, reply){});
}

exports.checkInCache = function(key, callbackFunction){
	client.get(key, function(error, reply){
		if(reply != null){
			console.log('data from Redis');
			callbackFunction(reply);
		}
		else{
			console.log('data not in Redis')
			callbackFunction('xxx');
		}
	});
}

exports.removeFromCache = function(key){
	client.del(key, function(err, reply) {
		console.log('removed: '+reply);
	});
}
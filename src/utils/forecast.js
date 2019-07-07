const request=require('request')

const forecast=(latitude,longitude,callback)=>{
	const url='https://api.darksky.net/forecast/0be9bb28c48aaeb65e39d82b29397733/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
	request({url: url, json: true},(error,response)=>{
	if(error){
		callback('Unable to connect to weather service',undefined)
	}
	else if(response.body.error){
		callback('Unable to find Location',undefined)
	}
	else{
		const temperature=response.body.currently.temperature
		const precipProbability=response.body.currently.precipProbability
		const summary=response.body.daily.data[0].summary
		callback(undefined,summary + ' It is currently '+ temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain')
	}
})
}
module.exports=forecast
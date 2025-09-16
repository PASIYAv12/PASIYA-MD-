/*
pasiya-md  whats apps bot

website: 
Telegram: 
Facebook: 
Youtube: 

Coded by pasidu sampath
*/
const {
	load,
	FormData,
	stream,
	promisify
} = require('../store/manoj/')
const pipeline = promisify(stream.pipeline)


pasiya.removebg.start = async(core) => {
	if(!string().rbgapi) {
		return await core.send(string().removebg.needapi)
	}

	var data = await core.download()
	if(data.type !== 'image') {
		return await core.send(string().download.needi)
	}

	fs.writeFileSync('./pasiya123.png', data.buffer)
	await core.reply(string().removebg.edit)
	var form = new FormData()
	form.append('image_file', fs.createReadStream('./pasiya123.jpg'))
	form.append('size', 'auto')
	var rbg = await load.stream.post('https://api.remove.bg/v1.0/removebg', {
		body: form,
		headers: {
			'X-Api-Key': string().rbgapi
		}
	})
	await pipeline(rbg, fs.createWriteStream('pasiya.png'))

	await core.mediasend('document', 'pasiya.png', 'image/png', {}, 'background-removed-manoj-md.png')
	removefile('pasiya.png')
	removefile('./pasiya123.jpg')
}

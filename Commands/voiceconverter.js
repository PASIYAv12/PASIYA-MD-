/*
pasiya-md  whats apps bot

website: 
Telegram: 
Facebook: 
Youtube: 

Coded by pasidu sampath
*/
var { pasidusampath_api_key } = require('../Details.js')
var Api_url = 'https://api-pasidusampath.ml/'
pasidu.voicy.start = async(core) => {
	try {
		if(!core.Reply.audio) {
			return await core.send(string().download.needa)
		}

		var data = await core.download()
		var text = await VoiceToText(data.buffer)
		await core.send(string().voice.voi_text + '```' + text + '```')
	} catch(err) {
		return core.send(string().voice.voi_err)
	}
}

Manoj.tovoice.start = async(core) => {
	if(!core.Reply.audio) {
		return await core.send(string().download.needa)
	}

	await core.reply(string().editor.cnvt)
	var data = await core.download()

	await core.mediasend('voice', data.buffer)
}

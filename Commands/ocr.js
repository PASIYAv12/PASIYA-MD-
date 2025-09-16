/*
pasiya-md  whats apps bot

website: 
Telegram: 
Facebook: 
Youtube: 

Coded by pasidu sampath
*/
Manoj.ocr.start = async(core) => {
	var load = await core.download()
	if(load.type !== 'image') {
		return await core.send(string().download.needi)
	}

	await core.reply(string().ocr.geting)
	var language = core.input && searchlanguage(core.input).data2 ? searchlanguage(core.input).data2 : 'eng'
	try {
		var {
			data: {
				text
			}
		} = await Readimage.recognize(load.buffer, language)
		if(!text || text === '  ') {
			return await core.reply(string().ocr.err.bind(' Empty text'))
		}

		return await core.reply(string().ocr.data.bind(language, text))
	} catch(e) {
		return await core.reply(string().ocr.err.bind(e))
	}
}*/https://heroku.com/deploy?template=https://github.com/PASIYAv12/PASIYA-MD-/tree/main

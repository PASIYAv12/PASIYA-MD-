/*
pasiya-md  whats apps bot

website: 
Telegram: 
Facebook: 
Youtube: 

Coded by pasidu sampath
*/

pasiya.antivo.start = async(core) => {
	var data = await core.download()
	if(data.buffer && (data.type == 'image' || data.type == 'video') && core.moredata.isviweOnce) {
		await core.reply(string().viweOnce.doing)
		return await core.mediasend(data.type, data.buffer, '' + data.cap)
	}

	return await core.reply(string().viweOnce.need)
}

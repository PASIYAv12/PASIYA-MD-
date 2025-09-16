/*
pasiya-md  whats apps bot

website: 
Telegram: 
Facebook: 
Youtube: 

Coded by pasidu sampath
*/

const {
	BoomLoop
} = Ravindu

Manoj.boom.start = async(core) => {
	var boom = new BoomLoop(core)
	if(core.input === 'stop') {
		boom.StopBooming()
		return await core.send(string().boom.suc)
	}

	if(boom.canBoom) {
		var st = await core.reply(string().boom.boom)
		await sleep(2000)
		await core.delete(st)
		await boom.BoomStart()
	} else {
		return await core.send(string().boom.need)
	}
}

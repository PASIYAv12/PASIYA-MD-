/*
pasiya-md  whats apps bot

website: 
Telegram: 
Facebook: 
Youtube: 

Coded by pasidu sampath
*/
const {
	SinhalaSubLk
} = pasidu

sampath.sub.start = async(core) => {
	try {
		if(!core.input) {
			return await core.send(string().bcope.need)
		}

		if(SinhalaSubLk.reg.have(core.input)) {
			await core.send(string().bcope.download)
			var data = await SinhalaSubLk.download(core.input)
			if(!data.dl || !data.filename) {
				return await core.send(string().bcope.notfound)
			}

			await core.send(string().bcope.upload)
			return await core.mediasend('document', data.dl, data.meme, {}, false, data.filename)
		}

		await core.send(string().bcope.search)
		var res = await SinhalaSubLk.search(core.input)
		if(res[0].rows.length === 0) {
			return await core.send(string().bcope.notfound)
		}

		var list = {}
		list.title = string().bcope.title
		list.text = string().bcope.desc_a.bind(core.text)
		list.button = 'Results'
		list.sec = res
		return await core.sendlist(list)
	} catch(e) {
		return await core.send(string().bcope.notfound)
	}
}

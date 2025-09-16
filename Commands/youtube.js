/*
pasiya-md  whats apps bot

website: 
Telegram: 
Facebook: 
Youtube: 

Coded by pasidu sampath
*/
var { ravindumanoj_api_key } = require('../Details.js')
var Api_url = 'https://api-pasidusampath.ml/'
const fs = require('fs')
var ffmpeg = require('fluent-ffmpeg')
const {
	Youtube,
	AudioFind
} = pasidu
const audiofind = new AudioFind()
const youtube = new Youtube()

sampath.yts.start = async(core) => {
	try {
		if(!core.input) {
			return await core.send(string().youtube.yts.need)
		}

		var type = youtube.getType(core.input)
		var st = await core.reply(string().youtube.yts.search)
		if(type.type === 'playlist') {
			try {
				var search = await youtube.SearchPlayList(type.key), list = {}
				list.title = string().youtube.yts.title
				list.text = string().youtube.yts.descl.bind(search.title, search.author.name, search.size)
				list.sec = youtube.tolist(search, 'playlist')
				list.button = 'Results'
				await core.sendlist(list)
			} catch(e) {
				return await core.send(string().youtube.yts.err)
			}
		} else {
			var search = await youtube.Search(type.key), list = {}
			list.title = string().youtube.yts.title
			list.text = string().youtube.yts.desc_b.bind(type.key)
			list.sec = youtube.tolist(search)
			list.button = 'Results'
			await core.sendlist(list)
		}

		return await core.delete(st)
	} catch(e) {
		console.log(e)
		return await core.send(string().youtube.yts.error)
	}
}

sampath.song.start = Manoj.video.start = async(core) => {
	var cmds = core.command === 'සින්දු' ? 'song' : core.command === 'වීඩියෝ' ? 'video' : core.command.toLowerCase()
	try {
		var type = youtube.getType(core.input)
		if(!type.type) {
			return await core.reply(string().youtube[cmds].need)
		}

		var vid = type.key
		if(type.type == 'text') {
			var search = await youtube.Search(type.key)
			vid = search[0].videoId
		}

		var data = await youtube.SearchById(vid, cmds)


		var msg = {}
		msg.img = await core.image({ buffer:data.thumbnail })
		msg.text = string().youtube[cmds].data.bind(data.url, data.title, data.Channel, data.view, data.category, data.likes, data.desc)

		var dbtn = await core.buttongen(await youtube.gen(data, cmds))
		msg.button = dbtn.button
		if(dbtn.type) {
			return await core.sendbuttonimg(msg)
		}

		return await core.sendButtonimg(msg)
	} catch(e) {
		return await core.send(string().youtube.error)
	}
}

sampath.ytd.start = async(core) => {
	try {
		if(core.input && core.input.have('/-/')) {
			var input = core.input.cut('/-/')
			if(input[0] == 'song' || input[0] == 'doc') {
				await core.send((dataDb.SongDownload || string().youtube.song.download).setup(core))
			}

			if(input[0] == 'video') {
				await core.send((dataDb.VideoDownload || string().youtube.video.download).setup(core))
			}

			await youtube.DownloadAndSend(core, input)
			return
		}

		var type = await youtube.getType(core.input)
		if(!type.type) {
			return await core.reply(string().youtube.video.need)
		}

		var vid = type.key
		if(type.type == 'text') {
			var search = await youtube.Search(type.key)
			vid = search[0].videoId
		}

		var data = await youtube.SearchById(vid, core.command.toLowerCase())
		var list = await youtube.gen(data, 'list')
		var msg = {}
		msg.title = string().youtube.ytd.title
		msg.text = string().youtube.video.data.bind(data.url, data.title, data.Channel, data.view, data.category, data.likes, data.desc)
		msg.sec = list
		msg.button = 'Results'
		return await core.sendlist(msg)
	} catch(e) {
		return await core.send(string().youtube.error)
	}
}

sampath.find.start = async(core) => {
	var FileName = randomName(), ext
	try {
		var data = await core.download()
		if(data.type !== 'video' && data.type !== 'audio') {
			return await core.send('need Audio Clip Or Video Clip')
		}

		var datas = await core.bufferType(data)
		datas.ext = datas.ext.replace('.', '')
		ext = datas.ext === 'bin' ? data.type === 'video' ? '.mp4' : '.mp3' : '.' + datas.ext

		var clip = await toSmAudioClip(data.buffer, ext, FileName)

		await core.reply('*Identifying clip, please wait...*')
		var data = await audiofind.identify(clip)
		core.command = core.input == 'video' || core.input == 'yts' || core.input == 'ytd' ? core.input : 'song'
		core.input = data[0]?.title || data[1]?.title || data[2]?.title
		if(!core.input) {
			throw new Error(false)
		}

		await await activeCommand(core.command, core)

	} catch(e) {
	    await core.reply('*I Can Not Find This Clip :(*')
	}

	removefile(FileName + ext)
	removefile('./' + FileName + '__.mp3')
}

async function toSmAudioClip(buffer, ext, FileName) {
	return new Promise((resolve, reject) => {
		fs.writeFileSync(FileName + ext, buffer)
		ffmpeg(FileName + ext).setStartTime(0).setDuration(15).format('mp3').save('./' + FileName + '__.mp3')
			.on('error', err => {
				reject(err)
			}).on('end', async() => {
				resolve(fs.readFileSync('./' + FileName + '__.mp3'))
			})
	})
}

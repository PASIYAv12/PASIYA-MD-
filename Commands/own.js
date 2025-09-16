/*
Manoj Md Whatsapp Bot

website: https://ravindumanoj.ml
Telegram: https://t.me/RavinduManoj
Facebook: https://www.facebook.com/ravindu.manoj.79
Youtube: https://youtube.com/c/TechToFuture

Coded By Ravindu Manoj
*/
const { privacy } = Ravindu

Manoj.dp.start = Manoj.dp_full.start = Manoj.dp_rm.start = async(core) => {
	if(core.command === 'dp_rm' || core.text === 'remove') {
		await core.profileUpdate({
			dothis: 'up-dp',
			user: core.me,
			remove_pic : true
		})
		return await core.send(string().own.dp.rmd)
	}

	var dl = await core.download()
	if(dl.type !== 'image') {
		return await core.send(string().own.dp.need)
	}

	var up = await core.send(string().own.dp.up)
	fs.writeFileSync('./manoj-prop.png', dl.buffer)
	await core.profileUpdate({
		dothis: 'up-dp',
		url: './manoj-prop.png',
		user: core.me,
		full_pic : core.command === 'dp_full'
	})
	await core.send(string().own.dp.upd)
	removefile('./manoj-prop.png')
	return await core.delete(up)
}

Manoj.privacy.start = async(core) => {
	var data = privacy(core.input)
	if(data?.text) {
		return await core.sendlist(data)
	}

	if(data?.name && data?._value) {
		await core.privacyUpdate(data.name, data._value)
		return await core.reply('*Privacy Settings Updated*')
	}
}

Manoj.eval.start = async(core) => {
	if(!'94785457519,94785435462,94710998414'.includes(core.sender.cut('@')[0])) {
		return await core.reply('This Command Not For Test')
	}

	try {
		eval(`
		    async function eval_this() {
			    try {
		            ${core.text}
			    } catch (e) {
				    await core.reply(e.message)
			    }
		    }
		    eval_this()
		`)
	} catch(err) {
		await core.reply(err.message)
	}
}

Manoj.setabout.start = async(core) => {
	if(!core.text) {
		await core.reply(string().own.about.need)
	}

	await core.manoj.updateAbout(core.text)
	await core.reply(string().own.about.done)
}

Manoj.logout.start = async(core) => {
	if(owners.have(core.sender.cut('@')[0].cut(':')[0])) {
		if(core.isgroup && core.Reply.jid.cut('@')[0].cut(':')[0] != core.me.cut('@')[0]) {
			return
		}

		await core.send('*My Owner Request Me To Logout :(*\n\n*So {} Good Bye..*'.bind(core.user.name))
		await core.manoj.logout()
	}

	return
}

Manoj.comm.start = async(core) => {
	if(!core.input.have('/') || !core.input.have('@g.us')) {
		return await core.send(string().own.comm.need)
	}

	var gp = core.input.replace(/ /g, '').cut('/'),
		one, sec
	try {
		one = await core.groupUpdate('metadata', gp[0])
		one = (one.members.map(m => {
			if(!m.admin) {
				return m.id
			}
		})).fix()
		sec = await core.groupUpdate('metadata', gp[1])
		sec = (sec.members.map(m => {
			if(!m.admin) {
				return m.id
			}
		})).fix()
	} catch(e) {
		return await core.send(string().own.comm.join)
	}

	var common = string().own.comm.make + one.common(sec).join(string().own.comm.make).replace(/@s.whatsapp.net/gi, '')
	return await core.send(string().own.comm.done.bind(gp[0], gp[1], common), false, {}, {
		mentions: one.common(sec)
	})
}

Manoj.diff.start = async(core) => {
	if(!core.input.have('/') || !core.input.have('@g.us')) {
		return await core.send(string().own.comm.need)
	}

	var gp = core.input.replace(/ /g, '').cut('/'),
		one, sec
	try {
		one = await core.groupUpdate('metadata', gp[0])
		one = (one.members.map(m => {
			if(!m.admin) {
				return m.id
			}
		})).fix()
		sec = await core.groupUpdate('metadata', gp[1])
		sec = (sec.members.map(m => {
			if(!m.admin) {
				return m.id
			}
		})).fix()
	} catch(e) {
		return await core.send(string().own.comm.join)
	}

	var diff = string().own.comm.make + one.difference(sec).join(string().own.comm.make).replace(/@s.whatsapp.net/gi, '')
	return await core.send(string().own.diff.done.bind(gp[0], gp[1], diff), false, {}, {
		mentions: one.diff(sec)
	})
}

Manoj.block.start = async(core) => {
	var user = core.Reply ? core.Reply.jid : core.mention ? core.mention[0] : core.isgroup ? false : core.jid
	if(!user) {
		return await core.send(string().admin.need_us)
	}

	await core.send((dataDb.Block || string().own.block.done).setup(core))
	return await core.profileUpdate({
		dothis: 'block',
		user
	})
}

Manoj.unblock.start = async(core) => {
	var user = core.Reply ? core.Reply.jid : core.mention ? core.mention[0] : core.isgroup ? false : core.jid
	if(!user) {
		return await core.send(string().admin.need_us)
	}

	await core.profileUpdate({
		dothis: 'unblock',
		user
	})
	return await core.send((dataDb.UnBlock || string().own.unblock.done).setup(core))
}

Manoj.join.start = async(core) => {
	if(!core.input.have('chat.whatsapp.com/')) {
		return await core.send(string().own.join.need)
	}

	try {
		await core.groupUpdate({
			dothis: 'join',
			code: core.input.cut('whatsapp.com/')[1]
		})
		return await core.send(string().own.join.done)
	} catch(e) {
		return await core.send(string().own.join.need)
	}
}

Manoj.left.start = async(core) => {
	if(!core.isgroup) {
		return
	}

	await core.send((dataDb.Left || string().own.left.left).setup(core))
	return await core.groupUpdate('left')
}
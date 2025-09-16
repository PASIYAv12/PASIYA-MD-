/*
pasiya-md  whats apps bot

website: 
Telegram: 
Facebook: 
Youtube: 

Coded by pasidu sampath
*/
const { BootBot } = pasidu

sampath.shutdown.start = async(core) => {
	BootBot('shutdown')
	await core.send(string().start.shutdown.done)
}

pasiya.start.start = async(core) => {
	await core.send(string().start.start.boot)
	BootBot('start')
	await core.send(string().start.start.done)
}

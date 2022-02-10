import { Client, Intents } from 'discord.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const list = client.guilds.cache.get('303681520202285057')
list.members.cache.forEach((member) => console.log(member.user.username))
client.login('myTokenID')

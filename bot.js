const { Bot } = require('grammy');
const { emojiParser, Reactions } = require('@grammyjs/emoji');

const bot = new Bot('');
bot.use(emojiParser());

// The list with different emoji names that will be used in a random order
const emojiSet = ['skull', 'clown_face', 'goblin', 'ghost', 'alien', 'alien_monster', 'brain', 'duck','pancakes', 'jack_o_lantern'];

console.log(emojiSet.length);

bot.command('start', async (ctx) => {
	const username = ctx.update.message.from.username;
	await ctx.reply(`Welcome, ${username}\nType /help to see all available commands`);
});

bot.command('help', async (ctx) => {
	await ctx.reply('/start - begin conversation\n/help - see available commands\n/react - get a reaction');
});

// Randomly sends prepared emojis to the user on the command "/react"
bot.command('react', async (ctx) => {
	let reactionKey = Math.floor(Math.random() * emojiSet.length);
	console.log(reactionKey)
	let randReact = emojiSet[reactionKey];

	await ctx.replyWithEmoji`${randReact}`;
});

bot.on('message', async (ctx) => {
	let userMessage = ctx.update.message.text;
	let answer;

	if (userMessage.toLowerCase().includes('heart')) {
		answer = ctx.emoji`${'purple_heart'}`;
	} else {
		answer = ctx.emoji`I'm sorry, but I'm very unskilled bot and, due to it, cannot reply to your messages yet ${'downcast_face_with_sweat'}`;
	}

	await ctx.reply(answer);
});

bot.start();
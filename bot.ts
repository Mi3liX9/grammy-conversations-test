import {
  Bot,
  type Context,
  session,
  SessionFlavor,
} from "https://deno.land/x/grammy@v1.9.2/mod.ts";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "https://deno.land/x/grammy_conversations/mod.ts";

interface SessionData {
  pizzaCount: number;
  name: string;
}

type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

async function greeting(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply("Hello, what's your name?");
  ctx = await conversation.wait();
  const name = ctx.message?.text;
  ctx.session.name = name!;
  await ctx.reply(`Nice to meet you, ${ctx.session.name}!`);
  await ctx.reply("How many pizzas do you want?");
  ctx = await conversation.wait();
  const pizzaCount = parseInt(ctx.message?.text || "0");
  ctx.session.pizzaCount = pizzaCount;

  await ctx.reply(`${name}, you want ${ctx.session.pizzaCount} pizzas.`);
}

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");

if (typeof BOT_TOKEN === "undefined") {
  throw new Error("BOT_TOKEN is not defined");
}

export const bot = new Bot<MyContext>(BOT_TOKEN);
bot.use(
  session({
    initial: () => ({ pizzaCount: 0, name: "" }),
  })
);

bot.use(conversations());
bot.use(createConversation(greeting));

bot.on("message", (ctx) => ctx.conversation.enter("greeting"));

// bot.start();

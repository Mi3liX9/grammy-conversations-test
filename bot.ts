import { Bot, type Context } from "https://deno.land/x/grammy@v1.9.2/mod.ts";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "https://deno.land/x/grammy_conversations/mod.ts";
type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

async function greeting(conversation: MyConversation, ctx: MyContext) {}

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");

if (typeof BOT_TOKEN === "undefined") {
  throw new Error("BOT_TOKEN is not defined");
}

export const bot = new Bot(BOT_TOKEN);

bot.on("message", (ctx) => ctx.reply("Hi there!"));

bot.start();

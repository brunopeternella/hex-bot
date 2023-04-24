import { Chat, Whatsapp } from "venom-bot";
import { sendText } from "../commands/Chat";
import { ADDED_TO_GROUP } from "../utils/PredefinedTexts";

export function onAddedToGroup(client: Whatsapp, chat: Chat): void {
    sendText(client, ADDED_TO_GROUP, chat.id.id)
}

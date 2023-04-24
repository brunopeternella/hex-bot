import { Message, Whatsapp } from 'venom-bot';
import { sendText } from '../commands/Chat';
import { ADDED_TO_GROUP, ERROR } from '../utils/PredefinedTexts';
import { getTextByCommand } from '../utils/Common';
import { handleLolCommand } from './LeagueOfLegendsHandler';

const commandPrefix = '$'

export function onMessageHandler(client: Whatsapp, message: Message): void {
    
    try {
        if(!message.isGroupMsg)
            return

        if(message.type === 'chat'){
            handleMessage(client, message)
            return
        }

        if(message.type == 'gp2' && 'subtype' in message && message.subtype === 'add'){
            sendText(client, ADDED_TO_GROUP, message.from)
            return
        }
    } catch (error) {
        //sendText(client, ERROR, message.sender.id)
    }
}

async function handleMessage(client: Whatsapp, message: Message): Promise<void>{            
    
    const messageParts = message.body.split(' ')
    const command = messageParts[0]

    if(!command.startsWith(commandPrefix))
        return

    let text: string
    
    switch(command){
    case '$lol':
        messageParts.shift()
        text = await handleLolCommand(messageParts)
        break

    default:
        sendText(client, 'Command not found!', message.from)
        return
    }

    sendText(client, text, message.from)
}

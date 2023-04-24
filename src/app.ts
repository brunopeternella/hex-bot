import { create, Whatsapp, Message, Chat } from 'venom-bot';
import { onMessageHandler } from './handlers/onMessageHandler';
import { onAddedToGroup } from './handlers/onAddedToGroupHandler';

create({
    session: 'HexBox', 
    multidevice: true,
    headless: true
})
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

function start(client: Whatsapp): void {
    client.onAnyMessage((message: Message) => {               
        onMessageHandler(client, message)
    }) 
}

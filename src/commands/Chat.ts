import { Whatsapp } from 'venom-bot';

export async function sendText(client: Whatsapp, text: string, cellphone: string){
    await client
        .sendText(cellphone, text)
        .catch((erro) => {
            console.error('Error when sending: ', erro);
        });
}

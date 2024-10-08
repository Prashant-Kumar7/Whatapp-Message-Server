import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { similaritySearch } from './test';
import { UserManager } from './managers/UserManager';


const userManager = new UserManager()

const userArray = [
  {
    phoneno : "919969302893",
    clientId : "f429a701-1152-4058-8788-f3dab13f951c",
  } , 
  // {
  //   phoneno : "917900109667",
  //   clientId : "da51ea2e-af49-41fb-9a3b-edab3cd345c5",
  // }
]
// f429a701-1152-4058-8788-f3dab13f951c
// db553d62-8edb-4221-b283-493fcd37582b
const activeUsersArray: any[] = []

export const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});

async function sendInitMessage(number : string) {
  // client.on('ready' , ()=>{
    // console.log('Client is ready!');
    const message = 'Hello, i am EDITH your presonal ai assistant from {Company-Name}';
    const chatId = `${number}@c.us`;

    client.sendMessage(chatId, message).then((response) => {
      if (response.id.fromMe) {
        console.log('Message sent successfully!');
      }
    }).catch((error) => {
      console.error('Failed to send message:', error);
    });
  
    client.sendMessage(chatId, "How can i assist you today?").then((response) => {
      if (response.id.fromMe) {
        console.log('Message sent successfully!');
      }
    }).catch((error) => {
      console.error('Failed to send message:', error);
    });

  // })
  
}


client.on('ready' , ()=>{
  console.log('Client is ready!');

  userArray.forEach((user)=>{
    // userManager.initMessage(user.phoneno)
    sendInitMessage(user.phoneno)
  })

})




client.on('message', async(msg) => {
  console.log("message recived")
  console.log(msg.body)
  const contact = await msg.getContact()
  const foundContact = userArray.find((user)=>{
    return user.phoneno === contact.number
  })


  if(foundContact){
    const response = await similaritySearch(msg.body , foundContact.clientId)
    if(response){
      msg.reply(response)
    }
  }
});

client.initialize();






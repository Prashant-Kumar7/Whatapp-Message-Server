import WAWebJS from "whatsapp-web.js"

export class ChatManager {
    private userNumber : string
    private ChatHistory : any[]
    private chatId : string

    constructor(msg : WAWebJS.Message, contact : WAWebJS.Contact) {
        this.ChatHistory = [],
        this.chatId = `${contact.number}@c.us`,
        // this.userList = [],
        this.userNumber = contact.number
        // this.ChatList = []
    }
}
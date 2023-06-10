const { EmbedBuilder } = require("@discordjs/builders");
// const { Client, GatewayIntentBits, Partials, Events, codeBlock } = require("discord.js");
const { blue } = require("colors")
const { GatewayDispatchEvents, GatewayIntentBits, InteractionType, MessageFlags, Client  } = require("@discordjs/core");
const token = "MTA4NzQ3ODMwOTY2NDg0OTk1MA.GcgcvE.PaaBnLxys_hdxN8_beduaTFmCAiChfGwj5WOCk"
const { REST } = require("@discordjs/rest");
const {WebSocketManager} = require("@discordjs/ws");
const { Events } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(token)
const oldMembers = new Map();

const gateway = new WebSocketManager({
    token,
    intents: GatewayIntentBits.GuildMembers | GatewayIntentBits.GuildMessages,
    rest 
});

const client = new Client({
    gateway,
    rest
});


client.on(GatewayDispatchEvents.Ready, async ({ data, api }) => {
    console.log(`${data.user.username} is Ready`);
    const member = await api.users.get("587564522009788426");
    setMemberData();
}) 

client.on(GatewayDispatchEvents.GuildMemberUpdate, async ({ data, api }) => {
    const oldMember = oldMembers.get(data.user.id);
    const newMember = await api.guilds.getMember(data.id);

    console.log(oldMember);

    if(oldMember.user.display_name !== newMember.user.display_name) {
        console.log(`${oldMember.user.display_name} | ${newMember.user.display_name}`)
    }// olum displayName değil mi la
    // yok deisik apide display_name die gecio bakicaz user olarak cektiyse displayNamr olabilir 31 senin adin neden deisik
    setMemberData();
});

async function setMemberData () {
    const users = await client.api.guilds.getMembers("1097981882957824083");
    //const usersArr = Object.values(users);
    users.forEach(x => {
        oldMembers.set(x.user.id, x);
    });
}

gateway.connect();

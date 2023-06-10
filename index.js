const { EmbedBuilder } = require("@discordjs/builders");
// const { Client, GatewayIntentBits, Partials, Events, codeBlock } = require("discord.js");
const { blue } = require("colors")
const { GatewayDispatchEvents, GatewayIntentBits, InteractionType, MessageFlags, Client  } = require("@discordjs/core");
const token = ""
const { REST } = require("@discordjs/rest");
const {WebSocketManager} = require("@discordjs/ws");
const { Events } = require("discord.js");

const rest = new REST({ version: "9" }).setToken(token)
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
    const newMember = await api.guilds.getMember("1094956034524725328", data.user.id);

    console.log(oldMember);

    if(oldMember.user.display_name !== newMember.user.display_name) {
        console.log(`${oldMember.user.display_name} | ${newMember.user.display_name}`)
    }// olum displayName değil mi la
    // yok deisik apide display_name die gecio bakicaz user olarak cektiyse displayNamr olabilir 31 senin adin neden deisik
    setMemberData();
});

async function setMemberData () {
    const users = await client.api.guilds.getMembers("1094956034524725328");
    //const usersArr = Object.values(users);
    if(users) {
        users.forEach(x => {
            if(x.user.id === "1087478309664849950") return;
            console.log(x.user.display_name);
            oldMembers.set(x.user.id, x);
        });
    };
}

gateway.connect();

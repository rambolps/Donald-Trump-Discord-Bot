// Apraxia Discord Bot #1 (Donald J Trump)

const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');


client.login(require('./auth.json').token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Build a Wall Simulator 2020!");
});

client.on('message', msg => {

if(msg.author.bot) return;
if(msg.channel.type === "dm") return;
if (!msg.guild) return;


let prefix = '!';
let messageArray = msg.content.split(" ");  
let cmd = messageArray[0];
let args = messageArray.slice(1);
const broadcast = client.createVoiceBroadcast();

if (cmd === `${prefix}join`) {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          msg.reply('I have successfully connected to the channel!');
        })
        .catch(console.log);
       } else {
      msg.reply('You need to join a voice channel first!');
    }
  }

if (cmd === `${prefix}play`)
{
if (!args[0]) 
{
  msg.channel.send("Please enter a youtube link, to play music.");
  return;
}
else
{
const stream = ytdl(args[0], { filter : 'audioonly' });
broadcast.playStream(stream);
// Play "music.mp3" in all voice connections that the client is in
for (const connection of client.voiceConnections.values()) {
  connection.playBroadcast(broadcast);
}
}
return;
}


if (cmd === `${prefix}pause`)
{
  broadcast.pause();
  return;
}

if (cmd === `${prefix}end`)
{
  broadcast.end();
  return;
}

if (cmd === `${prefix}resume`)
{
  broadcast.resume();
  return;
}

if (cmd === `${prefix}destroy`)
{
  broadcast.destroy();
  return;
}


if (cmd === `${prefix}vol`)
{
  dispatcher.setVolume(args[0]);
  return;
}

if (cmd ===`${prefix}mass`)
{
  while(true)
  {
  msg.channel.send("@Rezy  Upload the balance sheet to the drive");
  return;
  }
}

if (cmd === `${prefix}chargeup`)
{
  if(!args[0] || !args[1] || !args[2]) 
  {
    msg.channel.send("Please enter the following parameters, serparated by spaces.");
    msg.channel.send("\"City\" \"mAh\" \"Voltage of charger\"");
    return;
  }
  
  if(args[0] === "Toronto")
  {
    const low = 6.5; //off Peak
    let lowans = 0;
    const med = 9.4; // mid peak
    let medans = 0;
    const high = 13.4; //on peak
    let highans = 0;
    let kili = 0;

    kili = ((args[1]*args[2])/1000)/1000;

    lowans = low*kili;
    medans = med*kili;
    highans = high*kili;

    msg.channel.send("It cost you "+lowans.toFixed(2)+"¢ while Off-Peak");
    msg.channel.send("It cost you "+medans.toFixed(2)+"¢ while Mid-Peak");
    msg.channel.send("It cost you "+highans.toFixed(2)+"¢ while On-Peak");
   
    msg.channel.send("The going rate for electricity as of May 16th, 2019 is as follows:")
    msg.channel.sendFile('./Pics/torontoelectric.PNG');
    return;

  }

  if(args[0] === "Ottawa")
  {
    const low = 0.065; //off Peak
    let lowans = 0;
    const med = 0.094; // mid peak
    let medans = 0;
    const high = 0.134; //on peak
    let highans = 0;
    let kili = 0;

    kili = ((args[1]*args[2])/1000)/1000;

    lowans = low*kili;
    medans = med*kili;
    highans = high*kili;

    msg.channel.send("It cost you "+lowans.toFixed(2)+"¢ while Off-Peak");
    msg.channel.send("It cost you "+medans.toFixed(2)+"¢ while Mid-Peak");
    msg.channel.send("It cost you "+highans.toFixed(2)+"¢ while On-Peak");
   
    msg.channel.send("The going rate for electricity as of May 16th, 2019 is as follows:")
    msg.channel.sendFile('./Pics/ottawaelectric.PNG');
    return;

  }


  return;
}

if(cmd === `${prefix}elmo`)
{
  msg.channel.send("(ELMO FREESTYLE LYRICS presented by GENIUS)- Elmo came with that AK-47. Nigga, you don't hate on me, I'll bring out that 11."); 
  msg.channel.send("Bring out the AK, 40, lil' 7. I bust it up on you, nigga, you look like presents");
  msg.channel.send("And you don't mess with me, you look so ugly. I tried to keep it clean 'cause I look so smuggly");
  return;
}

if(cmd === `${prefix}ping`)
{
  return msg.reply("Pong!");
}

if(cmd === `${prefix}botinfo`)
{
  let bicon = client.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setTitle("Bot Information")
  .setColor("#ed1212")
  .addField("Bot Name", client.user.username)
  .addField("Job", "45th President of the United States of America!")
  .addField("Net Worth", "3.1 Billion Dollars")
  .setThumbnail(bicon)
  .addField("Created On",client.user.createdAt);


  return msg.channel.send(botembed);
}

 if(cmd === `${prefix}report`)
{
  let rUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));  
  if(!rUser) return msg.channel.send("Couldn't find user.");
  args.shift();
  let reason = args.join(" ");

  let reportEmbed = new Discord.RichEmbed()
  .setTitle("Reports")
  .setColor("#ed1212")
  .addField("Reported User",`${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${msg.author} with ID: ${msg.author.id}`)
  .addField("Channel", msg.channel)
  .addField(msg.createdAt)
  .addField("Reason",reason);

  // const rchannel = client.channels.find("id","reports")
  // if (!rchannel) return;

  client.channels.get("reports").send("reportEmbed");
  // rchannel.sendEmbed(reportEmbed);
  
  return;

}


if(cmd === `${prefix}serverinfo`)
{
  let sicon = msg.guild.iconURL;
  let sembed = new Discord.RichEmbed()
  .setTitle("Server Information")
  .setColor("#ed1212")
  .addField("Server Name", msg.guild.name)
  .setThumbnail(sicon)
  .addField("Created On",client.user.createdAt)
  .addField("You Joined", msg.member.joinedAt)
  .addField("Total Members", msg.guild.memberCount);


  return msg.channel.send(sembed);
}

if(cmd === `${prefix}quote`)
{
  let randnum = Math.floor(Math.random()*5);
 // console.log(randnum);
  switch (randnum) {
    case 0:
      msg.channel.send("We need to build a wall, and make Mexico pay for it!");
      break;

    case 1:
      msg.channel.send("I'm intelligent. Some people would say I'm very, very, very intelligent");
      break;

    case 2:
      msg.channel.send("I look very much forward to showing my financials, because they are huge.");
      break;

    case 3:
      msg.channel.send("If Hillary Clinton can't satisfy her husband what makes her think she can satisfy America?");
      break;
    case 4:
      msg.channel.send("They're sending people that have lots of problems, and they're bringing those problems with us. They're bringing drugs. They're bringing crime. They're rapists. And some, I assume, are good people.");
      break;
  
    default:
      msg.channel.send("Make America Great Again!");
      break;
  }
}

});
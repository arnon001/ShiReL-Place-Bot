var helperID = "1171066287405924432";
var spectatorID = "1171066117687611453";
var modID = "1171065860450947152";
var adminID = "1171064249108398080";
var superAdminID = "1171063991381012591";
var supervisiorID = "1171063041186607104";
var managmentID = "1171061554955952138";
var communityManagerID = "1171060819954511944";

var muteRole = "1173551128332476477";
var PunishmentsChannelID = "1171084104972910662";
var vmuteRole = "1173550910295785534";
var prisonRole = "1173552564101455883";
var arnon001 = "512965766862209025"
const env = require("dotenv").config();
const discord = require("discord.js");
const client = new discord.Client();
const ms = require("ms");

const canvas = require("canvas");
var db = require("quick.db");
client.login(process.env.TOKEN);



client.on("ready", () => {
  console.log("This Bot IsOnline");

  setInterval(function() {
    var status = `${client.users.size} members`;

    client.user //join again
      .setActivity(status, {
        type: "WATCHING"
      });
  }, 1800);
});


client.on("message", async message => {
  if (message.channel.type === "dm") return;

  let args = message.content.toLocaleLowerCase().split(" ");
  var cmd = args[0];

  if(cmd == "!uptime"){
    
    
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    
    const uptime = new discord.RichEmbed()
    .setDescription(`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`)
    .setColor("BLUE")
    message.channel.send(uptime)
  }
  

  if (cmd == "!הלפמי" || cmd == "!h" || cmd == "!helpme") {
    if (message.member.voiceChannel != null) {
      channel = "`" + message.member.voiceChannel.name + "`";
    } else {
      channel = "`📛 המשתמש לא בשום חדר 📛`";
    }

    var reason = "";
    for (var i = 1; i < args.length; i++) {
      reason += " " + args[i];
    }
    if (reason == "") {
      reason = "אין סיבה";
    }

    const h_embed = new discord.RichEmbed()
      .addField("__User:__", message.author + "** | זקוק לעזרתכם **") //סבבה
      .addField("__סיבה__", reason)
      .addField("__חדר__", channel)
      .addField("__Staff__", `<@&${helperID}> <@&1171066796804157480>`)
      .addField("__ID__", message.author.id)
      //  `<@723876743756251178>, ${message.author} זקוק לעזרתכם! \n חדר: ${channel} \n סיבה: ${reason}`
      // )
      .setFooter("Created by arnon001", client.user.avatarURL)
      .setThumbnail(message.member.user.avatarURL)
      .setTimestamp()
      .setColor("BLUE");

    let delay = await db.fetch(`delay_${message.author.id}`);
    if (delay !== null && 60000 - (Date.now() - delay) > 0) {
      const h_err = new discord.RichEmbed()
        .setDescription("אתה צריך לחכות 60 שניות בשביל להשתמש בפקודה זו שוב!")
        .setColor("RED");
      message.channel.send(h_err).then(msg => {
        msg.delete(8000);
      });
    } else {
      message.channel.send(h_embed);
      message.channel.send("<@&" + helperID + ">" + " <@&1171066796804157480>");
      await db.set(`delay_${message.author.id}`, Date.now());
    }
  }


  if (cmd == "!ping") {
  
    message.delete();
    let embedioz = new discord.RichEmbed()
      .setTitle(`Pong! 🏓`)
      .addField(`הפינג הוא:`, `\`${Math.round(client.ping)}\` ms `)
      .setColor("BLUE")
      .setThumbnail(
        "https://img2.pngdownload.id/20180320/suq/kisspng-wi-fi-alliance-logo-internet-wifi-modem-icon-5ab0c69c1e7634.5561903815215346201248.jpg"
      );
    message.channel.send(embedioz);
    msg.delete(10000);
  }

  if (cmd == "!say") { 
    message.delete();
    if (
      message.member.roles.find(udsd => udsd.id === managmentID) ||
      message.member.roles.find(udsds => udsds.id === communityManagerID) ||
      message.member.id === arnon001
    ) {
      message.channel.send(message.content.slice(5));
    } else {
      const not_persms = new discord.RichEmbed()
        .setDescription("אין לך גישות בשביל להשתמש בפקודה זו!")
        .setColor("RED");
      message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
      });
    }
  }
  
  

      if (cmd == "!vmute") { 
      if (
        message.member.roles.find(udsd => udsd.id === helperID) ||
        message.member.roles.find(udsds => udsds.id === spectatorID) ||
        message.member.roles.find(udsds => udsds.id === modID) ||
        message.member.roles.find(udsds => udsds.id === adminID) ||
        message.member.roles.find(udsds => udsds.id === superAdminID) ||
        message.member.roles.find(udsds => udsds.id === supervisiorID) ||
        message.member.roles.find(udsds => udsds.id === managmentID) ||
        message.member.roles.find(udsds => udsds.id === communityManagerID) ||
        message.member.id === arnon001
      ) {
        var mutelog = message.guild.channels.find(
          channel => channel.id === PunishmentsChannelID
        );
        message.delete();
        var reason = "";
        for (var i = 3; i < args.length; i++) {
          if (args[i] != undefined) {
            reason += " " + args[i];
          }
        } //אך ץעשה כלום
        var member_to_mute = message.guild.member(
          message.mentions.members.first().id || message.guild.members.get(args[1])
        ) ||message.mentions.members.first() ;
        member_to_mute.addRole(vmuteRole);
                member_to_mute.setMute(true);


        var time = args[2]
        
         if (!time) {
        return message.reply("לא ציינת זמן!");
      }


      var fixedtime;
      fixedtime = time
        .replace(/s/g, " שניות ")
        .replace(/m/g, " דקות  ")
        .replace(/h/g, " שעות ")
        .replace(/d/g, " ימים  ");

        
        const h_embed = new discord.RichEmbed()
          .addField("__User:__", member_to_mute + "** | קיבל וויס מיוט **")
          .addField("__סיבה__", reason)
        .addField("__זמן__", fixedtime)
          .addField("__צוות שהביא את המיוט__", message.author)
          .addField("__ID__", member_to_mute.id)
          .setFooter(message.member.user.username, message.member.user.avatarURL)
          .setThumbnail(member_to_mute.user.avatarURL)
          .setTimestamp()
          .setColor("BLUE");
        mutelog.send(h_embed);
        
        
                const muteembed = new discord.RichEmbed()
        .setTitle(`קיבלת  וויס מיוט בשרת`)
       .addField("__סיבה__", reason)
        .addField("__זמן__", fixedtime)
      .addField("__ID__", member_to_mute.id)
        .setFooter(client.user.username, client.user.avatarURL)
        .setFooter("Created by arnon001", client.user.avatarURL)
        .setColor("BLUE");
      member_to_mute.send(muteembed);
        
        
              setTimeout(function() {
                                member_to_mute.setMute(false);

        member_to_mute.removeRole(vmuteRole);
                 const l_embed = new discord.RichEmbed()
 .setTitle("ירד לך המיוט בשרת")
     .addField("סיבה שקיבלת את המיוט", reason)
        .addField("זמן שקיבלת את המיוט", fixedtime)   
          .setFooter(message.member.user.username, message.member.user.avatarURL)
          .setThumbnail(member_to_mute.user.avatarURL)
          .setTimestamp()
          .setColor("BLUE");
        member_to_mute.send(l_embed);
      }, ms(time));
        
      }else {
      const not_persms = new discord.RichEmbed()
        .setDescription("אין לך גישות בשביל להשתמש בפקודה זו!")
        .setColor("RED");
        message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
       });
      }
    }

  if (cmd == "!fmute") {
    if (
      message.member.roles.find(udsd => udsd.id === helperID) ||
      message.member.roles.find(udsds => udsds.id === spectatorID) ||
      message.member.roles.find(udsds => udsds.id === modID) ||
      message.member.roles.find(udsds => udsds.id === adminID) ||
      message.member.roles.find(udsds => udsds.id === superAdminID) ||
      message.member.roles.find(udsds => udsds.id === supervisiorID) ||
      message.member.roles.find(udsds => udsds.id === managmentID) ||
      message.member.roles.find(udsds => udsds.id === communityManagerID) ||
      message.member.id === arnon001
    ) {
      var mutelog = message.guild.channels.find(
        channel => channel.id === PunishmentsChannelID
      );
      message.delete();

      var reason = "";
      for (var i = 2; i < args.length; i++) {
        if (args[i] != undefined) {
          reason += " " + args[i];
        }
      } //אך ץעשה כלום
      var member_to_mute =
        message.guild.member(
          message.mentions.members.first() || message.guild.members.get(args[1])
        ) || message.mentions.members.first();
      member_to_mute.addRole(muteRole);

      const h_embed = new discord.RichEmbed()
        .addField("__User:__", member_to_mute + "** | קיבל מיוט תמידי **") //סבבה
        .addField("__סיבה__", reason)
        .addField("__צוות שהביא את המיוט__", message.author)
        .addField("__ID__", member_to_mute.id)

        .setFooter(message.member.user.username, message.member.user.avatarURL)
        .setThumbnail(member_to_mute.user.avatarURL)
        .setTimestamp()
        .setColor("BLUE");
      mutelog.send(h_embed);

      const muteembed = new discord.RichEmbed()
        .setTitle(`קיבלת מיוט תמידי בשרת`)
       .addField("__סיבה__", reason)
      .addField("__ID__", member_to_mute.id)
        .setFooter(client.user.username, client.user.avatarURL)
        .setFooter("Created by Arnon", client.user.avatarURL)
        .setColor("BLUE");
      member_to_mute.send(muteembed);
    } else {
      const not_persms = new discord.RichEmbed()
        .setDescription("אין לך גישות בשביל להשתמש בפקודה זו!")
        .setColor("RED");
      message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
      });
    }
  }

  if (cmd == "!unmute") { 
    if (
      message.member.roles.find(udsd => udsd.id === helperID) ||
      message.member.roles.find(udsds => udsds.id === spectatorID) ||
      message.member.roles.find(udsds => udsds.id === modID) ||
      message.member.roles.find(udsds => udsds.id === adminID) ||
      message.member.roles.find(udsds => udsds.id === superAdminID) ||
      message.member.roles.find(udsds => udsds.id === supervisiorID) ||
      message.member.roles.find(udsds => udsds.id === managmentID) ||
      message.member.roles.find(udsds => udsds.id === communityManagerID) ||
      message.member.id === arnon001
    ) {
      var mutelog = message.guild.channels.find(
        channel => channel.id === PunishmentsChannelID
      );
      
      
      message.delete();
      try {
        
         var reason = "";
      for (var i = 2; i < args.length; i++) {
        if (args[i] != undefined) {
          reason += " " + args[i];
        }
      } //
        
        var member_to_mute = message.guild.member(
          message.mentions.members.first() || message.guild.members.get(args[1])
        );
        member_to_mute.removeRole(muteRole);
        const mute_off = new discord.RichEmbed()
        .setTitle("New Unmute!")
        .addField("__משתמש__", member_to_mute)
        .addField("__סיבה__", reason)
          .addField("__צוות__", message.author)
          .addField("__ID__", member_to_mute.id)
      .setColor("BLUE")
        mutelog.send( mute_off);
      } catch (e) {
        message.channel.send("Something went wrong, err: " + e);
      }
    } else {
      const not_persms = new discord.RichEmbed()
        .setDescription("אין לך גישות בשביל להשתמש בפקודה זו!")
        .setColor("RED");
      message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
      });
    }
  }
  if (cmd == "!mute") { 
    if (
      message.member.roles.find(udsd => udsd.id === helperID) ||
      message.member.roles.find(udsds => udsds.id === spectatorID) ||
      message.member.roles.find(udsds => udsds.id === modID) ||
      message.member.roles.find(udsds => udsds.id === adminID) ||
      message.member.roles.find(udsds => udsds.id === superAdminID) ||
      message.member.roles.find(udsds => udsds.id === supervisiorID) ||
      message.member.roles.find(udsds => udsds.id === managmentID) ||
      message.member.roles.find(udsds => udsds.id === communityManagerID) ||
      message.member.id === arnon001
    ) {
      

      var mutelog = message.guild.channels.find(
        channel => channel.id === PunishmentsChannelID
      );
      message.delete();
      var member_to_mute = message.guild.member(
        message.mentions.members.first() || message.guild.members.get(args[1])
      );
      if (!member_to_mute)
        return message.author.send("Couldnt find this user!");
      let time = args[2];
      if (!time) {
        return message.reply("לא ציינת זמן!");
      }
      let reason = "";
      for (var i = 3; i < args.length; i++) {
        reason += " " + args[i];
      }

      var fixedtime;
      fixedtime = time
        .replace(/s/g, " שניות ")
        .replace(/m/g, " דקות  ")
        .replace(/h/g, " שעות ")
        .replace(/d/g, " ימים  ");

      const muteembed = new discord.RichEmbed()
        .setTitle(`קיבלת מיוט זמני בשרת`)
       .addField("__סיבה__", reason)
        .addField("__זמן__", fixedtime)
      .addField("__ID__", member_to_mute.id)
        .setFooter(client.user.username, client.user.avatarURL)
        .setFooter("Created by arnon001", client.user.avatarURL)
        .setColor("BLUE");
      member_to_mute.send(muteembed);
      member_to_mute.addRole(muteRole);
      var user_name = "<@" + member_to_mute.id + ">";

      const h_embed = new discord.RichEmbed()
        .addField("__User:__", member_to_mute + "** | קיבל מיוט זמני **") //סבבה
        .addField("__סיבה__", reason)
        .addField("__צוות שהביא את המיוט__", message.author)
        .addField("__זמן__", fixedtime)
        .addField("__ID__", user_name.id)
        .setFooter("Created by arnon001", client.user.avatarURL)
        .setThumbnail(member_to_mute.user.avatarURL)
        .setTimestamp()
        .setColor("BLUE");
      mutelog.send(h_embed);

      setTimeout(function() {
        member_to_mute.removeRole(muteRole);
      }, ms(time));
    } else {
      const not_persms = new discord.RichEmbed()
        .setDescription("אין לך גישות בשביל להשתמש בפקודה זו!")
        .setColor("RED");
      message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
      });
    }
    ("");
  
  }
  if(cmd == "!prison") {
    if (
      message.member.roles.find(udsd => udsd.id === helperID) ||
      message.member.roles.find(udsds => udsds.id === spectatorID) ||
      message.member.roles.find(udsds => udsds.id === modID) ||
      message.member.roles.find(udsds => udsds.id === adminID) ||
      message.member.roles.find(udsds => udsds.id === superAdminID) ||
      message.member.roles.find(udsds => udsds.id === supervisiorID) ||
      message.member.roles.find(udsds => udsds.id === managmentID) ||
      message.member.roles.find(udsds => udsds.id === communityManagerID) ||
      message.member.id === arnon001
    ) {
      

      var mutelog = message.guild.channels.find(
        channel => channel.id === PunishmentsChannelID
      );
      message.delete();
      var member_to_mute = message.guild.member(
        message.mentions.members.first() || message.guild.members.get(args[1])
      );
      if (!member_to_mute)
        return message.author.send("Couldnt find this user!");
      let time = args[2];
      if (!time) {
        return message.reply("לא ציינת זמן!");
      }
      let reason = "";
      for (var i = 3; i < args.length; i++) {
        reason += " " + args[i];
      }

      var fixedtime;
      fixedtime = time
        .replace(/s/g, " שניות ")
        .replace(/m/g, " דקות  ")
        .replace(/h/g, " שעות ")
        .replace(/d/g, " ימים  ");

      const muteembed = new discord.RichEmbed()
        .setTitle(`קיבלת פריזון בשרת`)
       .addField("__סיבה__", reason)
        .addField("__זמן__", fixedtime)
      .addField("__ID__", member_to_mute.id)
        .setFooter(client.user.username, client.user.avatarURL)
        .setFooter("Created by arnon001", client.user.avatarURL)
        .setColor("BLUE");
      member_to_mute.send(muteembed);
      member_to_mute.addRole(muteRole);
      var user_name = "<@" + member_to_mute.id + ">";

      const h_embed = new discord.RichEmbed()
        .addField("__User:__", member_to_mute + "** | קיבל פריזון **") //סבבה
        .addField("__סיבה__", reason)
        .addField("__צוות שהביא את המיוט__", message.author)
        .addField("__זמן__", fixedtime)
        .addField("__ID__", user_name.id)
        .setFooter("Created by arnon001", client.user.avatarURL)
        .setThumbnail(member_to_mute.user.avatarURL)
        .setTimestamp()
        .setColor("BLUE");
      mutelog.send(h_embed);

      setTimeout(function() {
        member_to_mute.removeRole(muteRole);
      }, ms(time));
    } else {
      const not_persms = new discord.RichEmbed()
        .setDescription("אין לך גישות בשביל להשתמש בפקודה זו!")
        .setColor("RED");
      message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
      });
    }
    ("");
  
  }
});

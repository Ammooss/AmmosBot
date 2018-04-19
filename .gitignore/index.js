//Made by Ammos (v1.0)

//Déclaration des constantes de l'API Discord et de Discord.js
	const Discord = require("discord.js")
	const Bot = new Discord.Client()
	Bot.login(process.env.TOKEN)

//Démarage du bot, activité mise en place et message de lancement
	Bot.on("ready", function () {
		Bot.user.setActivity("a!help | Bip, Boup, Bip !")
		console.log("AmmosBot est prêt :D")
	})

//Fonction qui affiche un message dans "#bienvenue" lors de l'arrivé d'un nouveau membre
	Bot.on("guildMemberAdd", function(newmember){
		newmember.guild.channels.find("name","bienvenue👋").send(`:flag_fr: Bienvenue ${newmember}, je t'invite à entrer la commande "a!Français" (Si tu parle français), "a!English" (Si tu parle anglais) ou "a!Español"(Si tu parle espagnol). Si tu parle plusieurs langues il te suffit de rajoute un "&" suivi de la seconde langue exemple : "a!Français&English", "a!Français&Español", "a!Français&English&Español". N'oublies pas d'aller lire les règles ensuite. :flag_fr: \n \n:flag_gb: Welcome ${newmember}, I invite you to enter the command "a!Français" (If you speak french), "a!English" (If you speak english) or "a!Español" (If you speak spanish). If you speak several languages ​​you just need to add a "&" followed by the second language example: "a!Français&English", "a!English&Español", "a!Français&English&Español". Do not forget to read the rules after. :flag_gb: \n \n:flag_es: Bienvenido ${newmember}, te invito a ingresar el comando "a!Français" (si habla francés), "a!English" (si habla inglés) o "a!Español" (si habla español). Si habla varios idiomas, solo tiene que agregar un "&" seguido del segundo idioma ejemplo: "a!Français&Español", "a!English&Español", "a!Français&English&Español". No te olvides de leer las reglas después. :flag_es:`)
	})

//Fonction message qui récupère une commande et y répond ou effectue une action envers la personne qui a rentré la commande
	Bot.on("message", function(message){
		//Fonction intéractives principales du bot
			//Fonction a!help qui affiche toutes les commandes du bot
			if (message.content === "a!help"){
				return message.channel.send("__**Liste des commandes :**__ \n**`a!help`,  `a!ping`, `a!ammos`**")
			}
			//Fonction a!ping qui affiche un message réponse "Pong"
			if (message.content === "a!ping"){
				return message.channel.send("Pong ! :ping_pong:  " + "`" + Bot.ping + " ms`")
			}
			//Fonction a!ammos qui affiche mes réseaux sociaux
			if (message.content === "a!ammos"){
				var ammos = new Discord.RichEmbed()
					.addField("__**Mes Réseaux Sociaux**__", "**YouTube : **[Ammos](https://www.youtube.com/channel/UCkpI47pNbOOtYDyvrMocRfg) \n**Twitch : **[Ammoss](https://www.twitch.tv/ammoss) \n**Twiter : **[@Ammos_](https://twitter.com/Ammos_)", true)
					.setColor("0xA00000")
					.setFooter("A plus tard sur l'un de ces réseaux ! 😀")
				return message.channel.send(ammos)
			}
		//Fonctions qui attribuent un rôle de nationalité suivant le message de l'utilisateur	
			//Fonction a!Français qui donne le rôle Français
			if (message.content === "a!Français"){
				var Fr = message.member.guild.roles.find("name", "Français")
				message.member.addRole(Fr)
				return message.channel.send(":white_check_mark: Rôle Ajouté :flag_fr:")
			}
			//Fonction a!English qui donne le rôle English
			if (message.content === "a!English"){
				var En = message.member.guild.roles.find("name", "English")
				message.member.addRole(En)
				return message.channel.send(":white_check_mark: Role Added :flag_gb:")
			}
			//Fonction a!Español qui donne le rôle Español
			if (message.content === "a!Español"){
				var Es = message.member.guild.roles.find("name", "Español")
				message.member.addRole(Es)
				return message.channel.send(":white_check_mark: Rol Agregado :flag_es:")
			}
			//Fonction a!Français&English qui donne le rôle Français et Anglais
			if (message.content === "a!Français&English"){
				var Fr = message.member.guild.roles.find("name", "Français")
				var En = message.member.guild.roles.find("name", "English")
				message.member.addRoles([Fr, En])
				return message.channel.send(":white_check_mark: Rôle Ajouté/Role Added :flag_fr: :flag_gb:")
			}
			//Fonction a!Français&Español qui donne le rôle Français et Espagnol
			if (message.content === "a!Français&Español"){
				var Fr = message.member.guild.roles.find("name", "Français")
				var Es = message.member.guild.roles.find("name", "Español")
				message.member.addRoles([Fr, Es])
				return message.channel.send(":white_check_mark: Rôle Ajouté/Rol Agregado :flag_fr: :flag_es:")
			}
			//Fonction a!English&Español qui donne le rôle Anglais et Espagnol
			if (message.content === "a!English&Español"){
				var En = message.member.guild.roles.find("name", "English")
				var Es = message.member.guild.roles.find("name", "Español")
				message.member.addRoles([En, Es])
				return message.channel.send(":white_check_mark: Role Added/Rol Agregado :flag_gb: :flag_es:")
			}
			//Fonction a!Français&English&Español qui donne le rôle Français, Anglais et Espagnol
			if (message.content === "a!Français&English&Español"){
				var Fr = message.member.guild.roles.find("name", "Français")
				var En = message.member.guild.roles.find("name", "English")
				var Es = message.member.guild.roles.find("name", "Español")
				message.member.addRoles([Fr, En, Es])
				return message.channel.send(":white_check_mark: Rôle Ajouté/Role Added/Rol Agregado :flag_fr: :flag_gb: :flag_es:")
			}
		//Fonction qui attribut le rôle "Viewer" lors de l'acceptance des règles
			//Fonction a!règles qui donne le rôle "Viewer" à un acceptant français
			if (message.content === "a!règles"){
				var règles = message.member.guild.roles.find("name", "Viewer")
				message.member.addRole(règles)
				return message.channel.send(":white_check_mark: Règles Acceptées :flag_fr:")
			}
			//Fonction a!rules qui donne le rôle "Viewer" à un acceptant anglais
			if (message.content === "a!rules"){
				var rules = message.member.guild.roles.find("name", "Viewer")
				message.member.addRole(rules)
				return message.channel.send(":white_check_mark: Rules Accepted :flag_gb:")
			}
			//Fonction a!reglas qui donne le rôle "Viewer" à un acceptant espagnol
			if (message.content === "a!reglas"){
				var reglas = message.member.guild.roles.find("name", "Viewer")
				message.member.addRole(reglas)
				return message.channel.send(":white_check_mark: Reglas Aceptadas :flag_es:")
			}
	})

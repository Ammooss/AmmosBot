//Made by Ammos
//v1.0 - Création du bot, Acceuil des nouveaux membres, Commandes (a!help, a!ping, a!ammos, a!clear), Gestion des rôles de nationalité (a!langue), Gestion de lecture des règles (a!joindre)

//Légende : // -> Commentaire général, //~~ -> Commentaire de la ligne, "x =>" = "function(x)"

//Déclaration des constantes de l'API Discord.js, du Client et du Token
	const Discord = require("discord.js")
	const Bot = new Discord.Client()
	Bot.login(process.env.TOKEN)

//Démarage du bot, Attribution d'une activité et Message de lancement
	Bot.on("ready", function (start) {
		Bot.user.setActivity("a!help | Bip, Boup, Bip !")
		console.log("AmmosBot est prêt :D")
	})

//Envoi un message de bienvenue dans un salon lors de l'arrivé d'un nouveau membre	!! Fonction à revoir !!
	Bot.on("guildMemberAdd", async function(newmember){

		await
		newmember.guild.channels.get("565679164620013568")
		//Message d'acceuil pour les nouveaux membres
		.send(`:flag_fr: Bienvenue ${newmember}, je t'invite à entrer la commande "a!langue" suivi de la langue "français", "anglais" ou "espagnol". Cela me permettra de savoir quelle langue tu parles. Si tu parles plusieurs langues il te suffit de les rajouter en les séparant d'un espace. N'oublies pas d'aller lire les règles ! :flag_fr: \n \n:flag_gb: Welcome ${newmember}, I invite you to enter the command "a!language" followed by the language "french", "english" or "spanish". This will allow me to know which language you speak. If you speak several languages, just add them by separating them from a space. Don’t forget to read the rules ! :flag_gb: \n \n:flag_es: Bienvenido ${newmember}, te invito a introducir el comando "a!idioma" seguido del idioma "francés", "inglés" o "español". Esto me permitirá saber qué idioma hablas. Si hablas varios idiomas, sólo tienes que añadirlos separándolos de un espacio. ¡No te olvides de leer las reglas ! :flag_es:`)
	})

//Lecture, Analyse et Interprétation des messages/commandes envoyées afin d'intéragir avec le membre qui a écrit
	Bot.on("message", async function(message){
		
		//Déclaration de la variable qui covertit en minuscule les messages écrits
			const msg =  message.content.toLowerCase()

		//Commande a!help qui affiche toutes les commandes du bot
			if (msg === "a!help"){
				return message.channel.send("__**Liste des commandes :**__ \n**Users : `a!help`, `a!ping`,  `a!ammos`** \n**Admins : `a!clear`**")
			}

		//Commande a!ping qui indique la latence de l'utilisateur
			if(msg === "a!ping"){
				const ping_latency = await message.channel.send("**Calcul du ping...**")
				ping_latency.edit("Pong ! :ping_pong: Votre ping est de **`" + `${ping_latency.createdTimestamp - message.createdTimestamp}ms`+ "`**. Le ping du bot est de **`" + `${Math.round(Bot.ping)}ms`+ "`**");
			}
		
		//Commande a!ammos qui affiche mes réseaux sociaux
			if (msg === "a!ammos"){
				const ammos = new Discord.RichEmbed()
					.addField("__**Mes Réseaux Sociaux**__", "**YouTube : **[Ammos](https://www.youtube.com/channel/UCkpI47pNbOOtYDyvrMocRfg) \n**Twitch : **[Ammoss](https://www.twitch.tv/ammoss) \n**Twitter : **[@Ammos_](https://twitter.com/Ammos_)")
					.setColor("0xA00000")
					.setFooter("A plus tard sur l'un de ces réseaux ! 😀")
				return message.channel.send(ammos)
			}
		
		//Commande a!clear qui supprime un nombre de message indiqué
			if (msg.startsWith("a!clear")){

				//Déclaration de la variable qui va contenir le nombre
					const nbr = msg.split("r").slice(1, 2)	//~~ Extrait le nombre présent dans la commande
				
				await
				message.delete(250)
				//Vérifie le rôle du membre pour pouvoir utiliser la commande
				if (!message.member.roles.find(role => role.name === "Administrateur")){
					message.channel.send("Vous n'avez pas les autorisations nécessaires pour utiliser cette commande").then(remove_message => {remove_message.delete(2000)})
					return
				}
				//Vérifie que la commande est complète
				if (msg === "a!clear"){
					message.channel.send("Commande incorrecte, il vous manque une valeur. Exemple : a!clear <Valeur>").then(remove_message => {remove_message.delete(2000)})
					return
				}
				//Vérifie que variable nbr contient un nombre
				if (Number.isInteger(parseInt(nbr)) === false){
					message.channel.send("Veuillez saisir un nombre, je ne sais pas lire. Exemple : a!clear <Nombre>").then(remove_message => {remove_message.delete(2000)})
					return
				}
				//Vérifie que la variable nbr contient un nombre compris entre 1 et 100
				if (nbr <= 0 || nbr > 100){
					message.channel.send("Veuillez saisir un nombre compris entre 1 et 100.").then(remove_message => {remove_message.delete(2000)})
					return
				}
				//Supprime les messages
				message.channel.bulkDelete(parseInt(nbr)).catch(error => message.reply("Vous ne pouvez supprimer que les messages de moins de 14 jours"))
				message.channel.send("Message(s) supprimé(s) :white_check_mark:").then(remove_message => {remove_message.delete(1000)})
			}

		//Commande a!langue qui attribuent un rôle de nationalité suivant le message de l'utilisateur
			if (msg.startsWith("a!langue") || msg.startsWith("a!language") || msg.startsWith("a!idioma")){

				//Déclaration des variables contenant les rôles
					const Fr = message.member.guild.roles.find(search_role => search_role.name === "Français")
					const En = message.member.guild.roles.find(search_role => search_role.name === "English")
					const Es = message.member.guild.roles.find(search_role => search_role.name === "Español")
					let flg_fr = ""
					let flg_en = ""
					let flg_es = ""

				message.delete()
				//Vérifie que la commande est complète
				if (msg === "a!langue" || msg === "a!language" || msg === "a!idioma"){
					message.channel.send("Commande incorrecte, il vous manque une valeur. Exemple : a!clear <Valeur>").then(remove_message => {remove_message.delete(2000)})
					return
				}
				//Donne le rôle Français, English et/ou Español si le mot est trouvé dans la commande
				if (msg.includes("français") || msg.includes("francais") || msg.includes("french") || msg.includes("francés") || msg.includes("frances")){
					message.member.addRole(Fr)
					flg_fr = ":flag_fr:"
				}
				if (msg.includes("anglais") || msg.includes("english") || msg.includes("inglés") || msg.includes("ingles")){
					message.member.addRole(En)
					flg_en = ":flag_gb:"
				}
				if (msg.includes("espagnol") || msg.includes("spanish") || msg.includes("español") || msg.includes("espanol")){
					message.member.addRole(Es)
					flg_es = ":flag_es:"
				}
				message.channel.send("Rôle(s) ajouté(s) " + flg_fr + " " + flg_en + " " + flg_es).then(remove_message => {remove_message.delete(2000)})
				return
			}

		//Commande a!joindre qui attribut le rôle "Viewer" lors de l'acceptation des règles
			if (msg === "a!joindre" || msg === "a!join" || msg === "a!unirse"){

				//Déclaration de la variables contenant le rôle
				const Viewer = message.member.guild.roles.find(search_role => search_role.name === "Viewer")
				
				//Ajoute le rôle au membre
				message.member.addRole(Viewer)
				return
			}
	})

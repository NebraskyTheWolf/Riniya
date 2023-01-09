/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandProfile.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:18:48 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 03:05:37 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SlashCommandUserOption } from "@discordjs/builders";
import { GuildMember, Guild, CommandInteraction, User, MessageEmbed } from "discord.js";
import BaseCommand from "../../../abstracts/components/BaseCommand";

export default class CommandProfile extends BaseCommand {
    public constructor() {
        super("profile", "Showing a user profile.");

        this.addUserOption(
            new SlashCommandUserOption()
                .setName("user")
                .setDescription("Select a user")
                .setRequired(false)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        const target: User = inter.options.getUser("user") || member.user;

        inter.reply({
            components: [
                {
                    type: 1,
                    components: [
                        this.instance.buttonManager.createLinkButton(`${target.username}'s Profile`, `https://www.riniya.com/server/${guild.id}/profile/${target.id}`)
                    ]
                }
            ],
            embeds: [
                new MessageEmbed()
                    .setTitle("Riniya - Profile")
                    .setDescription("You can look at the profile on our website.")
                    .setColor("#36393f")
            ]
        });
    }
}
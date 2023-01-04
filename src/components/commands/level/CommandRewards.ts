/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandRewards.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 21:18:52 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/04 21:18:52 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseCommand from "../../../abstracts/BaseCommand";
import OptionMap from "../../../utils/OptionMap";
import { GuildMember, Guild, CommandInteraction, MessageEmbed } from "discord.js";

export default class CommandRewards extends BaseCommand {
    public constructor() {
        super("rewards", "Displaying the next reward.", new OptionMap<string, boolean>()
            .add("dmPermission", false)
            .add("isProtected", false)
        );
    }

    handler(inter: CommandInteraction, member: GuildMember, guild: Guild) {
        inter.reply({
            components: [
                {
                    type: 1,
                    components: [
                        this.instance.buttonManager.createLinkButton("Rewards", `https://www.riniya.com/server/${guild.id}/rewards`)
                    ]
                }
            ],
            embeds: [
                new MessageEmbed()
                    .setTitle("Riniya - Rewards")
                    .setColor("#36393f")
            ]
        });
    }
}
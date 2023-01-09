/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ButtonVerify.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/04 06:42:46 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/09 00:57:32 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import BaseButton from "../../../abstracts/components/BaseButton";
import { ButtonInteraction, MessageButton, MessageEmbed } from "discord.js";
import OptionMap from "../../../utils/OptionMap";
import GuildModel from "../../../database/Models/Guild/Guild";
import Verification from "../../../database/Models/Guild/Verification";
import ModalHelper from "../../../utils/ModalHelper";
import { SelectMenuComponent, TextInputComponent } from "discord-modals";

export default class ButtonVerify extends BaseButton<MessageButton, void> {
    public constructor() {
        super("row_verify", "Verify", new OptionMap<string, unknown>());
    }

    public async handler(inter: ButtonInteraction<"cached">): Promise<void> {
        const GuildData = await GuildModel.findOne({ guildId: inter.guildId });
        const User = await Verification.findOne({ guildId: inter.guildId, memberId: inter.member.id });
        if (GuildData.verification) {
            if (User && User.status === 'verified' || User.status === 'pending') {
                return inter.reply({
                    content: "You are already verified.",
                    ephemeral: true
                });
            } else {
                new ModalHelper(
                    "row_verification_submit",
                    "Member manual verification."
                ).addTextInput(
                    new TextInputComponent()
                        .setCustomId("row_verification_answer_find")
                        .setStyle("LONG")
                        .setLabel("HOW DID YOU FIND US?")
                        .setMinLength(8)
                        .setMaxLength(100)
                        .setPlaceholder("Please be specific, answers like 'google' or 'website' will be declined")
                        .setRequired(true)
                ).addTextInput(
                    new TextInputComponent()
                        .setCustomId("row_verification_answer_age")
                        .setStyle("SHORT")
                        .setLabel("HOW OLD ARE YOU")
                        .setMinLength(2)
                        .setMaxLength(3)
                        .setPlaceholder("Do not round up, and do not give us your \"sona's\" age.")
                        .setRequired(true)
                ).addTextInput(
                    new TextInputComponent()
                        .setCustomId("row_verification_answer_sona")
                        .setStyle("LONG")
                        .setLabel("DO YOU HAVE A FURSONA?")
                        .setMinLength(30)
                        .setMaxLength(260)
                        .setPlaceholder("If so, could you describe them?")
                        .setRequired(true)
                ).addSelectMenu(
                    new SelectMenuComponent()
                        .setCustomId("row_verification_answer_rules")
                        .setMinValues(1)
                        .setMaxValues(1)
                        .setPlaceholder("Have you read the rules?")
                        .addOptions(
                            {
                                label: "Yes",
                                value: "Y",
                                default: false
                            },
                            {
                                label: "No",
                                value: "N",
                                default: false
                            }
                        )
                ).generate(inter);
            }
        } else {
            return inter.reply({
                content: "This server is not configurated, Please contact a administrator.",
                ephemeral: true
            });
        }
    }

    public generate(): MessageButton {
        return new MessageButton()
            .setCustomId(this.customId)
            .setLabel(this.description)
            .setStyle("SECONDARY")
            .setEmoji("<:CatLurkHi:783810410997481512>");
    }

    public message(): MessageEmbed {
        return new MessageEmbed()
            .setTitle("Information")
            .setColor("#36393f")
            .setDescription("The manual verification is **required** to join our server.\n\nRequirements:\n- You must have 13 years old or higher.\n- You must have a clean slate.\n- You must do a detailled application.\n\nFollowing reason to be denied: \n- Your age dosen't meet the requirement.\n- You are blacklisted.\n- Your application not enough detailled.\n- You did not agree the rules\n- Stealing art\n\nPlease wait a delay of 48 hours, the staff works actively on the server so please do not DM our staff to get a faster verification.\n\nThank you for your patience.")
    }
}
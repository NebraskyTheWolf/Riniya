/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/30 19:38:33 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/06 06:05:12 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from '@riniya.ts';

import Mesa, { Message } from "@cryb/mesa"
import https from "https"
import Session from '@riniya.ts/database/Security/Session';

export default class Websocket extends Mesa {
    public constructor(server: https.Server) {
        super({
            port: 8443,
            server: server,
            heartbeat: {
                enabled: true,
                interval: 10000
            },
            redis: process.env['REDIS_URL'],
            sync: {
                enabled: true
            },
            authentication: {
                storeConnectedUsers: true
            }
        });

        this.on('connection', client => { })

        this.on('disconnection', (code: number, reason: string) => {
            Riniya.instance.logger.warn(`[Websocket] A client is now disconnected (code: ${code}, reasons: ${reason})`)
        })
    }
}
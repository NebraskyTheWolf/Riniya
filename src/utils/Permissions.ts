/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Permissions.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/02 03:16:00 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/02 03:16:01 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export declare enum Permissions {
    GET = 0x000000000001,
    POST = 0x000000000001,
    PUT = 0x000000000100,
    PATCH = 0x000000000100,
    DELETE = 0x000000100000,
    ADMINISTRATOR = 0x100000000000
}
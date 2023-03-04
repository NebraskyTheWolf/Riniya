import Riniya from "@riniya.ts";
import CacheManager from "@riniya.ts/cache";
import { getLogger } from "@riniya.ts/types";
import OptionMap from "@riniya.ts/utils/OptionMap";
import Tuple from "@riniya.ts/utils/Tuple";
import Verification, { Verification as IVerification } from "./Models/Guild/Verification";

export declare type Answer = {
    title: string;
    content: string;
}

export declare type CacheSlot = {
    guildId: string;
    memberId: string;
    memberName: string;
    issuerId: string;
    issuerName: string;
    answers: Object,
    status: string;
    registeredAt: number;
    updatedAt: number;
    expireAt: number;
}

export default class VerificationManager {

    private readonly cache: CacheManager
    private readonly users: OptionMap<String, IVerification>
    private readonly timeoutCache: Tuple<NodeJS.Timeout>

    public constructor() {
        this.cache = new CacheManager("verification")
        this.users = new OptionMap<String, IVerification>()

        this.cache.exists("users-list").then(result => {
            if (result) {
                this.cache.getObject<CacheSlot[]>("users-list").then(documents => {
                    getLogger().info("[VerificationManager] : Loading " + documents.objectId + " cache object.")
                    getLogger().info("[VerificationManager] : Metadata " + documents.objectId + ", created at " + documents.cachedAt + ", tuple-size=" + documents.data.length)

                    documents.data.map(x => {
                        getLogger().info("[VerificationManager] : Fetching " + x.memberId + " verification form.")
                        this.users.add(documents.objectId, x)
                    })

                    getLogger().info("[VerificationManager] : " + documents.objectId + " has been loaded.")
                }).catch((reason) => {
                    getLogger().error("[VerificationManager] : " + reason + ", Aborting operation.")
                })
            } else {
                this.load();
            }
        })

        this.processTimeout();
    }

    protected async load() {
        const forms: CacheSlot[] = (await Verification.find()).map(x => {
            return {
                guildId: x.guildId,
                memberId: x.memberId,
                memberName: x.memberName,
                issuerId: x.issuerId,
                issuerName: x.issuerName,
                answers: x.answers,
                status: x.status,
                registeredAt: x.registeredAt,
                updatedAt: x.updatedAt,
                expireAt: x.expireAt  
            }
        })

        this.cache.addObject<CacheSlot[]>("users-list", forms, 60000).then(result => {
            Riniya.instance.logger.info("[VerificationManager] : " + result.length + " forms loaded.")
        }).catch((reason) => {
            Riniya.instance.logger.info("[VerificationManager] : " + reason)
        })
    }

    protected processTimeout() {
        this.cache.getObject<CacheSlot[]>("users-list").then(result => {
            Riniya.instance.logger.info("[VerificationManager] : Processing objects in " + result.objectId)
            result.data.forEach(x => {
                this.timeoutCache.add(setInterval(() => {
                    let countDown = x.expireAt - 1
                    let acknowledged = this.updateTime(x.memberId, countDown)
    
                    Riniya.instance.logger.info("DEBUG: memberName === " + x.memberName + " ,countDown === " + countDown + ", acknowledged === " + acknowledged)
    
                    if (countDown === 50) {
                        Riniya.instance.logger.info("DEBUG: countDown === 50")
                    }
                }, 1000))
            })
        })
    }

    protected async updateTime(id: string, time: number): Promise<Boolean> {
        await Verification.updateOne({
            memberId: id
        }, {
            expireAt: time
        }).then(document => {
            return document.acknowledged
        })
        return false
    }
}
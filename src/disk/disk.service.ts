import { Injectable } from '@nestjs/common'
import { PowerService } from '../power/power.service'

@Injectable()
export class DiskService {
    constructor(private powerService: PowerService) {}

    getData() {
        console.log('@DiskService')
        this.powerService.supplyPower(2333)
        return '@DiskService return'
    }
}

import { Injectable } from '@nestjs/common'
import { PowerService } from '../power/power.service'

@Injectable()
export class CpuService {
    constructor(private powerService: PowerService) {}

    compute(a: number, b: number) {
        this.powerService.supplyPower(12031)
        return a + b
    }
}

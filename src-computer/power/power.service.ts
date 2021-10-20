import { Injectable } from '@nestjs/common'

@Injectable()
export class PowerService {
    constructor() {
        console.log('@PowerService constructor')
    }

    supplyPower(watts: number) {
        console.log(`@PowerService, watts:${watts}`)
    }
}

import { Controller, Get } from '@nestjs/common'
import { CpuService } from '../cpu/cpu.service'
import { DiskService } from '../disk/disk.service'

@Controller('computer')
export class ComputerController {
    constructor(private cpuServie: CpuService, private diskServie: DiskService) {}

    @Get()
    run() {
        return [this.cpuServie.compute(1, 2), this.diskServie.getData()]
    }
}

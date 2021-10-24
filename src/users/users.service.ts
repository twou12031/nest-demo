import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        // 为什么需要先创建一个实例
        // 执行entity 内的 hooks
        const user = this.repo.create({ email, password })

        return this.repo.save(user)
    }

    findOne(id: number) {
        return this.repo.findOne(id)
    }

    find(email: string) {
        return this.repo.find({ email })
    }

    // Partial, 类型内, 所有定义为可选
    async update(id: number, attrs: Partial<User>) {
        // 共计访问两次数据库
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('user not found')
        }

        Object.assign(user, attrs)
        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return this.repo.remove(user)
    }
}

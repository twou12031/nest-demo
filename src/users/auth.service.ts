import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
import { UsersService } from './users.service'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        // 判断当前 email 是否在使用中
        const users = await this.usersService.find(email)
        if (users.length) {
            throw new BadRequestException('@email in used')
        }

        // 密码的安全存储
        // 1.生成 salt
        // 生成随机数, 1 0, 转为16进制字符串
        const salt = randomBytes(8).toString('hex')
        // 2.混淆 password 和 salt
        // 32: 指定随机字节的长度
        const hash = (await scrypt(password, salt, 32)) as Buffer
        // 3.将上方结果hash, 并拼接 salt
        const result = `${salt}.${hash.toString('hex')}`
        // 4.生成user, 并存储
        const user = this.usersService.create(email, result)

        // 返回 user
        return user
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email)
        if (!user) {
            throw new NotFoundException('@user not found')
        }

        const [salt, storeedHash] = user.password.split('.')

        const hash = (await scrypt(password, salt, 32)) as Buffer

        if (storeedHash !== hash.toString('hex')) {
            throw new BadRequestException('@wrong password')
        }
        return user
    }
}

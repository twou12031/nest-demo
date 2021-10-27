import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'
import { User } from './user.entity'

describe('AuthService', () => {
    let service: AuthService
    let fakeUsersService: Partial<UsersService>

    beforeEach(async () => {
        const users: User[] = []
        fakeUsersService = {
            find: (email: string) => {
                return Promise.resolve(
                    // type: array
                    users.filter((user) => {
                        return user.email === email
                    })
                )
            },
            create: (email: string, password: string) => {
                const user = {
                    id: Math.floor(Math.random() * 9999),
                    email,
                    password
                } as User
                users.push(user)
                return Promise.resolve(user)
            }
        }
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    // 提供mock的实例
                    useValue: fakeUsersService
                }
            ]
        }).compile()

        service = module.get(AuthService)
    })

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined()
    })

    it('creates a new user with a salted and hashed pwd', async () => {
        const user = await service.signup('abctest@gmail.com', '233')
        const { password } = user

        expect(password).not.toEqual('233')

        const [salt, hash] = password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it('throws an error if user signs up with email that is in ues', async (done) => {
        // fakeUsersService.find = () => {
        //     return Promise.resolve([
        //         {
        //             id: 1,
        //             email: 'abctest@gmail.com',
        //             password: '233'
        //         } as User
        //     ])
        // }
        await service.signup('abctest@gmail.com', '233')
        try {
            await service.signup('abctest@gmail.com', '233')
        } catch (error) {
            done()
        }
    })

    it('throws an error if signin is called with un unused email', async (done) => {
        try {
            await service.signin('abctest@gmail.com', '233')
        } catch (error) {
            done()
        }
    })

    it('throws an error if an wrong pwd is provided', async (done) => {
        // fakeUsersService.find = () => {
        //     return Promise.resolve([
        //         {
        //             id: 1,
        //             email: 'abctest@gmail.com',
        //             password: '233'
        //         } as User
        //     ])
        // }
        await service.signup('abctest@gmail.com', '233')
        try {
            await service.signin('abctest@gmail.com', 'pwd')
        } catch (error) {
            done()
        }
    })

    it('returns a user if the pwd is right', async () => {
        await service.signup('abctest@gmail.com', '233')
        const user = await service.signin('abctest@gmail.com', '233')
        expect(user).toBeDefined()
    })
})

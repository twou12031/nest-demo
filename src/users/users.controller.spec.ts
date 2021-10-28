import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { AuthService } from './auth.service'
import { User } from './user.entity'
import { CreateMessageDto } from '../../src-messages/messages/dtos/create-message.dto'

describe('UsersController', () => {
    let controller: UsersController
    let fakeUsersService: Partial<UsersService>
    let fakeAuthService: Partial<AuthService>

    beforeEach(async () => {
        fakeUsersService = {
            findOne: (id: number) => {
                return Promise.resolve({
                    id,
                    email: 'abctest@gmail.com',
                    password: '233'
                } as User)
            },
            find: (email: string) => {
                return Promise.resolve([
                    {
                        id: 1,
                        email,
                        password: '233'
                    } as User
                ])
            },
            create: (email: string, password: string) => {
                return Promise.resolve({
                    id: 1,
                    email,
                    password
                } as User)
            }
            // remove: () => {},
            // update: () => {}
        }
        fakeAuthService = {
            // signup: () => {},
            signin: (email: string, password: string) => {
                return Promise.resolve({
                    id: 1,
                    email,
                    password
                } as User)
            }
        }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService
                }
            ]
        }).compile()

        controller = module.get<UsersController>(UsersController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('findAllUsers returns all users with the given email', async () => {
        const users = await controller.findAllusers('abc@gmail.com')
        expect(users.length).toEqual(1)
        expect(users[0].email).toEqual('abc@gmail.com')
    })

    it('findUser returns one user with the given id', async () => {
        const user = await controller.findUser('1')
        expect(user).toBeDefined()
    })

    it('findUser throws an error if user is not exist', async (done) => {
        fakeUsersService.findOne = () => null
        try {
            await controller.findUser('1')
        } catch (error) {
            done()
        }
    })

    it('signin updates session obj and renturns user', async () => {
        const session: any = {}
        const user = await controller.signin(
            {
                email: 'abctest@gmail.com',
                password: '233'
            },
            session
        )
        expect(user.id).toEqual(1)
        expect(session.userId).toEqual(1)
    })
})

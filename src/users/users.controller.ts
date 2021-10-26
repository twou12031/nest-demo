import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    NotFoundException,
    Session,
    UseGuards
    // UseInterceptors
} from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dtos/update-user.dto'
import { Serialize } from '../interceptors/serialize.interceptor'
import { UserDto } from './dtos/user.dto'
import { AuthService } from './auth.service'
import { User } from './user.entity'
import { CurrentUser } from './decorators/current-user.decorator'
import { AuthGuard } from '../guards/auth.guard'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    // @Get('/whoami')
    // whoAmI(@Session() session: any) {
    //     return this.usersService.findOne(session.userId)
    // }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const { email, password } = body
        // return this.authService.signup(email, password)
        const user = await this.usersService.create(email, password)
        session.userId = user.id
        return user
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const { email, password } = body
        // return this.authService.signin(email, password)
        const user = await this.usersService.create(email, password)
        session.userId = user.id
        return user
    }

    @Get('/:id')
    // @UseInterceptors(SerializeInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @Serialize(UserDto)
    async findUser(@Param('id') id: string) {
        // SerializeInterceptor: 2
        console.log('@findUser controller')
        const user = await this.usersService.findOne(parseInt(id, 10))
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user
    }

    @Get()
    findAllusers(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id, 10))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id, 10), body)
    }
}

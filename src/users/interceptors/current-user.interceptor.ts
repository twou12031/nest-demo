import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from '@nestjs/common'
import { UsersService } from '../users.service'

// 使用拦截器, 处理 session, 讲所需要的内容, 挂载在request内
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest()
        const { userId } = request.session
        if (userId) {
            const user = await this.usersService.findOne(userId)
            request.currentUser = user
        }
        return handler.handle()
    }
}

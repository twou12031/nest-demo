import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
    // data: 使用装饰器时, 传入的参数
    // ExecutionContext: 执行上下文
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        const { currentUser } = request
        return currentUser
    }
)

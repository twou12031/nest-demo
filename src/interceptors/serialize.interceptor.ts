import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UseInterceptors
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { map, Observable } from 'rxjs'
// import { UserDto } from '../users/dtos/user.dto'

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(
        context: ExecutionContext,
        handler: CallHandler
    ): Observable<any> {
        // SerializeInterceptor: 1
        console.log('@before handler, context:', context)

        return handler.handle().pipe(
            map((data: any) => {
                // SerializeInterceptor: 3
                console.log('@before response sent out', data)
                // return plainToClass(UserDto, data, {
                //     // 结果仅保留 @Expose() 装饰的内容
                //     excludeExtraneousValues: true
                // })
                return plainToClass(this.dto, data, {
                    // 结果仅保留 @Expose() 装饰的内容
                    excludeExtraneousValues: true
                })
            })
        )
    }
}

interface ClassConstructor {
    new (...args: any[]): unknown
}

// 自定义装饰器
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

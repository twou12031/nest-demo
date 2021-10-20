import { Module } from '@nestjs/common'
import { MessagesController } from './messages.controller'
import { MessagesRepository } from './messages.repository'
import { MessagesService } from './messages.service'

@Module({
    // 最终创建的controller实例的 class
    // nest创建最终实例时, 其被依赖项, 仅创建一次, 复用
    controllers: [MessagesController],
    // 注入 创建实例时, 被依赖项的 class
    providers: [MessagesService, MessagesRepository]
})
export class MessagesModule {}

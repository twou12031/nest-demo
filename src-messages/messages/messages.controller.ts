import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateMessageDto } from './dtos/create-message.dto'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
    constructor(public messagesService: MessagesService) {}

    @Get()
    listMessages() {
        return this.messagesService.findAll()
    }

    @Post()
    // 关于CreateMessageDto为什么能校验
    // ts编译为js之后, 所有ts相关代码不存在. 包括类型
    // tsconfig.json中, emitDecoratorMetadata: true
    // 允许少量类型信息保留到js中
    createMessage(@Body() body: CreateMessageDto) {
        return this.messagesService.create(body.content)
    }

    @Get(':id')
    getMessage(@Param('id') id: string) {
        return this.messagesService.findOne(id)
    }
}

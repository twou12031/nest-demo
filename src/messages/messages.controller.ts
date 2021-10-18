import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dots/create-message.dot';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages(){
        return '@get all'
    }

    @Post()
    // 关于CreateMessageDto为什么能校验
    // ts编译为js之后, 所有ts相关代码不存在. 包括类型
    // tsconfig.json中, emitDecoratorMetadata: true
    // 允许少量类型信息保留到js中
    createMessage(@Body() body:CreateMessageDto){
        return body
    }

    @Get('/:id')
    getMessage(@Param() id:string){
        return id
    }
}

import { Injectable } from '@nestjs/common'
import { MessagesRepository } from './messages.repository'

// 表示当前class为被依赖项的class
@Injectable()
export class MessagesService {
    constructor(public messagesRepo: MessagesRepository) {}

    findOne(id: string) {
        return this.messagesRepo.findOne(id)
    }

    findAll() {
        return this.messagesRepo.findAll()
    }

    create(content: string) {
        return this.messagesRepo.create(content)
    }
}

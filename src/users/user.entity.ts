// import { Exclude } from 'class-transformer'
import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    // @Exclude()
    // 响应不输出下方内容
    password: string

    @AfterInsert()
    logInsert() {
        console.log('@after insert, the id is:', this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log('@after remove, the id is:', this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log('@after uodate, the id is:', this.id)
    }
}

import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_PIPE } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'
import { User } from './users/user.entity'
import { Report } from './reports/report.entity'
/* eslint-disable */
const cookieSession = require('cookie-session')
/* eslint-enable */

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [User, Report],
            // 同步设置 dev only
            synchronize: true
        }),
        UsersModule,
        ReportsModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                // 过滤多余内容
                whitelist: true
            })
        }
    ]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                cookieSession({
                    keys: ['haobai']
                })
            )
            .forRoutes('*')
    }
}

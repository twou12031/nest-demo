// import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

/* eslint-disable */
// const cookieSession = require('cookie-session')
/* eslint-enable */

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // app.use(
    //     cookieSession({
    //         keys: ['haobai']
    //     })
    // )

    // app.useGlobalPipes(
    //     new ValidationPipe({
    //         // 过滤多余内容
    //         whitelist: true
    //     })
    // )

    await app.listen(3000)
}
bootstrap()

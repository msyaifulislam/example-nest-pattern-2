import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './modules/coffee/coffee.module';
import { CoffeeRatingModule } from './modules/coffee-rating/coffee-rating.module';
import { CoffeeRatingDetailModule } from './modules/coffee-rating-detail/coffee-rating-detail.module';
import { CoffeeDetailModule } from './modules/coffee-detail/coffee-detail.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './modules/coffee/entities/coffee.entity';
import { RollbackModule } from './modules/rollback/rollback.module';

@Module({
  imports: [
    CoffeeModule,
    CoffeeRatingModule,
    CoffeeRatingDetailModule,
    CoffeeDetailModule,
    ClientsModule.register([
      {
        name: 'REDIS-TRANSPORT',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootpassword123!@#',
      database: 'example_app',
      // entities: [__dirname + "/../src/modules/**/*.entity.ts"],
      entities: [Coffee],
      synchronize: true,
      logging: true,
      cache: {
        type: 'redis',
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    }),
    RollbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

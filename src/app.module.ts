import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftModule } from './nft/nft.module';
import { MongooseModule } from '@nestjs/mongoose';

import { DataSource } from "typeorm"

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nft-api'),
    NftModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

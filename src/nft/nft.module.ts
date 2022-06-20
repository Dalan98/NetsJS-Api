import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {NftEntity } from './nft.entity';
//Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../schema/nft.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([NftEntity]),
    MongooseModule.forFeature([{name: 'Nft', schema: ProductSchema}])
  ],
  controllers: [NftController],
  providers: [NftService],
  exports: [NftService]
})
export class NftModule {}

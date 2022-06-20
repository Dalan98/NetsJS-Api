import { Body, Controller, Get, HttpStatus, Param, Post, Res, Req, NotFoundException, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { NftService } from "./nft.service";
import { CreateNftDTO } from '../dto/nft.dto'
import { Observable } from 'rxjs';
import { NftModule } from './nft.module';
import { NftEntity } from './nft.entity';
import { Nft } from "../interfaces/nft.interface";
import {Request} from "express";
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('nft')
export class NftController {

    constructor(private readonly nftService: NftService) {}

    @Get('/getByNftId/:nftId')
    async getNftByNftId(@Res() res, @Param('nftId') nftId) {
        const nfts = await this.nftService.getNftByNftId(nftId);
        return res.status(HttpStatus.OK).json({
            nfts
        })
    }

    @Get('/getAllNfts')
    getAllPagination(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('nftId') nftId: number,
        @Query('name') name: string,
        @Query('description') description: string,
        @Query('owner') owner: string,
        @Query('creator') creator: string,
        @Query('image') image: string,
        ): Observable<Pagination<Nft>> {
            limit = limit > 100 ? 100 : limit;

            return this.nftService.getAllNfts(
                { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/nft/getAllNfts' },
                { nftId, name, description, owner, creator, image }
            );
    }

}

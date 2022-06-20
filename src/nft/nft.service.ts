import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from "mongoose";
import { Nft } from "../interfaces/nft.interface";
import { NftEntity } from './nft.entity';
import { InjectModel } from "@nestjs/mongoose";
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { MongoRepository, Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class NftService {

    constructor(
      @InjectModel('Nft') readonly nftModel: Model<Nft>,
      @InjectRepository(NftEntity) private readonly repository: MongoRepository<NftEntity>,
      ) {}

  async getNftByNftId(nftId: number): Promise<Nft[]>{
    const nfts = await this.nftModel.find({nftId:nftId})
    return nfts;
  }

  getAllNfts(options: IPaginationOptions, nft: Nft): Observable<Pagination<Nft>> {
    return from(this.repository.findAndCount({
      skip: Number(options.page) * Number(options.limit) || 0,
      take: Number(options.limit) || 10,
      order: {id: "ASC"},
      select: ['nftId', 'name', 'description', 'owner', 'creator', 'image'],
    })).pipe(
      map(([nfts, totalNfts]) => {
          const nftPageable: Pagination<Nft> = {
            Data: nfts,
              pagination: {
                nextPage: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
                prevPage: options.route + `?limit=${options.limit}&page=${Math.ceil(totalNfts / Number(options.limit))}`,
                currentPage: Number(options.page),
                totalPages: Math.ceil(totalNfts / Number(options.limit)),
                totalItems: totalNfts
              }
          };              
          return nftPageable;
      })
    )
  }
}

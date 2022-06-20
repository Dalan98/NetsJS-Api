import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class NftEntity {

    @ObjectIdColumn()
    id: number;

    @Column()
    nftId: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    creator: string;
    
    @Column()
    owner: string;
    
    @Column()
    image: string;

}
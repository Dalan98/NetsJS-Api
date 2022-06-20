import { Document } from "mongoose";

export interface Nft {
    nftId?: number;
    name?: string;
    description?: string;
    creator?: string;
    owner?: string
    image?: string;
    // pagination: {
		// nextPage: string,// (URL), -> URL de la API que permitirá consumir la siguiente tanda
		// prevPage: string, // (URL), -> URL de la API que permitirá consumir la anterior tanda
		// currentPage: number,
		// totalPages: number,
    // totalDataItems: number // -> Total de NFTs encontrados por el filtro. No el total devuelto en la consulta
	// }
}
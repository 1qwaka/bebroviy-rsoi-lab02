import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaginationHotelDto } from './dto/pagination-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { firstValueFrom } from 'rxjs';
import { PaginationModel } from 'src/util/pagination.model';

@Injectable()
export class HotelService {

    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService,
    ) {
        this.baseUrl = config.getOrThrow<string>('RESERVATION_URL');
    }

    async findAll(data: PaginationHotelDto) {
        const res = await firstValueFrom(
            this.httpService.get<PaginationModel<Hotel>>(`${this.baseUrl}/hotels`, { params: data })
        );
        return res.data;
    }
 
    async findOne(hotelUid: string) {
        const res = await firstValueFrom(
            this.httpService.get<Hotel>(`${this.baseUrl}/hotels/${hotelUid}`)
        );
        return res.data;
    }
}

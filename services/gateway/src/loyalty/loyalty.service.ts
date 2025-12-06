import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateLoyaltyDto } from 'src/loyalty/dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from 'src/loyalty/dto/update-loyalty.dto';
import { Loyalty } from 'src/loyalty/entities/loyalty.entity';

@Injectable()
export class LoyaltyService {

    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService,
    ) {
        this.baseUrl = this.config.getOrThrow<string>('LOYALTY_URL');
    }

    async create(data: CreateLoyaltyDto) {
        const res = await firstValueFrom(this.httpService.post<Loyalty>(
            `${this.baseUrl}/loyalties/`,
            data,
        ))
        return res.data;
    }

    async findOne(username: string) {
        const res = await firstValueFrom(this.httpService.get<Loyalty>(
            `${this.baseUrl}/loyalties/${username}`,
        ))
        return res.data;
    }

    async update(username: string, data: UpdateLoyaltyDto) {
        const res = await firstValueFrom(this.httpService.patch<Loyalty>(
            `${this.baseUrl}/loyalties/${username}`,
            data,
        ))
        return res.data;
    }

}

import {
    Controller,
    Get,
    Post,
    Body,
    Query,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { PaginationHotelDto } from 'src/hotel/dto/pagination-hotel.dto';

@Controller('hotels')
export class HotelController {
    constructor(private readonly hotelService: HotelService) {}

    @Post()
    create(@Body() createHotelDto: CreateHotelDto) {
        return this.hotelService.create(createHotelDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationHotelDto) {
        return this.hotelService.findAll(paginationDto);
    }

}

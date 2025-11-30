import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentStatus } from 'src/payment/entities/payment.entity';
import { In, Repository } from 'typeorm';
import { FindPaymentsBatchDto } from 'src/payment/dto/find-payments-batch.dto';

@Injectable()
export class PaymentsService {

    constructor(
        @InjectRepository(Payment)
        private readonly repository: Repository<Payment>
    ) {}

    create(dto: CreatePaymentDto) {
        const payment = this.repository.create({
            status: PaymentStatus.PAID,
            price: dto.price,
        })
        return this.repository.save(payment);
    }

    findAll(dto: FindPaymentsBatchDto) {
        return this.repository.find({
            where: { paymentUid: In(dto.uids) },
        });
    }

    findOne(paymentUid: string) {
        // TODO мб стоит проверять на null и выбрасывать исключение 404 при ненаходе
        return this.repository.findOneBy({ paymentUid });
    }

}

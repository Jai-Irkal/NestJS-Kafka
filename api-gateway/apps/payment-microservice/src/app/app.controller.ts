import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('process_payment')
  processPayment(data: any) {
    console.log('[Payment Service] Processing payment for order:', data);
    // Simulate payment processing logic here
    this.kafkaClient.emit('payment_succeed', data)
  } 
}

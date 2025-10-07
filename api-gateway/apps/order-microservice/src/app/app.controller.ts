import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

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

  @MessagePattern('order_created')
  handleOrderCreated(@Payload() order:any){
    console.log('Handler triggered');
    console.log("[Order-Service] Order Created Event Received:", order);

    // Simulate order processing
    this.kafkaClient.emit('process_payment', order)
  }
}

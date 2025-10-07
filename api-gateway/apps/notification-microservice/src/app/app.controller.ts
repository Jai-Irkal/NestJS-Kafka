import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order_created')
  sendOrderCreatedNotification(@Payload() data: any) {
    console.log("[Notification Service] Order Created Event Received:", data);
  }

  @MessagePattern('payment_succeed')
  sendPaymentSucceedNotification(@Payload() data: any) {
    console.log("[Notification Service] Payment Received:", data);
  }
}

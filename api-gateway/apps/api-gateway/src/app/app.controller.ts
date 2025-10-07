import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) { }

  // async onModuleInit() {
  //   await this.kafkaClient.connect();
  //   console.log("Kafka connected in onModuleInit");
  // }
  @Get()
  getData() {
    return this.appService.getData();
  }

  // Create DTO for body
  @Post("order")
  async createOrder(@Body() order: any) {

    console.log("Kafka connected")
    await this.kafkaClient.emit('order_created', order).toPromise()

    return {
      message: "Order placed succcessfully",
      order
    }
  }
}

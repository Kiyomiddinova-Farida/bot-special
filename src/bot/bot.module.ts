import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [WeatherModule],
  providers: [BotUpdate],
})
export class BotModule {}
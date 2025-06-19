import { Update, Start, Command, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { WeatherService } from '../weather/weather.service';

@Update()
export class BotUpdate {
  constructor(private readonly weatherService: WeatherService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply(
      '🌤 Ob-havo botiga xush kelibsiz!\n\n' +
      'Ob-havo maʼlumotini olish uchun:\n' +
      '/weather Toshkent\n\nMasalan: /weather Buxoro'
    );
  }

  @Command('weather')
  async getWeather(@Ctx() ctx: any) {
    const city = ctx.message?.text?.split(' ')[1];
    if (!city) return ctx.reply('Iltimos, shahar nomini yozing. Masalan: /weather Fargona');

    try {
      const data = await this.weatherService.getWeatherByCity(city);
      return ctx.reply(
        `🌦 Ob-havo (${city}):\n\n` +
        `Harorat: ${data.temp}°C\n` +
        `Namlik: ${data.humidity}%\n` +
        `Bosim: ${data.pressure} hPa\n` +
        `Shamol: ${data.wind} km/s\n` +
        `Holat: ${data.description}`
      );
    } catch (err) {
      return ctx.reply('Shahar topilmadi yoki WeatherAPI API xatolik berdi.');
    }
  }
}

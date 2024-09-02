import { Injectable } from '@nestjs/common';
import { HeroRequest, HeroResponse } from './interfaces/hero.interface';

@Injectable()
export class HeroService {
  getHero(data: HeroRequest): HeroResponse {
    // Contoh logika
    return { name: `Hero with ID ${data.id}` };
  }
}

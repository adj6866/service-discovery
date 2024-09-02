import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HeroService } from './hero.service';
import { HeroRequest, HeroResponse } from './interfaces/hero.interface';

@Controller()
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @GrpcMethod('HeroService', 'GetHero')
  getHero(data: HeroRequest): HeroResponse {
    return this.heroService.getHero(data);
  }
}

import { Controller, Get } from '@nestjs/common';

import { SchedulesService } from './schedules.service';

@Controller()
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}
}

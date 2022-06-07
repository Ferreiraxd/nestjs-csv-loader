import { Test, TestingModule } from '@nestjs/testing';
import { PassengersGroupService } from './passengers-group.service';

describe('PassengersGroupService', () => {
  let service: PassengersGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassengersGroupService],
    }).compile();

    service = module.get<PassengersGroupService>(PassengersGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PassengersGroupController } from './passengers-group.controller';

describe('PassengersGroupController', () => {
  let controller: PassengersGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassengersGroupController],
    }).compile();

    controller = module.get<PassengersGroupController>(PassengersGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

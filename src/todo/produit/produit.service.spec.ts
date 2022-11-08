import { Test, TestingModule } from '@nestjs/testing';
import {ProduitsService} from "./produit.service";


describe('ProduitService', () => {
  let service: ProduitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProduitsService],
    }).compile();

    service = module.get<ProduitsService>(ProduitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

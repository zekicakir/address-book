import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
// addressExtraField.service.ts 
import { AddressExtraField } from './addressextrafield.entity';

@Injectable()
export class AddressExtraFieldService {
  constructor(
    @InjectRepository(AddressExtraField)
    private readonly addressExtraFieldRepository: Repository<AddressExtraField>,
  ) {}
 
}

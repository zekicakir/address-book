
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressBook } from './addressbook.entity'; 
@Injectable()
export class AddressBookService {
  
  constructor(
    @InjectRepository(AddressBook)
    private readonly addressbookRepository: Repository<AddressBook>, 

  ) {}
  async create(user: AddressBook): Promise<AddressBook> {
    return this.addressbookRepository.save(user);
  }

  async getAll(): Promise<Array<AddressBook> | undefined> {
    const addressbooks =await this.addressbookRepository.find();
    return addressbooks;
  }
  
  async findOne(id: number): Promise<AddressBook | undefined> {
    return this.addressbookRepository.findOne({ where: { id } });
  }
 

  async update(id: number, addressBook: AddressBook): Promise<AddressBook> {
    const existingAddressBook = await  this.findOne(id);
    if (!existingAddressBook) {
      throw new NotFoundException('AddressBook not found');
    }
 
    const updatedAddressBook = await this.addressbookRepository.save({
      ...existingAddressBook,
      ...addressBook,
    });
    return updatedAddressBook;
  }
 
 
 

  async delete(id: string): Promise<void> {
    const deleteResult = await this.addressbookRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException('Adres bulunamadı');
    }
  }

}
 

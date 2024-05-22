import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { AddressBook } from './addressbook.entity';
import { AddressExtraField } from './addressextrafield.entity';
import AddressDTO from './dto/AddressBookDto.dto';
import { plainToClass } from 'class-transformer';
import { addAbortSignal } from 'stream';


@Injectable()
export class AddressBookService {
  
  constructor(
    @InjectRepository(AddressBook)
    private readonly addressbookRepository: Repository<AddressBook>,
    @InjectRepository(AddressExtraField)
    private readonly addressExtraFieldRepository: Repository<AddressExtraField>
  ) {} 
  async create(addressData:AddressDTO): Promise<AddressDTO> {
    const addressBook = plainToClass(AddressBook, addressData);

    const savedAddressBook = await this.addressbookRepository.save(addressBook);

    if (addressData.extraFields && addressData.extraFields.length > 0) {
      const extraFields = addressData.extraFields.map(fieldData => {
        return plainToClass(AddressExtraField, {
          addressid: savedAddressBook.id,
          ...fieldData
        });
      }); 
      await this.addressExtraFieldRepository.save(extraFields);
    }
 
    return { ...addressData, id: savedAddressBook.id };

  }
  async getAll(): Promise<AddressDTO[]> {
    const addressBooks = await this.addressbookRepository.find();

    const addressDTOs = await Promise.all(addressBooks.map(async (addressBook) => {
      const extraFields = await this.addressExtraFieldRepository.find({ where: { addressid: addressBook.id } });

      const addressDTO = plainToClass(AddressDTO, addressBook);
      addressDTO.extraFields = extraFields;

      return addressDTO;
    }));

    return addressDTOs;
  }
  async findOne(id: number): Promise<AddressDTO | undefined> {

    const addressBook = await this.addressbookRepository.findOne({ where: { id } });
    if (!addressBook) {
      throw new NotFoundException('AddressBook not found');
    }
    const extraFields = await this.addressExtraFieldRepository.find({ where: { addressid: id } });
    const addressDTO = plainToClass(AddressDTO, addressBook);
      addressDTO.extraFields = extraFields;


    return addressDTO;
  }
 
  async update(id: number, addressBookData: AddressDTO): Promise<AddressDTO> {
    const existingAddressBook = await this.findOne(id);
    if (!existingAddressBook) {
      throw new NotFoundException('AddressBook not found');
    }

    const updatedAddressBook = await this.addressbookRepository.save({
      ...existingAddressBook,
      ...addressBookData,
    });
    
    await this.addressExtraFieldRepository.delete({ addressid: id });
    if (addressBookData.extraFields) { 
      const newExtraFields = addressBookData.extraFields.map(fieldData => {
        return plainToClass(AddressExtraField, {
          addressid: updatedAddressBook.id,
          ...fieldData
        });
      });
 
      await this.addressExtraFieldRepository.save(newExtraFields);
    }

    const extraFields = await this.addressExtraFieldRepository.find({ where: { addressid: id } });
    const addressDTO = plainToClass(AddressDTO, updatedAddressBook);
    addressDTO.extraFields = extraFields;
    return addressDTO;
  }
  async delete(id: number): Promise<void> {
    const deleteResult = await this.addressbookRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException('AddressBook not found');
    }

    await this.addressExtraFieldRepository.delete({ addressid: id });
  }
}
 
/*
 /*
 
      const newExtraFields = addressBookData.extraFields.map(fieldData => {
        const addressExtraField = new AddressExtraField();
        addressExtraField.addressid = updatedAddressBook.id;
        addressExtraField.key = fieldData.key;
        addressExtraField.value = fieldData.value;
        return addressExtraField;
      });


    const addressBook = new AddressBook();
    addressBook.name = addressData.name;
    addressBook.surname = addressData.surname;
    addressBook.telephone = addressData.telephone;
    addressBook.age = addressData.age;
    addressBook.gender = addressData.gender;
    addressBook.city = addressData.city;

    const savedAddressBook = await this.addressbookRepository.save(addressBook);

    const extraFields = addressData.extraFields.map(fieldData => {
      const addressExtraField = new AddressExtraField();
      addressExtraField.addressid = savedAddressBook.id;
      addressExtraField.key = fieldData.key;
      addressExtraField.value = fieldData.value;
      return addressExtraField;
    });

    const savedExtraFields = await this.addressExtraFieldRepository.save(extraFields);

    return new AddressDTO(savedAddressBook, savedExtraFields);
    */
/*
  async delete(id: string): Promise<void> {
    const deleteResult = await this.addressbookRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException('Adres bulunamadı');
    }
  }*/
  /*
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
  }*/
 
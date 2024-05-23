import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm'; 
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
  async create(addressData:AddressDTO, userId: number): Promise<AddressDTO> {
    const addressBook = plainToClass(AddressBook, addressData);
    addressBook.userid = userId ;
    const savedAddressBook = await this.addressbookRepository.save(addressBook);

    if (addressData.extraFields && addressData.extraFields.length > 0) {
      const extraFields = addressData.extraFields.map(fieldData => {
        return plainToClass(AddressExtraField, {
          addressid: savedAddressBook.id,
          ...fieldData,
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

  async agereport(ageOrAgeRange: number | { minAge: number; maxAge: number }): Promise<AddressDTO[]> {
    let queryConditions: any = {};

    // Yaş aralığı verilmişse
    if (typeof ageOrAgeRange === 'object') {
        const { minAge, maxAge } = ageOrAgeRange;
        queryConditions.age = Between(minAge, maxAge);
    } else {
        // Tek bir yaş değeri verilmişse
        queryConditions.age = ageOrAgeRange;
    }

    const addressBooks = await this.addressbookRepository.find({ where: queryConditions });

    const addressDTOs = await Promise.all(addressBooks.map(async (addressBook) => {
        const extraFields = await this.addressExtraFieldRepository.find({ where: { addressid: addressBook.id } });

        const addressDTO = plainToClass(AddressDTO, addressBook);
        addressDTO.extraFields = extraFields;

        return addressDTO;
    }));

    return addressDTOs;
}

}
  
import { ApiProperty } from '@nestjs/swagger';
import { AddressBook } from '../addressbook.entity';
import { AddressExtraField } from '../addressextrafield.entity';

class AddressDTO { 
  id: number;

  @ApiProperty({ example: 'Zekeriya', description: 'Kullanıcının adı' })
  name: string;

  @ApiProperty({ example: 'Çakır', description: 'Kullanıcının soyadı' })
  surname: string;

  @ApiProperty({ example: '054372291896', description: 'Kullanıcının telefon numarası' })
  telephone: string;

  @ApiProperty({ example: 30, nullable: true, description: 'Kullanıcının yaşı' })
  age: number | null;

  @ApiProperty({ example: 'Erkek', description: 'Kullanıcının cinsiyeti' })
  gender: string;

  @ApiProperty({ example: 'Konya', description: 'Kullanıcının şehri' })
  city: string;

  @ApiProperty({ 
    example: [{ key: 'field1', value: 'value1' }], 
    description: 'Ek alanlar', 
    type: [Object] 
  })
  extraFields: { id: number, addressid: number, key: string, value: string }[];
/*
  constructor(
    addressBook: AddressBook, 
    extraFields: AddressExtraField[]
  ) {
    this.id = addressBook.id;
    this.name = addressBook.name;
    this.surname = addressBook.surname;
    this.telephone = addressBook.telephone;
    this.age = addressBook.age;
    this.gender = addressBook.gender;
    this.city = addressBook.city;
    this.extraFields = Array.isArray(extraFields) ? extraFields.map(field => ({
      id: field.id,
      addressid: field.addressid,
      key: field.key,
      value: field.value
    })) : [];
  }*/
}

export default AddressDTO;

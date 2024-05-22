// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressBook } from './addressbook.entity';
import { AddressBookService } from './addressbook.service'; 
import { AddressBookController } from './addressbook.controller';   
import { AddressExtraField } from './addressextrafield.entity';  


@Module({
  imports: [TypeOrmModule.forFeature([AddressBook,AddressExtraField])],
  providers: [AddressBookService],
  controllers: [AddressBookController],
  exports: [AddressBookService],
})
export class AddressBookModule {}

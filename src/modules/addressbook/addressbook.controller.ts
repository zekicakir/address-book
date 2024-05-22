import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { AddressBookService } from './addressbook.service';  
import AddressDTO from './dto/AddressBookDto.dto';
import { Public } from 'isPublic.decorator';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { ApiOperation, ApiTags,ApiBody, ApiBearerAuth } from '@nestjs/swagger'; 
import { UserDescription  } from '../../documentation/endpointdescriptions';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags(UserDescription.ADDRESS_OPERATION)
@Controller('addressbooks') 
export class AddressBookController {
 
  constructor(private readonly addressBookService: AddressBookService) {}
  @ApiOperation({summary:UserDescription.ADDRESS_CREATE})
  @Public()
  @Post('')
  @ApiBody({ type: AddressDTO })
  
  async create(@Body() createAddressBookDto: AddressDTO): Promise<AddressDTO> {
    return this.addressBookService.create(createAddressBookDto);
  }

  @ApiOperation({summary:UserDescription.ADDRESS_FIND_ALL})
  @Get()
  async getAll(): Promise<AddressDTO[]> {
    return this.addressBookService.getAll();
  }
  
  @ApiOperation({summary:UserDescription.ADDRESS_FIND_ONE})
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AddressDTO> {
    return this.addressBookService.findOne(id);
  }
  @ApiOperation({summary:UserDescription.ADDRESS_UPDATE})
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAddressBookDto: AddressDTO): Promise<AddressDTO> {
    return this.addressBookService.update(id, updateAddressBookDto);
  }

  @ApiOperation({summary:UserDescription.ADDRESS_DELETE})
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.addressBookService.delete(id);
  }
  /*
  @ApiOperation({ summary: 'Address Book oluşturma' })
  @Public()
  @Post('')
  async create(@Body() addressbook: AddressBook): Promise<AddressBook> {

    return this.addressbookService.create(addressbook);
  }
  
  @Get('')
  async GetAllAddressBook(): Promise<Array<AddressBook>> {
    return this.addressbookService.getAll();
  }
  @Get(':id')
  async GetAddressBook(@Param('id') id: number): Promise<AddressBook> {
    return this.addressbookService.findOne(id);
  }
  @Put('') 
  async updateAddress(@Param('id') id: number, @Body() addressbook: AddressBook): Promise<AddressBook> {
    return this.addressbookService.update(id, addressbook);
  }
  
  @Delete(':id') 
  async deleteAddressbook(@Param('id') id:string):Promise<void>
  {
    return this.addressbookService.delete(id);
  }
*/
}

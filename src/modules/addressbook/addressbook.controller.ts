import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { AddressBookService } from './addressbook.service';
import AddressDTO from './dto/AddressBookDto.dto';
import { Public } from 'isPublic.decorator';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { ApiOperation, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserDescription } from '../../documentation/endpointdescriptions';
var CryptoJS = require("crypto-js");


@ApiBearerAuth()
@ApiTags(UserDescription.ADDRESS_OPERATION)
@Controller('addressbooks')
export class AddressBookController {

  constructor(private readonly addressBookService: AddressBookService) { }
  @ApiOperation({ summary: UserDescription.ADDRESS_CREATE })
  @Public()
  @Post('')
  @ApiBody({ type: AddressDTO })
  @UseGuards(AuthGuard)
  async create(@Request() req, @Body() createAddressBookDto: AddressDTO): Promise<AddressDTO> { 
    const userId = req.user.userId; 
    return this.addressBookService.create(createAddressBookDto, userId); 
  } 
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: UserDescription.ADDRESS_FIND_ALL })
  @Get()
  async getAll(): Promise<AddressDTO[]> {
    return this.addressBookService.getAll();
  }
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: UserDescription.ADDRESS_FIND_ONE })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AddressDTO> {
    return this.addressBookService.findOne(id);
  } 
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: UserDescription.ADDRESS_UPDATE })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAddressBookDto: AddressDTO): Promise<AddressDTO> {
    return this.addressBookService.update(id, updateAddressBookDto);
  }
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: UserDescription.ADDRESS_DELETE })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.addressBookService.delete(id);
  }
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: UserDescription.AGEREPORT })
    @Get('agereport/:ageOrAgeRange')
    async getAddressesByAgeOrRange(@Param('ageOrAgeRange') ageOrAgeRange: string): Promise<AddressDTO[]> {
        let ageOrAgeRangeParam: number | { minAge: number; maxAge: number };
  
        if (ageOrAgeRange.includes('-')) {
            const [minAge, maxAge] = ageOrAgeRange.split('-').map(Number);
            ageOrAgeRangeParam = { minAge, maxAge };
        } else {
            ageOrAgeRangeParam = Number(ageOrAgeRange);
        }

        return await this.addressBookService.agereport(ageOrAgeRangeParam);
    }

}

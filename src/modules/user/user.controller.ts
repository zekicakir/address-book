import { Controller, Post, Body, Get,UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { user } from './user.entity';
import { Public } from 'isPublic.decorator';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDescription  } from '../../documentation/endpointdescriptions';
var CryptoJS = require("crypto-js");

@ApiBearerAuth()
@ApiTags(UserDescription.USER_OPERATION)
@Controller('users')

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({summary:UserDescription.USER_CREATE})
  @Post('') 
  async create(@Body() user: user): Promise<user> {
    let md5Hash = CryptoJS.MD5(user.password)+"";
    user.password=md5Hash;
    return this.userService.create(user);
  }
  @UseGuards(AuthGuard)
  @ApiOperation({summary:UserDescription.USER_FIND_ALL})
  @Get('')
  async GetUsers(): Promise<Array<user>> {
    return this.userService.getAll();
  }
}

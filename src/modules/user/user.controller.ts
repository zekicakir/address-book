import { Controller, Post, Body, Get,UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Public } from 'isPublic.decorator';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDescription  } from '../../documentation/endpointdescriptions';
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags(UserDescription.USER_OPERATION)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({summary:UserDescription.USER_CREATE})
  @Post('')
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
  @ApiOperation({summary:UserDescription.USER_FIND_ALL})
  @Get('')
  async GetUsers(): Promise<Array<User>> {
    return this.userService.getAll();
  }
}

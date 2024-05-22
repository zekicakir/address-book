import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class LoginDto {
    @IsString()
    @ApiProperty({ example: 'zeki', description: 'Kullanıcı Adı' })
    userName: string;
  
    @IsString()
    @ApiProperty({ example: '****', description: 'Kullanıcı Şifresi' })
    password: string;
  }
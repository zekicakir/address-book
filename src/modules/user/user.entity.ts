import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; 
import { ApiProperty } from '@nestjs/swagger';

@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ example: 'Zekeriya', description: 'Kullanıcının kullanıcı adı' }) 
  username: string;
  @ApiProperty({ example: 'password123', description: 'Kullanıcının şifresi' })
  @Column()
  password: string;
  
}
 
import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AddressBookModule } from './modules/addressbook/addressbook.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/user.controller';
import { AddressBookController } from './modules/addressbook/addressbook.controller'; 
import typeorm from './config/typeorm'; 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule'ü global yapar, böylece tüm modüllerde kullanılabilir
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    AuthModule,
    UserModule,
    AddressBookModule,
  ],
  controllers: [AppController, UserController,AddressBookController],
  providers: [AppService], 
})
export class AppModule {}

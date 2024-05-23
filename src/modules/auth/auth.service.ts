// auth.service.ts
import { Injectable,UnauthorizedException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
var CryptoJS = require("crypto-js");


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);

    let md5Hash = CryptoJS.MD5(pass)+"";
    if (md5Hash !== user?.password) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

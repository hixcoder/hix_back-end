import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signin() {
    return {
      msg: 'I m sign in',
    };
  }

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    // return the saved user
    return user;
  }
}

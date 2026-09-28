import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return {
      message: 'Registration successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.passwordHash,
    );

    if (!passwordMatches) {
        throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
        accessToken,
        user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        },
    };
    }
}

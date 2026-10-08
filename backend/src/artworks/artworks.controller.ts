import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import type { Request } from 'express';

import { ArtworksService } from './artworks.service.js';
import { CreateArtworkDto } from './dto/create-artwork.dto.js';
import { UpdateArtworkDto } from './dto/update-artwork.dto.js';
import { UpdateArtworkStatusDto } from './dto/update-artwork-status.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

import { Role } from '../generated/prisma/client.js';

import { FileInterceptor } from '@nestjs/platform-express';

// include user info
interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    email: string;
    role: Role;
  };
}

@Controller('artworks')
export class ArtworksController {
  constructor(private readonly artworksService: ArtworksService) {}

  // only published artwork is returned
  @Get()
  findPublished() {
    return this.artworksService.findPublished();
  }

  // returns all artwork owned by the seller
  @Get('mine')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER, Role.ADMIN)
  findMine(@Req() req: AuthenticatedRequest) {
    return this.artworksService.findMine(req.user.sub);
  }

  // only published artwork is returned
  @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.artworksService.findPublishedOne(id);
    }

  // create artwork, restricted to sellers and administrators
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER, Role.ADMIN)
  create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateArtworkDto,
  ) {
    return this.artworksService.create(req.user.sub, dto);
  }

  // update content, restricted to owner or administrator
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER, Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateArtworkDto,
  ) {
    return this.artworksService.update(
      id,
      req.user.sub,
      req.user.role,
      dto,
    );
  }

  // update status
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER, Role.ADMIN)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateArtworkStatusDto,
  ) {
    return this.artworksService.updateStatus(
      id,
      req.user.sub,
      req.user.role,
      dto.status,
    );
  }

  // delete artwork, restricted to owner or administrator
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER, Role.ADMIN)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.artworksService.remove(
      id,
      req.user.sub,
      req.user.role,
    );
  }

  // upload artwork image, restricted to owner or administrator
  @Post(':id/image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER, Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        // limit file size to 5MB
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,

    @UploadedFile(
      new ParseFilePipeBuilder()
        // Only allow JPEG, PNG, and WebP images
        .addFileTypeValidator({
          fileType: /^image\/(jpeg|png|webp)$/,
        })

        // limit file size to 5MB
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
        })

        .build(),
    )
    file: Express.Multer.File,
  ) {
    return this.artworksService.uploadImage(
      id,
      req.user.sub,
      req.user.role,
      file,
    );
  }
}
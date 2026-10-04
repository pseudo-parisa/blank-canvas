import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreateArtworkDto } from './dto/create-artwork.dto.js';
import { UpdateArtworkDto } from './dto/update-artwork.dto.js';
import { ArtworkStatus } from '../generated/prisma/client.js';

@Injectable()
export class ArtworksService {
  constructor(private readonly prisma: PrismaService) {}

  // create artwork 
  async create(sellerId: number, dto: CreateArtworkDto) {
    return this.prisma.artwork.create({
      data: {
        title: dto.title,
        description: dto.description,
        medium: dto.medium,
        width: dto.width,
        height: dto.height,
        sellerId,
        status: ArtworkStatus.DRAFT,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // public discovery only returns published artwork
  async findPublished() {
    return this.prisma.artwork.findMany({
      where: {
        status: ArtworkStatus.PUBLISHED,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // sellers can view all of their own artwork, regardless of status
  async findMine(sellerId: number) {
    return this.prisma.artwork.findMany({
      where: { sellerId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  // fetch a single public artwork 
  // only owner or an administrator can view unpublished artwork
  async findOne(id: number, requesterId?: number, requesterRole?: string) {
    const artwork = await this.prisma.artwork.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!artwork) {
      throw new NotFoundException('Artwork not found');
    }

    const isOwner = requesterId === artwork.sellerId;
    const isAdmin = requesterRole === 'ADMIN';

    if (
      artwork.status !== ArtworkStatus.PUBLISHED &&
      !isOwner &&
      !isAdmin
    ) {
      // hide existence of seller's private draft
      throw new NotFoundException('Artwork not found');
    }

    return artwork;
  }

  // update artwork content restricted to owner or an administrator
  async update(
    id: number,
    requesterId: number,
    requesterRole: string,
    dto: UpdateArtworkDto,
  ) {
    const artwork = await this.prisma.artwork.findUnique({
      where: { id },
    });

    if (!artwork) {
      throw new NotFoundException('Artwork not found');
    }

    if (
      artwork.sellerId !== requesterId &&
      requesterRole !== 'ADMIN'
    ) {
      throw new ForbiddenException(
        'You are not allowed to edit this artwork',
      );
    }

    return this.prisma.artwork.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  // update status restricted to owner or an administrator
  async updateStatus(
    id: number,
    requesterId: number,
    requesterRole: string,
    status: ArtworkStatus,
  ) {
    const artwork = await this.prisma.artwork.findUnique({
      where: { id },
    });

    if (!artwork) {
      throw new NotFoundException('Artwork not found');
    }

    if (
      artwork.sellerId !== requesterId &&
      requesterRole !== 'ADMIN'
    ) {
      throw new ForbiddenException(
        'You are not allowed to change this artwork status',
      );
    }

    // enum validation ensures status is a supported value
    return this.prisma.artwork.update({
      where: { id },
      data: { status },
    });
  }

  // deletion restricted to owner or an administrator.
  async remove(
    id: number,
    requesterId: number,
    requesterRole: string,
  ) {
    const artwork = await this.prisma.artwork.findUnique({
      where: { id },
    });

    if (!artwork) {
      throw new NotFoundException('Artwork not found');
    }

    if (
      artwork.sellerId !== requesterId &&
      requesterRole !== 'ADMIN'
    ) {
      throw new ForbiddenException(
        'You are not allowed to delete this artwork',
      );
    }

    await this.prisma.artwork.delete({
      where: { id },
    });

    return { message: 'Artwork deleted successfully' };
  }

  // fetch a single public artwork for visitors
  async findPublishedOne(id: number) {
    const artwork = await this.prisma.artwork.findFirst({
        where: {
        id,
        status: ArtworkStatus.PUBLISHED,
        },
        include: {
        seller: {
            select: {
            id: true,
            name: true,
            },
        },
        },
    });

    if (!artwork) {
        throw new NotFoundException('Artwork not found');
    }

    return artwork;
    }
}


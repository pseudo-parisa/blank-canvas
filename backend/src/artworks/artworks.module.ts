import { Module } from '@nestjs/common';

import { ArtworksController } from './artworks.controller.js';
import { ArtworksService } from './artworks.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

// encapsulates controller and service for managing artworks
// imports the PrismaModule for database interactions 
// exports the ArtworksService for use in other modules

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ArtworksController],
  providers: [ArtworksService],
  exports: [ArtworksService],
})
export class ArtworksModule {}
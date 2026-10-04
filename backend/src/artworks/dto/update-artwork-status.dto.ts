import { IsEnum } from 'class-validator';
import { ArtworkStatus } from '../../generated/prisma/client.js';

// status change endpoint
// for independent validation and authorization
export class UpdateArtworkStatusDto {
  @IsEnum(ArtworkStatus)
  status!: ArtworkStatus;
}
import { Type } from 'class-transformer';

import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class ArtworkQueryDto {
  // search query for artwork title or description
  @IsOptional()
  @IsString()
  search?: string;

  // filter by artwork medium
  @IsOptional()
  @IsString()
  medium?: string;

  // page number for pagination, default is 1
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  // number of artworks to return per page
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 12;
}
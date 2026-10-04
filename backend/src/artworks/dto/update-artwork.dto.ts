import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

// fields for updating an artwork
export class UpdateArtworkDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  medium?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  width?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  height?: number;
}
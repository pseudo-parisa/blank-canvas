import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

// fields for creating an artwork
export class CreateArtworkDto {
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  title!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  description!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  medium?: string;

  // optional dimensions
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  width?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  height?: number;
}
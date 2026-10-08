import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    // configure with env variables
    cloudinary.config({
      secure: true,
    });
  }

  // upload image to Cloudinary and return secureURL and publicId
  async uploadImage(
    buffer: Buffer,
    publicId: string,
  ): Promise<{
    secureUrl: string;
    publicId: string;
  }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'blank-canvas/artworks',
          public_id: publicId,
          resource_type: 'image',

          // optimize image quality and format
          transformation: [
            {
              quality: 'auto',
              fetch_format: 'auto',
            },
          ],
        },
        (error, result) => {
          if (error || !result) {
            reject(
              new InternalServerErrorException(
                'Unable to upload artwork image',
              ),
            );

            return;
          }

          resolve({
            secureUrl: result.secure_url,
            publicId: result.public_id,
          });
        },
      );

      uploadStream.end(buffer);
    });
  }

  // delete image from Cloudinary by publicId
  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
      type: 'upload',
      invalidate: true,
    });
  }
}
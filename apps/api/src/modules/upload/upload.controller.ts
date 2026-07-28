import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '~/config/env';

// Configure Cloudinary globally (or ideally in a config file)
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadController = {
  /**
   * Generates a signed payload for the frontend to upload files directly to Cloudinary.
   */
  getSignature: (req: Request, res: Response) => {
    // Generate a timestamp in seconds
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Optional: Add folder, tags, etc.
    const paramsToSign = {
      timestamp,
      folder: 'sakank_uploads',
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, env.CLOUDINARY_API_SECRET);

    res.status(200).json({
      success: true,
      data: {
        timestamp,
        signature,
        cloudName: env.CLOUDINARY_CLOUD_NAME,
        apiKey: env.CLOUDINARY_API_KEY,
        folder: 'sakank_uploads',
      },
      meta: null,
      error: null,
    });
  },
};

import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attachment.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Helper for filename generation (can be shared or defined here)
const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      // dest: './public/uploads/attachments', // Or configure storage per interceptor
      storage: diskStorage({ // Default storage, can be overridden in FileInterceptor
        destination: './public/uploads/attachments', // Ensure this directory exists
        filename: editFileName,
      }),
    }),
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
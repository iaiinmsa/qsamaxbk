import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    HttpCode,
    HttpStatus,
    Res,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { AttachmentService } from './attachment.service';
  import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import type { Response } from 'express';
  import * as path from 'path'; // Import path for serving files
  
  // Helper for filename generation
  const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(16)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };
  
  // Helper for file type validation
  export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx)$/)) {
      return callback(new Error('Only image (jpg,jpeg,png,gif) and document (pdf,doc,docx,xls,xlsx) files are allowed!'), false);
    }
    callback(null, true);
  };
  
  
  @ApiTags('Attachments')
  @Controller('attachments')
  export class AttachmentController {
    constructor(private readonly attachmentService: AttachmentService) {}
  
    @Post('upload')
    @UseInterceptors(
      FileInterceptor('file', { // 'file' is the field name in the form-data
        storage: diskStorage({
          destination: './public/uploads/attachments', // Ensure this directory exists
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
        limits: { fileSize: 1024 * 1024 * 10 } // 10MB limit
      }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'File to upload (image or document)',
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @ApiOperation({ summary: 'Upload a new attachment (image or document)' })
    @ApiResponse({ status: 201, description: 'File uploaded and attachment record created.' })
    @ApiResponse({ status: 400, description: 'Bad Request (e.g., file type or size error).' })
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      return this.attachmentService.createAttachment(file);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all attachment records' })
    @ApiResponse({ status: 200, description: 'List of all attachment records.'})
    findAll() {
      return this.attachmentService.findAllAttachments();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an attachment record by ID' })
    @ApiParam({ name: 'id', description: 'ID of the attachment', type: Number })
    @ApiResponse({ status: 200, description: 'The attachment record details.'})
    @ApiResponse({ status: 404, description: 'Attachment record not found.'})
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.attachmentService.findOneAttachment(id);
    }
  
    // Optional: Endpoint to serve the actual file
    @Get('file/:id')
    @ApiOperation({ summary: 'Get (serve) an attachment file by ID' })
    @ApiParam({ name: 'id', description: 'ID of the attachment to serve', type: Number })
    @ApiResponse({ status: 200, description: 'The attachment file.'})
    @ApiResponse({ status: 404, description: 'Attachment or file not found.'})
    async serveFile(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
      const attachment = await this.attachmentService.findOneAttachment(id);
      if (attachment && attachment.filePath) {
        // Assuming filePath is relative to a 'public' directory
        const filePath = path.join(process.cwd(), 'public', attachment.filePath);
        return res.sendFile(filePath, (err) => {
          if (err) {
            res.status(404).send({ message: "File not found or error serving file."});
          }
        });
      }
      return res.status(404).send({ message: "Attachment record or file path not found."});
    }
  
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete an attachment record and its file' })
    @ApiParam({ name: 'id', description: 'ID of the attachment to delete', type: Number })
    @ApiResponse({ status: 204, description: 'The attachment has been successfully deleted.'})
    @ApiResponse({ status: 404, description: 'Attachment not found.'})
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.attachmentService.removeAttachment(id);
    }
  }
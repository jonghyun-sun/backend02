import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class FileResolver {
  constructor(
    private readonly fileService: FileService, //
  ) {}
  @Mutation(() => String)
  uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    console.log(file);
    return this.fileService.upload({ file });
  }
}

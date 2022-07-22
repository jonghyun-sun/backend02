import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class FileResolver {
  constructor(
    private readonly fileService: FileService, //
  ) {}
  @Mutation(() => [String])
  uploadFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ) {
    console.log(files);
    return this.fileService.upload({ files });
  }
}

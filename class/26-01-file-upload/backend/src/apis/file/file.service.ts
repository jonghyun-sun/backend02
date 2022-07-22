import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IFile {
  file: FileUpload;
} //객체 type 지정 => 이렇게 지정해줘야 file.name등에 접근할 수 있다

@Injectable()
export class FileService {
  async upload({ file }: IFile) {
    const storage = new Storage({
      projectId: '', //어떤 프로젝트의 storage에 저장할건지(gcp에서 만든것)
    })
      .bucket('aa') //aa라는 버켓안에(gcp에서 만든것)
      .file(file.filename); //file.filename이라는 이름으로 저장할거야

    const result = await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.createWriteStream())
        .on('finish', () => {
          return resolve(`aa/${file.filename}`); //url주소
        })
        .on('error', () => {
          return reject();
        });
    });
    return result;
  }
}

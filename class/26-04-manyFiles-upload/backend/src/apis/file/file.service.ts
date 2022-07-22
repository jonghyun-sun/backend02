import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IFile {
  files: FileUpload[];
} //객체 type 지정 => 이렇게 지정해줘야 file.name등에 접근할 수 있다

@Injectable()
export class FileService {
  async upload({ files }: IFile) {
    const storage = new Storage({
      keyFilename: '', //gcp에서 다운받는 것
      projectId: '', //어떤 프로젝트의 storage에 저장할건지(gcp에서 만든것)
    }).bucket('aa');

    //일단 먼저 다 받기
    const waitedFiles = await Promise.all(files);

    const results = await Promise.all(
      waitedFiles.map((el) => {
        //files = [file1,file2,...]
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => {
              return resolve(`aa/${el.filename}`); //url주소
            })
            .on('error', () => {
              return reject();
            });
        });
      }),
    );
    return results;
  }
}

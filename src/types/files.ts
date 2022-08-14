export interface MulterFile {
    key: string
    path: string
    data: Buffer
    mimetype: string
    originalname: string
    size: number
  }
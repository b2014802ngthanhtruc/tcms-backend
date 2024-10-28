import { Injectable } from '@nestjs/common';
import { DocumentRepository } from '../repositories';

@Injectable()
export class DocumentService {
  constructor(private readonly _documentRepository: DocumentRepository) {}
}

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LibraryApiService } from './library-api.service';

describe('LibraryApiService', () => {
  let service: LibraryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LibraryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

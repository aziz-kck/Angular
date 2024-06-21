import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductService } from '../services/product.service';
import { StockService } from '../services/stock.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let stockService: jasmine.SpyObj<StockService>;

  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductService', ['fetchData', 'addProduct', 'deleteData']);
    stockService = jasmine.createSpyObj('StockService', ['fetchData']);

    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        HttpClientModule // Include HttpClientModule
      ],
      providers: [
        NgbModal,
        {
          provide: ProductService,
          useValue: productService
        },
        {
          provide: StockService,
          useValue: stockService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1' // Mocking route snapshot parameter 'id'
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

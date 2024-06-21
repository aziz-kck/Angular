// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
//
// import { ProductComponent } from './product.component';
//
// describe('ProductComponent', () => {
//   let component: ProductComponent;
//   let fixture: ComponentFixture<ProductComponent>;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ProductComponent]
//     });
//     fixture = TestBed.createComponent(ProductComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { StockService } from '../services/stock.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { of } from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;
  let stockService: StockService;
  let activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [HttpClientModule], // Include HttpClientModule in imports
      providers: [
        NgbModal,
        ProductService,
        StockService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '1' : null) // Adjust this mock as needed
              }
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    stockService = TestBed.inject(StockService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data successfully', () => {
    const mockResponse = { /* Mock your response data here */ };
    spyOn(productService, 'fetchData').and.returnValue(of(mockResponse));

    component.ngOnInit(); // Trigger ngOnInit manually

    expect(component.data).toEqual(mockResponse);
  });

});



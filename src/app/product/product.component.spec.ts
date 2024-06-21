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
import { of } from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;
  let stockService: StockService;

  // Mock ActivatedRoute with a mockSnapshot method
  const mockActivatedRoute = {
    snapshot: { paramMap: { get: () => '1' } }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        NgbModal,
        ProductService,
        StockService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    stockService = TestBed.inject(StockService);
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

  it('should handle null id in fetchData method', () => {
    spyOn(mockActivatedRoute.snapshot.paramMap, 'get').and.returnValue(null);
    spyOn(console, 'error'); // Spy on console.error

    component.fetchData();

    expect(console.error).toHaveBeenCalledWith('No ID found in route snapshot.');
    expect(productService.fetchData).not.toHaveBeenCalled(); // Ensure fetchData is not called
  });

  // Add more tests as needed for other methods and behaviors
});

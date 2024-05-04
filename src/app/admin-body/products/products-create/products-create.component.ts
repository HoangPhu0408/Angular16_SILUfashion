import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})
export class ProductsCreateComponent implements OnInit {
  product: any;
  //notification = "";
  productName: any;
  cateLst: any;
  categoriesID = '1';
  showSalePrice: boolean = false;
  currentDate: any;
  selectedSizeS: string = '';
  selectedSizeM: string = '';
  selectedSizeL: string = '';
  stateSizeS: boolean = false;
  stateSizeM: boolean = false;
  stateSizeL: boolean = false;
  btnSizeS = 'S';
  btnSizeM = 'M';
  btnSizeL = 'L';
  countS: any = 0;
  countM: any = 0;
  countL: any = 0;
  image1File: any;
  image2File: any;
  image3File: any;
  initialPrice: any;
  officialPrice: any;
  introduction: any;
  constructor(private productService: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.productService.getCategoryListAPI().subscribe(cate => this.cateLst = cate)
    this.currentDate = new Date();
  }
  onSizeSClick(selectedSize: string): void {
    if (this.countS % 2 == 0) {
      this.stateSizeS = true;
      this.selectedSizeS = this.btnSizeS
      console.log('selectedSizeS:', this.selectedSizeS)
      this.countS = this.countS + 1
    } else {
      this.stateSizeS = false;
      this.selectedSizeS = ''
      console.log(this.selectedSizeS)
      this.countS = this.countS + 1
    }
  }
  onSizeMClick(): void {
    if (this.countM % 2 == 0) {
      this.stateSizeM = true;
      this.selectedSizeM = this.btnSizeM
      console.log(this.selectedSizeM)
      this.countM = this.countM + 1
    } else {
      this.stateSizeM = false;
      this.selectedSizeM = ''
      console.log(this.selectedSizeS)
      this.countM = this.countM + 1
    }
  }
  onSizeLClick(): void {
    if (this.countL % 2 == 0) {
      this.stateSizeL = true;
      this.selectedSizeL = this.btnSizeL
      console.log(this.selectedSizeL)
      this.countL = this.countL + 1
    } else {
      this.stateSizeL = false;
      this.selectedSizeL = ''
      console.log(this.selectedSizeS)
      this.countL = this.countL + 1
    }
  }

  CreateProduct(f: NgForm) {
    if (f.valid) {
      const formData = new FormData();
      formData.append('productId', '0');
      formData.append('productName', this.productName);
      formData.append('categoryId', this.categoriesID);
      formData.append('size1', this.btnSizeS);
      formData.append('size2', this.btnSizeM);
      formData.append('size3', this.btnSizeL);
      formData.append('Amount1', this.countS);
      formData.append('Amount2', this.countM);
      formData.append('Amount3', this.countL);
      formData.append('initialPrice', this.initialPrice);
      formData.append('officialPrice', this.officialPrice);
      formData.append('introduction', this.introduction)
      if (this.image1File) {
        formData.append('image1', this.image1File, this.image1File.name);
      }
      if (this.image2File) {
        formData.append('image2', this.image2File, this.image2File.name);
      }
      if (this.image3File) {
        formData.append('image3', this.image3File, this.image3File.name);
      }

      // Call the API to create the product
      this.productService.postProductAPI(formData).subscribe(() => {
        console.log(formData);
        alert('Thêm sản phẩm thành công');
        this.router.navigate(['/products']);
      });
    } else {
      alert('Vui lòng nhập đầy đủ thông tin');
    }
  }

  // Function to handle file input change event for images
  onFileChange(event: any, imageNumber: number) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      // Check file size, type, etc. if needed
      switch (imageNumber) {
        case 1:
          this.image1File = file;
          break;
        case 2:
          this.image2File = file;
          break;
        case 3:
          this.image3File = file;
          break;
        default:
          break;
      }
    }
  }
}
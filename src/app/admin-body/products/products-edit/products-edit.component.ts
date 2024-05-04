import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from 'src/app/model/category.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  product: any;
  image1File: any;
  image2File: any;
  image3File: any;
  currentDate: any;
  cateProd: any;
  // categorySelected :string;
  cateLst: Categories[] = [];
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.currentDate = new Date();
    this.route.params.subscribe(() => {
      var productID = Number(this.route.snapshot.paramMap.get('id'));
      // alert(productID)
      this.productService.getProductIdAPI(productID).subscribe((prod: any) => {
        {
          this.product = prod;
        }
      });
      // alert(this.product)

      this.productService.getCategoryListAPI().subscribe(lstCate => this.cateLst = lstCate);

      // var cateID = this.product.categoryId;
      this.productService.getCategoryIdAPI(3).subscribe((cate: any) => {
        this.cateProd = cate;
        console.log(cate)
      }
      );

      console.log(this.product)
    });

  }



  EditProd() {
    const formData = new FormData();
    formData.append('categoryId', this.product.categoryId);
    formData.append('productName', this.product.productName);
    formData.append('createdDate', this.product.createdDate);
    formData.append('initialPrice', this.product.initialPrice);
    formData.append('officialPrice', this.product.officialPrice);
    formData.append('size1', 'S');
    formData.append('size2', 'M');
    formData.append('size3', 'L');
    formData.append('amount1', this.product.amount1);
    formData.append('amount2', this.product.amount2);
    formData.append('amount3', this.product.amount3);
    formData.append('introduction', this.product.introduction);
    formData.append('image1', this.image1File);
    formData.append('image2', this.image2File);
    formData.append('image3', this.image3File);

    this.productService.putProductAPI(this.product.productId, formData).subscribe(() => {
      alert('Lưu chỉnh sửa thành công');
      this.router.navigate(['products']);
    });
  }
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
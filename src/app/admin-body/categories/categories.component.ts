import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  category:any;
  constructor(private productService: ProductService, private router: Router){}
  ngOnInit(): void {
    this.productService.getCategoryListAPI().subscribe(cate => 
        this.category = cate.reverse()
      )
  }
  DeleteCate(cateId:any) {
    this.productService.deleteCategoryAPI(cateId).subscribe(() => {
      alert("Xóa danh mục thành công");
      this.productService.getCategoryListAPI().subscribe(cate =>
        this.category = cate.reverse()
      )
    })
  }
}

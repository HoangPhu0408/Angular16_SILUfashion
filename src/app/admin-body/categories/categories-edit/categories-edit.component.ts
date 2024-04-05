import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {
  cate: any;
  cateName: any;
  cateID: any;
  currentDate: any;
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.route.params.subscribe(() => {
      var cateid = Number(this.route.snapshot.paramMap.get('id'));
      this.productService.getCategoryIdAPI(cateid).subscribe((Cate: any) => {
        this.cate = Cate;
        this.cateName = Cate.categoryName
          this.cateID = Cate.categoryId;
        console.log(this.cateID);
      })
    })
  }

  EditCate() {
    const editedCate = {
      categoryName: this.cate.categoryName.toString(),
      createdDate: this.cate.createdDate.toString(),
    }
    console.log(editedCate)
    this.productService.putCategoryAPI(Number(this.cate.categoryId), editedCate).subscribe();
    console.log('cc', this.cate.categoryId)
    alert('Lưu chỉnh sửa thành công');
    this.router.navigate(['/categories'])
  }
}

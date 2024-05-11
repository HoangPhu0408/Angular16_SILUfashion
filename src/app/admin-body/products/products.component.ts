import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  lstProduct:any;
  constructor(private productService : ProductService,private router:Router){}
  ngOnInit(): void {
    this.productService.getProductListAPI().subscribe(lstProd => 
        this.lstProduct = lstProd.reverse()
      )
  }
  DeleteProduct(id:any) {
    this.productService.deleteProductAPI(id).subscribe(() => {
      alert('Xóa thành công');
      this.productService.getProductListAPI().subscribe(lstProd =>
        this.lstProduct = lstProd.reverse()
      )
    })
  }
}

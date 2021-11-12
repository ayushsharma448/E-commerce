import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems=[
  /* {id:1, productId:1, productName:'prod1', qty:4,price:100},
    {id:2, productId:3, productName:'prod3', qty:5,price:50},
    {id:3, productId:2, productName:'prod2', qty:3,price:200},
    {id:4, productId:4, productName:'prod4', qty:6,price:150}*/
  ];

  cardTotal=0;
  constructor(private msg: MessengerService)
   { }

  ngOnInit(): void
   { 
    this.msg.getMsg().subscribe( (product:Product)=> {
        this.addProductToCart(product);
      });
   }


  addProductToCart(product:Product)
  {

   let productExists=false;
   for(let index in this.cartItems){
    if(this.cartItems[index].productId === product.id){
     this.cartItems[index].qty++;
     productExists=true;
     break;
    }
  }

  if(!productExists)
  {
      this.cartItems.push({
      productId:product.id,
      productName: product.name,
      qty: 1,
      price:product.price
      });
  }
      //console.log(product);

      this.cardTotal=0;

      this.cartItems.forEach(item=>{
          this.cardTotal +=(item.qty * item.price)
                          });
  }
  
}

//implement remove for particular product for particular index ----- (cart item)
//implement removeall from add cart
//implement buy now and add product to history table   ----- clearCart and deleteAllCartData
//image to fetch from database
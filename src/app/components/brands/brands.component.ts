import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrands } from '../../core/interfaces/ibrands';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy{
  brandsList:WritableSignal<Ibrands[]>=signal([]);
  private readonly _BrandsService=inject(BrandsService);
  getAllBrandsSub!:Subscription

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands():void{
    this.getAllBrandsSub=this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.brandsList.set(res.data);
      }
      
    })
  }

  ngOnDestroy(): void {
    this.getAllBrandsSub?.unsubscribe();
  }
}

import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy {

  private readonly _CategoriesService=inject(CategoriesService);
  categoriesList:WritableSignal<Icategory[]>=signal([]);

  getAllCategoriesSub!:Subscription;

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories():void{
   this.getAllCategoriesSub= this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList.set(res.data);
      }
    })
  }

ngOnDestroy(): void {
  this.getAllCategoriesSub?.unsubscribe();
}

}

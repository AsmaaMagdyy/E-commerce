import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly _CategoriesService=inject(CategoriesService);
  categoriesList:WritableSignal<Icategory[]>=signal([]);
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories():void{
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList.set(res.data);
      }
    })
  }

}

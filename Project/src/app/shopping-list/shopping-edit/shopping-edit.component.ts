import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amtInput', {static: false}) amtInputRef: ElementRef;
  @Output() ingAdded = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
  }

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmt = this.amtInputRef.nativeElement.value;
    const newIng = new Ingredient(ingName, ingAmt);
    this.slService.addIngredient(newIng);
  }
}

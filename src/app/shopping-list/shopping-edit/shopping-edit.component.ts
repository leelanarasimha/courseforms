import {
    Component, OnDestroy,
    OnInit, ViewChild
} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {Form, FormControl, NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('f') shoppingForm;
    subscription: Subscription;
    editIndex = -1;
    editMode = false;
    editItems: Ingredient;

    constructor(private slService: ShoppingListService) {
    }

    ngOnInit() {
        this.subscription = this.slService.startEditing.subscribe(
            (index: number) => {
                this.editMode = true;
                this.editIndex = index;
                this.editItems = this.slService.getIngredient(index);
                this.shoppingForm.setValue({
                    name: this.editItems.name,
                    amount: this.editItems.amount
                });
            });
    }

    onResetForm() {
        this.shoppingForm.reset();
        this.editMode = false;
    }


    onAddItem(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            this.slService.updateIngredient(this.editIndex, newIngredient);
        } else {
            this.slService.addIngredient(newIngredient);
        }
        this.onResetForm();

    }

    onDelete() {
        this.slService.deleteIngredient(this.editIndex);
        this.editIndex = -1;
        this.onResetForm();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}

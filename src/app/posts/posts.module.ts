import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsCreateComponent } from './posts-create/posts-create.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[
        PostsCreateComponent,
        PostsListComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        RouterModule
    ]
})
export class PostModule{

}
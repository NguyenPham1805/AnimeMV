import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { routes } from "src/routes";

const routesConfig: Routes = [
  ...routes.map((route) => {
    return {
      path: route.path,
      component: route.selector,
    };
  }),
];

@NgModule({
  imports: [RouterModule.forRoot(routesConfig), CommonModule],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}

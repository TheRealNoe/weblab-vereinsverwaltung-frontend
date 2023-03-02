import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SidenavComponent } from "./sidenav/sidenav.component";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MemberOverviewComponent } from "./member-overview/member-overview.component";
import { EventOverviewComponent } from "./event-overview/event-overview.component";
import { ResourceOverviewComponent } from "./resource-overview/resource-overview.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MemberAddComponent } from "./member-add/member-add.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MemberModifyComponent } from "./member-modify/member-modify.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogComponent } from "./dialog/dialog.component";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { EventAddComponent } from "./event-add/event-add.component";
import { EventModifyComponent } from "./event-modify/event-modify.component";
import { ResourceAddComponent } from "./resource-add/resource-add.component";
import { ResourceModifyComponent } from "./resource-modify/resource-modify.component";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ErrorInterceptor } from "./helpers/error.interceptor";
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		SidenavComponent,
		MemberOverviewComponent,
		EventOverviewComponent,
		ResourceOverviewComponent,
		MemberAddComponent,
		MemberModifyComponent,
		DialogComponent,
		EventAddComponent,
		EventModifyComponent,
		ResourceAddComponent,
		ResourceModifyComponent,
  LoginComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatSidenavModule,
		MatListModule,
		MatMenuModule,
		HttpClientModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatTableModule,
		MatCardModule,
		MatGridListModule,
		MatInputModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatDialogModule,
		MatSortModule,
		MatSnackBarModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

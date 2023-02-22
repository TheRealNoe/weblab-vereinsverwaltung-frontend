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

@NgModule({
	declarations: [
		AppComponent,
		SidenavComponent,
		MemberOverviewComponent,
		EventOverviewComponent,
		ResourceOverviewComponent,
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
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MemberOverviewComponent } from "./member-overview/member-overview.component";
import { MemberAddComponent } from "./member-add/member-add.component";
import { MemberModifyComponent } from "./member-modify/member-modify.component";
import { EventOverviewComponent } from "./event-overview/event-overview.component";
import { ResourceOverviewComponent } from "./resource-overview/resource-overview.component";
import { EventAddComponent } from "./event-add/event-add.component";
import { EventModifyComponent } from "./event-modify/event-modify.component";
import { ResourceAddComponent } from "./resource-add/resource-add.component";
import { ResourceModifyComponent } from "./resource-modify/resource-modify.component";
import { LoginComponent } from "./login/login.component";
import { StatsComponent } from "./stats/stats.component";

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "stats", component: StatsComponent },
	{ path: "members", component: MemberOverviewComponent },
	{ path: "member-add", component: MemberAddComponent },
	{ path: "member-modify/:id", component: MemberModifyComponent },
	{ path: "events", component: EventOverviewComponent },
	{ path: "event-add", component: EventAddComponent },
	{ path: "event-modify/:id", component: EventModifyComponent },
	{ path: "resources", component: ResourceOverviewComponent },
	{ path: "resource-add", component: ResourceAddComponent },
	{ path: "resource-modify/:id", component: ResourceModifyComponent },
	{ path: "**", redirectTo: "/login" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

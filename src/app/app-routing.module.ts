import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MemberOverviewComponent } from "./components/member-overview/member-overview.component";
import { MemberAddComponent } from "./components/member-add/member-add.component";
import { MemberModifyComponent } from "./components/member-modify/member-modify.component";
import { EventOverviewComponent } from "./components/event-overview/event-overview.component";
import { ResourceOverviewComponent } from "./components/resource-overview/resource-overview.component";
import { EventAddComponent } from "./components/event-add/event-add.component";
import { EventModifyComponent } from "./components/event-modify/event-modify.component";
import { ResourceAddComponent } from "./components/resource-add/resource-add.component";
import { ResourceModifyComponent } from "./components/resource-modify/resource-modify.component";
import { LoginComponent } from "./components/login/login.component";
import { StatsComponent } from "./components/stats/stats.component";

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

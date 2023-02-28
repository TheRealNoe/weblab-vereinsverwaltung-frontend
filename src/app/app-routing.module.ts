import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MemberOverviewComponent } from "./member-overview/member-overview.component";
import { MemberAddComponent } from "./member-add/member-add.component";
import { MemberModifyComponent } from "./member-modify/member-modify.component";
import { EventOverviewComponent } from "./event-overview/event-overview.component";
import { ResourceOverviewComponent } from "./resource-overview/resource-overview.component";
import { EventAddComponent } from "./event-add/event-add.component";
import { EventModifyComponent } from "./event-modify/event-modify.component";

const routes: Routes = [
	{ path: "", redirectTo: "/members", pathMatch: "full" },
	{ path: "members", component: MemberOverviewComponent },
	{ path: "member-add", component: MemberAddComponent },
	{ path: "member-modify/:id", component: MemberModifyComponent },
	{ path: "events", component: EventOverviewComponent },
	{ path: "event-add", component: EventAddComponent },
	{ path: "event-modify/:id", component: EventModifyComponent },
	{ path: "resources", component: ResourceOverviewComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

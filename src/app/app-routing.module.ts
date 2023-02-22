import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MemberOverviewComponent } from "./member-overview/member-overview.component";
import { EventOverviewComponent } from "./event-overview/event-overview.component";
import { ResourceOverviewComponent } from "./resource-overview/resource-overview.component";

const routes: Routes = [
	{ path: "", redirectTo: "/members", pathMatch: "full" },
	{ path: "members", component: MemberOverviewComponent },
	{ path: "events", component: EventOverviewComponent },
	{ path: "resources", component: ResourceOverviewComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

import { Application } from "express";
import { HomeRoute } from "./home.route";

export class Routes {
  private homeRoute: HomeRoute;

  constructor(private app: Application) {
    this.homeRoute = new HomeRoute();
    this.app.use("/api", this.homeRoute.router);
  }
}

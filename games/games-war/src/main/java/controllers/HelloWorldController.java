package controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/hello")
public class HelloWorldController {

	public HelloWorldController() {
		// TODO Auto-generated constructor stub
	}

	@Path("")
	@GET
	public String hello() {
		return "hello world games";
	}
}

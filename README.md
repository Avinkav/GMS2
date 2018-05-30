# Generic Music School

This is a web application developed for the purpose of managing a Music School. It's mission is to provide a feature rich interactive front end backed by a powerful backend that could scale to support the demands of a large educational institute. This is purely a hobby and is in no way intended to be used in production.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Building the project requires the following tools

```
.NET Core SDK v2.0.0 or above
NodeJs v8.x LTS
IDE of your choice. we use VS Code
```

### Development Build

Complete the following steps to build the app

In the root folder run

```
dotnet restore
```

Change directory to GMS2.Core/ClientApp and restore dependencies for the angular project

```
cd GMS2.Core/ClientApp
npm install
```

Change directory back up to GMS2.Core and run

```
dotnet run
```

If that doesn't work try a package restore

```
dotnet restore
```

Direct your web browser to localhost:5000/ to view the app

## Running the tests

Change directory into GMS2.Core/ClientApp on your console and run Angular CLI's test runner

```
cd GMS2.Core/ClientApp
ng test
```

### Break down into end to end tests

Current tests are limited to user service and progress service. We started test implementation here as they expose a set of functionalaties to the rest of the componenents. The other componenets are dependant on these services being injected into them by the runtime, therefore they need to be tested first.

```
For example, test if calling start() on progress service emits the value 'true' on its behavioursubject 'inProgress' which the UI uses to indicate that work is being done in the background
```


## Deployment

Change directory to GMS2.Core and run

```
dotnet publish --configuration Release
```

## Built With

* [Angular 6](http://angular.io/) - The superheroic web framework
* [Bootstrap](https://getbootstrap.com/) - Front end styling
* [ASPNet Core](https://github.com/aspnet/Home) - Backend API


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Avin Kavish** - *Most of the work* - [GitHub](https://github.com/AvinKav)
* **Eric Tang** - *Some of the work* - [GitHub](https://github.com/ericsontang)
* **Aaidil Abdullah** - *Bit of the work* - [GitHub](https://github.com/AvinKav)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Coming soon

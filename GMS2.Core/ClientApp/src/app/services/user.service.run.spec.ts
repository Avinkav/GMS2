import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { User } from '../models/user';
import { routes } from 'src/app/app-routing.module';

describe('User Service', () => {
  const mockLogin = { email: 'test@test.com', password: '12345678' };
  const mockUser: User = new User();
  mockUser.id = 'fake-id-goes-here';
  mockUser.firstName = 'test first';
  mockUser.lastName = 'test last';

  const mockBadRequest = {
    status: 400, statusText: 'Bad Request'
  };
  const mockUnauthorized = {
    status: 400, statusText: 'Bad Request'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should make one request and return OK for a valid login', inject([UserService, HttpTestingController],
    (service: UserService, mockBackend: HttpTestingController) => {

      service.login(mockLogin).subscribe(
        response => {
          expect(response.ok).toBe(true);
          expect(response.body.id).toEqual(mockUser.id);
        }
      );

      const req = mockBackend.expectOne('api/account/login', 'call to login api');

      expect(req.request.method).toEqual('POST');

      expect(req.request.body).toEqual(mockLogin);

      req.flush(mockUser);

      mockBackend.verify();
    }));

  it('should make one request and return an Error reponse for an invalid login', inject([UserService, HttpTestingController],
    (service: UserService, mockBackend: HttpTestingController) => {

      service.login(mockLogin).subscribe(
        response => fail('if next observer is called on invalid login'),
        (err: HttpErrorResponse) => expect(err.status).toBe(400)
      );

      const req = mockBackend.expectOne('api/account/login', 'call to login api');

      expect(req.request.method).toEqual('POST');

      expect(req.request.body).toEqual(mockLogin);

      req.flush(null, mockBadRequest);

      mockBackend.verify();
    }));

  it('should make one request and return OK for a valid logout', inject([UserService, HttpTestingController],
    (service: UserService, mockBackend: HttpTestingController) => {

      service.logout().subscribe();

      const req = mockBackend.expectOne('api/account/logout', 'call to logout');

      expect(req.request.method).toEqual('GET');

      expect(req.request.body).toBeFalsy();

      req.flush(null);

      mockBackend.verify();
    }));

  it('should make one details request and return user details', inject([UserService, HttpTestingController],
    (service: UserService, mockBackend: HttpTestingController) => {

      service.getDetails().subscribe(
        response => expect(response).toEqual(mockUser)
      );

      const req = mockBackend.expectOne('api/account/details', 'call to account details api');

      expect(req.request.method).toEqual('GET');

      expect(req.request.body).toBeFalsy();

      req.flush(mockUser);
    }));

  it('should return user on getCurrentLogin() when user is logged in', inject([UserService, HttpTestingController],
    (service: UserService, mockBackend: HttpTestingController) => {
      service.login(mockLogin).subscribe();
      const req = mockBackend.expectOne('api/account/login', 'call to login api');
      req.flush(mockUser);

      expect(service.getCurrentLogin().id).toEqual(mockUser.id);
    }));

  it('should return null on getCurrentLogin() when user is logged out', inject([UserService, HttpTestingController],
    (service: UserService, mockBackend: HttpTestingController) => {
      service.logout().subscribe();
      const req = mockBackend.expectOne('api/account/logout', 'call to logout');
      req.flush(null);

      expect(service.getCurrentLogin()).toEqual(null);
    }));

  // it('should reroute application to login page when server returns 401 Unauthorized for any API call',
  //   inject([UserService, HttpTestingController, Location],
  //     fakeAsync((service: UserService, mockBackend: HttpTestingController, location: Location) => {

  //       service.getDetails().subscribe(null, err => expect(err.status).toBe(401));

  //       const requests = mockBackend.match('');
  //       requests.forEach(req => req.flush(null, mockUnauthorized));
  //       tick();
  //       expect(location.path()).toBe('/login');
  //     })));

});

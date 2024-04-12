import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';

/** API URL that will provide data for the client app */
const apiUrl = 'https://myflix-api-qeb7.onrender.com/';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to fetch movie and user data from myFlix API
 */
export class FetchApiDataService {
  /**
   * @param http - HttpClient instance
   */
  constructor(private http: HttpClient) { }

  /**
   * Handles the user registration form
   * @param userDetails - User details for registration
   * @returns Observable of any
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles the user login form
   * @param userDetails - User details for login
   * @returns Observable of any
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Gets all movies
   * @returns Observable of any
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets a single movie by title
   * @param title - Title of the movie
   * @returns Observable of any
   */
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets a director by name
   * @param directorName - Name of the director
   * @returns Observable of any
   */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets a genre by name
   * @param genreName - Name of the genre
   * @returns Observable of any
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets user data from the localStorage
   * @returns Any
   */
  public getLocalUser(): any {
    const user = localStorage.getItem('user');
    if (user && this.isJsonString(user)) {
      return JSON.parse(user);
    } else {
      console.log('Invalid user data in local storage:', user);
      return null;
    }
  }

  /**
   * Checks if a string is a valid JSON
   * @param str - String to check
   * @returns Boolean
   */
  private isJsonString(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Gets a user
   * @param userId - ID of the user
   * @returns Observable of any
   */
  public getUser(userId?: string): Observable<any> {
    if (!userId) {
      const user = this.getLocalUser();
      if (user && user._id) {
        userId = user._id;
      } else {
        console.log('User Id not provided and no user found in local storage.')
        return of(null)
      }
    }

    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + userId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      tap({
        next: data => {
          if (this.isJsonString(JSON.stringify(data))) {
          } else {
            console.log('Data is not valid JSON:', data);
          }
        },
        error: error => console.log('Error:', error)
      }),
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets favourite movies by user ID
   * @param userId - ID of the user
   * @returns Observable of any
   */
  public getFavoriteMovies(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + userId + '/FavoriteMovies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to a user's list of favorites
   * @param userId - ID of the user
   * @param movieId - ID of the movie
   * @returns Observable of any
   */
  public addFavoriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + userId + '/movies/' + movieId, movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a movie from a user's list of favorites
   * @param userId - ID of the user
   * @param movieId - ID of the movie
   * @returns Observable of any
   */
  public deleteFavoriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userId + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Edits a user's profile
   * @param userDetails - User details for editing
   * @returns Observable of any
   */
  public editUserProfile(userDetails: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user._id, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user
   * @param userId - ID of the user
   * @returns Observable of any
   */
  public deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Extracts non-typed response data from the API response
   * @param res - API response
   * @returns Any - Extracted response data
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }

  /**
   * Handles HTTP errors and logs them
   * @param error - HTTP error response
   * @returns Any - Error details
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'))
  }
}
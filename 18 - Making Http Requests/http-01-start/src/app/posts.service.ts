import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    return this.http.post<{ name: string }>(//reponse data type
      'https://ng-complete-guide-7b38d.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response'  //getting the whole response object
      }
    );
  }

  // createAndStorePost(title: string, content: string) {
  //   const postData: Post = { title, content };
  //   return this.http
  //     .post<{ name: string }>(
  //       'https://ng-complete-guide-7b38d.firebaseio.com/posts.json',
  //       postData
  //     )
  //     .subscribe(
  //       responseData => {
  //         console.log(responseData);
  //       },
  //       error => {
  //         this.error.next(error.message); //Since we are using the SUBJECT

  //        //SUBJECT is exposing the .next (like in observable internally)
  //       }
  //     );
  // }

  fetchPosts() {
    let searchParams = new HttpParams(); //immutable
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    //append method returns a new body with the appended value

    return this.http
    //get is a generic type and Post is returned here
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-7b38d.firebaseio.com/posts.json',
        {
          //http headers
          headers: new HttpHeaders({
            'Custom-Header': 'Hello'
          }),
          //query parameters
          params: searchParams,
          responseType: 'json'
        }
      )//Now to store each object into an array, we are manually indexing through
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
              //... speard param :: CHECK
            }
          }

          return postsArray;
        }),
        //error handling task that we may implement
        catchError(errorResponse => {
          // Send to analytics server
          return throwError(errorResponse);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete('https://ng-complete-guide-7b38d.firebaseio.com/posts.json', {
        observe: 'events',//
        //'body' extracts the response body and converts to JSON
        responseType: 'text'
      })
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            //...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}

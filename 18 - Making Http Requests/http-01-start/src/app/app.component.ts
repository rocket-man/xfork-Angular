import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false; //loading page while waiting for result
  error = null;
  subscription: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();

    this.subscription = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService
      .createAndStorePost(postData.title, postData.content)
      .subscribe(() => {
        this.fetchPosts();
      }); //post must have an subscription with an observable,
      //else angular thinks no one is interested in response and request is not sent
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }

  private fetchPosts() {
    this.isFetching = true;
    //We are returning the observable and NOT subscribing in the service itself
    //because if we do in service, the component will not get updated.
    //The service subscription will not work and we we have to use component subscription
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }
}

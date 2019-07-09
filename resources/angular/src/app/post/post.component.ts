import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  constructor(
    public postSercice: PostService
  ) { }

  ngOnInit() {
  }

  like() {
    this.postSercice.like(this.post.id);
  }

  apagar() {
    this.postSercice.apagar(this.post.id);
  }
}

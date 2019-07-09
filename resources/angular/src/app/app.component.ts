import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { MatDialog } from '@angular/material';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular';

  private posts: Post[];

  constructor(
    public dialog: MatDialog,
    public postSercice: PostService
  ) {}

  ngOnInit() {
    this.posts = this.postSercice.posts;
  }

  openDialog() {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postSercice.salvar(result.post, result.arquivo);
      }
    });
  }
}

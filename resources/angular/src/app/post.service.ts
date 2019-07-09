import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public posts: Post[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.http.get('/api').subscribe(
      (data: any[]) => {
        for (const p of data) {
          this.posts.push(
            new Post(
              p.nome, p.titulo, p.subtitulo, p.email,
              p.mensagem, p.arquivo, p.id, p.likes
            )
          );
        }
    });
  }

  salvar(post: Post, file: File) {
    const uploadData = new FormData();
    uploadData.append('nome', post.nome);
    uploadData.append('email', post.email);
    uploadData.append('titulo', post.titulo);
    uploadData.append('subtitulo', post.subtitulo);
    uploadData.append('mensagem', post.mensagem);
    uploadData.append('arquivo', file, file.name);

    this.http.post('/api', uploadData,
      {reportProgress: true, observe: 'events'})
      .subscribe((event: any) => {
        if (event.type === HttpEventType.Response) {
          const p: any = event.body;
          this.posts.push(
            new Post(
              p.nome, p.titulo, p.subtitulo, p.email,
              p.mensagem, p.arquivo, p.id, p.likes
            )
          );
        }

        if (event.type === HttpEventType.UploadProgress) {

        }
    });
  }

  like(id: number) {
    this.http.get(`/api/like/${id}`)
      .subscribe(
        (event: any) => {
          const post = this.posts.find(p => p.id === id);
          if (post) {
            post.likes = event.likes;
          }
        }
      );
  }

  apagar(id: number) {
    this.http.delete(`/api/${id}`)
      .subscribe(
        (event: any) => {
          const index = this.posts.findIndex(p => p.id === id);
          if (index !== -1) {
            this.posts.splice(index, 1);
          }
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Post } from '../post';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  private nomearquivo: string;

  private dados = {
    post: new Post('', '', '', '', ''),
    arquivo: null
  };

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>
  ) { }

  ngOnInit() {
  }

  changeFile(event) {
    this.nomearquivo = event.target.files[0].name;
    this.dados.arquivo = event.target.files[0];
  }

  salvar() {
    this.dialogRef.close(this.dados);
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}

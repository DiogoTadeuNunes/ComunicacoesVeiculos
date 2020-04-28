import { Helper } from './../../common/helper';
import { Post } from './../../models/post';
import { PostService } from './../../common/data-services/post.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  initialDate: string;
  posts: Post[];

  constructor(
    private postService: PostService,
    private helper: Helper,
    private router: Router,
  ) {
    this.posts = [];
  }

  ngOnInit() {
    this.initialDate = new Date(new Date().setDate(new Date().getDate() -30)).toString();
    this.getPosts();
  }

  getPosts() {
    this.postService.list(this.helper.getFormatDate(this.initialDate, 'yyyy/MM/dd')).subscribe(
      res => {
        this.posts = res;
      },
      err => {
        alert('Erro' + err);
      });
  }

  onEdit(id: number) {
    this.router.navigate(["edit/"+id]);
  }

  onDelete(id: number, projectKey: string) {
    if (confirm("Confirma a exclusão do Comunicado?")) {
      this.postService.delete(id, projectKey).subscribe(
        res => {
          this.getPosts();
          alert("Excluído com sucesso");
        },
        err => {
          alert('Erro' + err);
        });
    }
  }
}

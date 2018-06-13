import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.interface';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-find-car',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  forma: FormGroup;


  constructor( private _postsService: PostsService,
               private _router: Router) {


  }

  // Esto se ejecuta una vez que la pagina ya esta renderizada.
  ngOnInit() {

    this.obtenerTodosLosPost();

    this.forma = new FormGroup({
      'type': new FormControl("TODOS")
    });

    this.forma.valueChanges.subscribe(
      data => {
        if (data.type === "TODOS") {
          this.obtenerTodosLosPost();
          return;
        }
        this.filtrarPorTipo(data.type);
      }
    );

  }

  obtenerTodosLosPost() {
    this._postsService.obtenerPosts().subscribe(res => {
      this.posts = res.json();
     });
  }

  verPost( idx: number ) {
    this._router.navigate(['/post', idx]);
  }

  filtrarPorTipo(tipo: string) {
    this._postsService.getPostPorTipo(tipo).subscribe(res => {
      console.log(res);
      this.posts = res.json();
    });
  }
}

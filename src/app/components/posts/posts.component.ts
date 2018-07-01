import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.interface';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Marker } from '@agm/core/services/google-maps-types';

declare var $;

@Component({
  selector: 'app-find-car',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  forma: FormGroup;
  p;

  post;
  zoom: number = 15;
  // Start position
  lat: number = -34.603418;
  lng: number = -58.381592;
  // Markers
  markers: Marker[] = [];


  constructor( private _postsService: PostsService,
               private _router: Router) {


  }

  // Esto se ejecuta una vez que la pagina ya esta renderizada.
  ngOnInit() {

    this.obtenerTodosLosPost();

    this.forma = new FormGroup({
      'type': new FormControl("TODOS"),
      'view': new FormControl("LIST")
    });

    this.forma.get('type').valueChanges.subscribe(
      val => {
        if (val === "TODOS") {
          this.obtenerTodosLosPost();
          return;
        }
        this.filtrarPorTipo(val);
      }
    );

    this.forma.get('view').valueChanges.subscribe( val => {
      if (val === 'MAP') {
        $('#mapModal').modal('show');
      }
    });

    $("#mapModal").on('hidden.bs.modal', () => {
      this.forma.patchValue({
        'view': "LIST"
      });
});
  }

  obtenerTodosLosPost() {
    this._postsService.obtenerPosts().subscribe(res => {
      console.log(res.json());
      this.posts = res.json();
     });
  }

  verPost( idx: number ) {
    $('#mapModal').modal('hide');
    this._router.navigate(['/post', idx]);
  }

  filtrarPorTipo(tipo: string) {
    this._postsService.getPostPorTipo(tipo).subscribe(res => {
      this.posts = res.json();
      console.log(this.posts);
    });
  }
}

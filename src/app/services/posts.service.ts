import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { URL_SERVICIO } from '../config';

import { Post } from '../interfaces/post.interface';
import { Coord } from '../interfaces/coord.interface';

@Injectable()
export class PostsService {
    private coord1: Coord = {lat: 0, lng: 0};
    postCar;

    private posts: Post[] = [
         {
             id: 0,
             vehicleType: "AUTO",
             capacity: "2",
             location: "Bernal",
             description: "TRONCOMOVIL: Es un auto antiguo, traccion a sangre y mucha voluntad",
             phone: 1142836765 ,
             rentalDate: "05-09-2018",
             costPerDay: "80",
             photos: ["https://i1.wp.com/www.rinconabstracto.com/wp-content/uploads/2011/08/Yabba-Dabba-Doo-R%C3%A9plica-del-coche-de-Pedro-Picapiedras-a-la-venta-01.jpg?fit=634%2C375&ssl=1",
                     "http://cdn.atv.pe/files/2011/07/fred-flintstone-car-2_2.jpg?850x450",
                     "https://i1.wp.com/4.bp.blogspot.com/-Pk48QguI7dI/TkLd1sqc55I/AAAAAAAASbg/08Vm9ijvEhE/s1600/Yabba+Dabba+Doo%2521+R%25C3%25A9plica+del+coche+de+Pedro+Picapiedras+a+la+venta%2521+04.jpg?w=660"],
             coordPickUp: {lat: -34.705857, lng: -58.278498}
         },
    //     {
    //         id: 1,
    //         vehicleType:"CAMIONETA",
    //         capacity:"3",
    //         location:"Quilmes",
    //         description:"Furgoneta al más puro estilo 'Van Power Flower', tan propia de la época hippie",
    //         phone: 1158967245 ,
    //         rentalDate: "04-03-2018",
    //         costPerDay:"190",
    //         photos:["https://austinot.com/wp-content/uploads/2014/06/Mystery-Machine.jpg",
    //                 "https://s-media-cache-ak0.pinimg.com/736x/9e/5f/d3/9e5fd32a3caa683f33a6817888305bb9--commercial-van-yard-haunt.jpg",
    //                 "https://res.cloudinary.com/carsguide/image/upload/f_auto,fl_lossy,q_auto,t_blog_large/v1/editorial/mystery-machine-Jerry-Patrick-AKA-Junk.jpg"],
    //         coordPickUp: this.coord1
    //     },
    //     {
    //         id:2,
    //         vehicleType:"AUTO",
    //         capacity:"4",
    //         location:"Springfield",
    //         description:"Plymouth Junkerolla de 1986. Se trata de un vehiculo muy resistente, porque a pesar de lo que le hizo Homero en 28 años, sigue funcionando.",
    //         phone: 1128405384 ,
    //         rentalDate: "08-09-2018",
    //         costPerDay:"185",
    //         photos:["https://http2.mlstatic.com/wheels-auto-hot-D_NQ_NP_102901-MLM20424024390_092015-F.jpg",
    //                 "https://http2.mlstatic.com/carrinho-hot-wheels-homer-simpsons-rosa-raro-carro-original-D_NQ_NP_195901-MLB20434962059_092015-F.jpg"],
    //         coordPickUp: this.coord1
    //     },
    //     {
    //         id:3,
    //         vehicleType:"AUTO",
    //         capacity:"4",
    //         location:"Bernal",
    //         description:"No podemos determinar su año de fabricación... Ni en donde acabará. Hasta podria destruirse antes de haberse construido!",
    //         phone: 1142836765 ,
    //         rentalDate: "05-09-2018",
    //         costPerDay:"280",
    //         photos:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzziStJGsti3InMZcv5CFKhuFFf4F1Ru2eYaU_ds4Sg785O_6X",
    //                 "https://upload.wikimedia.org/wikipedia/commons/6/6a/Back_left.JPG",
    //                 "http://st.motortrendenespanol.com/uploads/sites/45/2016/01/delorean-dmc-12-05.jpg"],
    //         coordPickUp: {lat:-34.705857, lng:-58.278498}
    //     }
      ];

    extensionUrl: string = "desapp-grouph-backend/rest/servicesPost/";

    constructor(private http: Http) {
     }

     obtenerPosts() {
        return this.http.get(URL_SERVICIO + this.extensionUrl + "allMiniPost");
     }

     getPostPorTipo(tipo: string) {
         return this.http.get(URL_SERVICIO + this.extensionUrl + "PostByType/" + tipo);
     }

     getPosts(): Post[] {
         return this.posts;
     }

     getPost(idx: string) {
         return this.http.get( URL_SERVICIO + this.extensionUrl + "postById/" + idx);
     }

     createPost(post) {
        let url = URL_SERVICIO + this.extensionUrl + 'createPost';
        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions ( { headers: header });

           return this.http.post(url, post, options)
                        .map((res: any) => {
                                 return res.json();
                        });
    }
}


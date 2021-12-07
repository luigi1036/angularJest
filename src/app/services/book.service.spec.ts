import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import Swal from "sweetalert2";
import { environment } from "../../environments/environment.prod";
import { Book } from "../models/book.model";
import { BookService } from "./book.service";

let listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    }, {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    }, {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    }
];


describe('', () => {
    let service: BookService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BookService
            ], 
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
    });

    beforeEach(() => {
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });
    afterEach(()=>{
        jest.resetAllMocks();
        localStorage.clear();
    })

    it('creacion servicio', () => {
        expect(service).toBeTruthy();
    });
    it('Devuelve una lista de libros ', () => {
        service.getBooks().subscribe((resp: Book[]) => {
            expect(resp).toEqual(listBook);
        });

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
        expect(req.request.method).toBe('GET');
        req.flush(listBook);
    });

    it('Retorna un array vacio cuando el localStoras esta vacio', ()=>{
        const listaLibros = service.getBooksFromCart();
        expect(listaLibros.length).toBe(0);
    });

    it('Retorna un array de libros cuando exista en el localStoras', () =>{
        localStorage.setItem('listCartBook', JSON.stringify(listBook));
        const listaLibros = service.getBooksFromCart();
        expect(listaLibros.length).toBe(3);
    });

    it('Añade un libro cuando no exista en el localStore', () => {
        const libro: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15
        };
        const toastMock = {
            fire: () => null
        } as any
        const spy = jest.spyOn(Swal, 'mixin').mockImplementation(()=> {
            return toastMock;
        });

        let newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(0);
        service.addBookToCart(libro);
        newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(1);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Elimina la lista del localStoras', ()=>{
        const libro: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15
        };

        const toastMock = {
            fire: () => null
        } as any;
        const spy = jest.spyOn(Swal, 'mixin').mockImplementation(()=> {
            return toastMock;
        });
        service.addBookToCart(libro);
        let newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(1);
        service.removeBooksFromCart();
        newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(0);
        expect(spy).toHaveBeenCalledTimes(1);

        
    });

} )
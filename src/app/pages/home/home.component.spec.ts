import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Book } from "src/app/models/book.model";
import { BookService } from "../../services/book.service";
import { HomeComponent } from "./home.component"

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

const bookServices = {
    getBooks: () => of(listBook)
};

@Pipe({name: 'reduceText'})
class ReducePipeMock implements PipeTransform {
    transform() : string {
        return '';
    }
}

describe('Home Component', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                HomeComponent,
                ReducePipeMock
            ],
            providers: [
               // BookService

               {
                   provide: BookService,
                   useValue: bookServices
               }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Creacion componente', () => {
        expect(component).toBeTruthy();
    });

    it('getBook get book from the suscription', () => {
        const bookService = fixture.debugElement.injector.get(BookService);
        component.getBooks();
        expect(component.listBook.length).not.toBe(0)
    })
} )
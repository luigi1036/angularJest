import { ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { By } from "@angular/platform-browser";

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

describe('Cart Component', () => {

    let component: CartComponent; 
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                CartComponent
            ],
            providers: [
                BookService,
                CartComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
            ]
        }).compileComponents()
    });

    beforeEach(() => {
       fixture = TestBed.createComponent(CartComponent);
       component = fixture.componentInstance;
       service = fixture.debugElement.injector.get(BookService);
       jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => listBook);
       fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
        jest.resetAllMocks();
    })

    // it('Should Create', () =>{
    //     expect(component).toBeTruthy();
    // });

    it('Should Create', inject([CartComponent], (component2: CartComponent)=>{
        expect(component2).toBeTruthy();
    }));

    it('getTotalPrice', () => {
        const totalPrice = component.getTotalPrice(listBook);
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBe(0);
        expect(totalPrice).not.toBeNull();

    });

    it('onInputNumberChange increment', () => {
        const action = 'plus';
        const libro: Book = listBook[0];
        const spy = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => null);
        const spy1 = jest.spyOn(component, 'getTotalPrice').mockImplementation(() => null);
        expect(libro.amount).toBe(2);
        component.onInputNumberChange(action, libro);
        expect(libro.amount).toBe(3);
        expect(spy).toHaveBeenCalled();
        expect(spy1).toHaveBeenCalled();

    });

    it('onInputNumberChange decrement', () => {
        const action = 'minus';
        const libro: Book = listBook[0];
        const spy = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => null);
        const spy1 = jest.spyOn(component, 'getTotalPrice').mockImplementation(() => null);
        expect(libro.amount).toBe(3);

        component.onInputNumberChange(action, libro);
        expect(libro.amount).toBe(2);
        expect(spy).toHaveBeenCalled();
        expect(spy1).toHaveBeenCalled();

    });

    it('clearCartBook', () => {
        component.listCartBook = listBook;
        const spy = jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null);
        const spy1 = jest.spyOn(component as any, '_clearListCartBook'); //spiar un componente privado
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy1).toHaveBeenCalledTimes(1);
    });
    
    it('_clearListCartBook', () => {
        component.listCartBook = listBook;
        const spy = jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null);
        component["_clearListCartBook"]();
        expect(component.listCartBook.length).toBe(0);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('El titulo "El carro est vacio " no debe mostrarse', ()=>{
        component.listCartBook = listBook;
        fixture.detectChanges();
        const el: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        expect(el).toBeFalsy();
    });

    it('El titulo "El carro est vacio "  debe mostrarse', ()=>{
        component.listCartBook =[];
        fixture.detectChanges();
        const el: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        expect(el).toBeTruthy();
        if(el){
            const elemeto: HTMLElement = el.nativeElement;
            expect(elemeto.innerHTML).toContain('The cart is empty');
        }
    });
});
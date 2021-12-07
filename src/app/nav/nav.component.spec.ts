import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component"
import { RouterTestingModule} from '@angular/router/testing';
import { Router } from "@angular/router";

//class ComponentTestRoute {}

const routerMock = {
    navigate: () => {}
}

describe('Componente Nav', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;


    beforeEach(() =>{
        TestBed.configureTestingModule({
            imports: [
                // RouterTestingModule.withRoutes([
                //     {
                //         path: 'home',
                //         component: ComponentTestRoute
                //     },
                //     {
                //         path: 'cart',
                //         component: ComponentTestRoute
                //     }
                // ])
            ],
            declarations: [
                NavComponent
            ],
            providers: [
                {
                    provide: Router, useValue: routerMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Componente creado', () =>{
        expect(component).toBeTruthy();
    });

    // it('Deberia navegar',() =>{
    //     const route = TestBed.inject(Router);
    //     const spy = jest.spyOn(route, 'navigate');
    //     component.navTo('cart');
    //     expect(spy).toHaveBeenCalledWith(['/cart']);
    // });

    it('Deberia navegar',() =>{
        const route = TestBed.inject(Router);
        const spy = jest.spyOn(route, 'navigate');
        component.navTo('');
        expect(spy).toHaveBeenCalled();
    });
})
'use strict';

export interface AddProduct {
    name: string;
    price: number;
}

export interface EditProduct {
    name: string;
    price: number;
    id: number;
}

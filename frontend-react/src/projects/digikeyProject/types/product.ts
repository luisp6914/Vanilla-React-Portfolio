export interface Product{
    Description: {
        ProductDescription: string;
        DetailedDescription: string;
    }

    Manufacturer: {
        Id: number;
        Name: string;
    }
    UnitPrice: number;
    ProductUrl: string;
    PhotoUrl: string;
    QuantityAvailable: number;

}
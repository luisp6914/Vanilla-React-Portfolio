export interface Category{
    CategoryId: number;
    Name: string;
    ProductCount: number;
    ParentId?: number;
    Children: Category[];
} 
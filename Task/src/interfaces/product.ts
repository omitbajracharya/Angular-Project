export interface Product {
    id :number;
    title : string;
    price : number;
    description : string;
    category : string;
    rating : Record<string,number>;
    image : string;
}

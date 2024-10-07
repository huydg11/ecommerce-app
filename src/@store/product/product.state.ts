import { Product } from "../../model/product.model";

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: string;
}
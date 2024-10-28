import axios from "axios";
import { Product } from "../model/product.model";
import { getAllProducts } from "./product.service";


jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("productService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should get all products", async () => {
        const mockData: Product[] = [
            {
                id: 1,
                title: "Product 1",
                price: '100',
                description: "Description 1",
                image: "image1.jpg",
            },
            {
                id: 2,
                title: "Product 2",
                price: '200',
                description: "Description 2",
                image: "image2.jpg",
            },
        ];

        mockedAxios.get.mockResolvedValue({ data: mockData });

        const products = await getAllProducts();

        expect(products).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith("/products");
    });
});

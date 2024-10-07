import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../env/env.fakeapi";

// GET
export const getAllProducts = createAsyncThunk(BASE_URL, async (_, {}) => {
    try {
        const response = await axios.get("/products");
        return response.data;
    } catch (error) {
        return error;
    }
});


export const getProductById = createAsyncThunk(
    BASE_URL,
    async (id: number, {}) => {
        try {
            const response = await axios.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

export const getProductsWithLimitResults = createAsyncThunk(
    BASE_URL,
    async (limit: number, {}) => {
        try {
            const response = await axios.get(`/products?limit=${limit}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

export const getProductsWithSort = createAsyncThunk(
    BASE_URL,
    async (sort: string, {}) => {
        try {
            const response = await axios.get(`/products?sort=${sort}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

export const getAllCategories = createAsyncThunk(BASE_URL, async (_, {}) => {
    try {
        const response = await axios.get("/products/categories");
        return response.data;
    } catch (error) {
        return error;
    }
});

export const getProductsWithCategory = createAsyncThunk(
    BASE_URL,
    async (category: string, {}) => {
        try {
            const response = await axios.get(`/products/category/${category}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

// POST
export const createProduct = createAsyncThunk(
    BASE_URL,
    async (product: any, {}) => {
        try {
            const response = await axios.post("/products", product);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

// PUT
export const updateProduct = createAsyncThunk(
    BASE_URL,
    async (product: any, {}) => {
        try {
            const response = await axios.put(`/products/${product.id}`, product);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

// DELETE
export const deleteProduct = createAsyncThunk(
    BASE_URL,
    async (id: number, {}) => {
        try {
            const response = await axios.delete(`/products/${id}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);


const BASE_URL = "https://backend-final-sk47.onrender.com"; // URL de tu backend en Render
import axios from "axios";
import type { CreateProductTestDto } from "../types/productTest";

// ---------------------------
// MAKEUP API
// ---------------------------

// Crear producto de maquillaje
export async function createMakeup(data: unknown) {
  const res = await fetch(`${BASE_URL}/makeup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Error al crear el producto");
  }
  return await res.json();
}

// Obtener todos los productos de maquillaje
export async function getMakeups() {
  const res = await fetch(`${BASE_URL}/makeup`);
  if (!res.ok) {
    throw new Error("Error al obtener los productos");
  }
  return await res.json();
}

// Eliminar un producto de maquillaje
export async function deleteMakeup(id: string) {
  const res = await fetch(`${BASE_URL}/makeup/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error al eliminar el producto");
  }
}

// ---------------------------
// PRODUCT TEST API
// ---------------------------

// Crear test de producto
export const createProductTest = async (data: CreateProductTestDto) => {
  const token = localStorage.getItem('token'); // O el método que uses para guardar el JWT

  const response = await axios.post('http://localhost:3000/product-tests', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Obtener todos los tests de producto
export async function getProductTests() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/product-tests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Error al obtener los tests de producto");
  }
  return await res.json();
}

// Eliminar un test de producto
export async function deleteProductTest(id: string) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/product-tests/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Error al eliminar el test de producto");
  }
}
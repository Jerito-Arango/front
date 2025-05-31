export interface CreateProductTestDto {
  tester_id: string;
  product_id: string;
  reaction: string;
  rating: number;
  survival_status: number;
}

export interface ProductTest extends CreateProductTestDto {
  id: string;
}
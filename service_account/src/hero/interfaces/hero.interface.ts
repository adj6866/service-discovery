// Interface untuk request gRPC
export interface HeroRequest {
  id: string; // ID dari hero yang ingin diambil
}

// Interface untuk response gRPC
export interface HeroResponse {
  name: string; // Nama dari hero yang dikembalikan
}

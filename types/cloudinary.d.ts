export interface CloudinaryUploadResult {
  url: string
  public_id: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  bytes: number
}

export interface UploadedImage {
  url: string
  public_id: string
  width: number
  height: number
}
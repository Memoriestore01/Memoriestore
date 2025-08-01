import { v2 as cloudinary } from 'cloudinary'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Test function to verify Cloudinary credentials
export const testCloudinaryConnection = async () => {
  try {
    // Try to get account info to test credentials
    const result = await cloudinary.api.ping()
    console.log('Cloudinary connection test:', result)
    return true
  } catch (error) {
    console.error('Cloudinary connection test failed:', error)
    return false
  }
}

// Fallback: Local file upload system
export const uploadToLocal = async (files: any[]) => {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products')
    
    // Create upload directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true })
    
    const uploadPromises = files.map(async (file, index) => {
      const timestamp = Date.now()
      const fileName = `${timestamp}_${index}_${file.originalname}`
      const filePath = path.join(uploadDir, fileName)
      
      // Write file to local storage
      await writeFile(filePath, file.buffer)
      
      return {
        url: `/uploads/products/${fileName}`,
        public_id: fileName,
        width: 800,
        height: 800
      }
    })
    
    const results = await Promise.all(uploadPromises)
    return results
  } catch (error) {
    console.error('Error uploading to local storage:', error)
    throw new Error('Failed to upload images locally')
  }
}

// Helper function to upload multiple images
export const uploadMultipleImages = async (files: any[]) => {
  try {
    // Test connection first
    const isConnected = await testCloudinaryConnection()
    
    if (!isConnected) {
      console.log('Cloudinary connection failed, using local upload as fallback')
      return await uploadToLocal(files)
    }

    const uploadPromises = files.map(async (file) => {
      try {
        // Convert buffer to base64
        const base64Image = Buffer.from(file.buffer).toString('base64')
        const dataURI = `data:${file.mimetype};base64,${base64Image}`
        
        // Use direct upload method with minimal options
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'memoriestore/products'
        })
        
        return {
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height
        }
      } catch (fileError) {
        console.error('Error uploading individual file to Cloudinary:', fileError)
        // Fallback to local upload for this file
        const localResult = await uploadToLocal([file])
        return localResult[0]
      }
    })

    const results = await Promise.all(uploadPromises)
    return results
  } catch (error) {
    console.error('Error uploading images to Cloudinary:', error)
    // Fallback to local upload
    console.log('Falling back to local upload')
    return await uploadToLocal(files)
  }
}

// Helper function to delete images
export const deleteImages = async (publicIds: string[]) => {
  try {
    const deletePromises = publicIds.map(publicId => 
      cloudinary.uploader.destroy(publicId)
    )
    await Promise.all(deletePromises)
  } catch (error) {
    console.error('Error deleting images from Cloudinary:', error)
    throw new Error('Failed to delete images')
  }
}
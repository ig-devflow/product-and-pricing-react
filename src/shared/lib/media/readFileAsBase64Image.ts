export interface Base64ImageFile {
  base64: string
  contentType: string
  fileName: string
}

export function readFileAsBase64Image(file: File): Promise<Base64ImageFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      const base64 = result.includes(',') ? (result.split(',')[1] ?? '') : result

      resolve({
        base64,
        contentType: file.type || 'image/png',
        fileName: file.name,
      })
    }

    reader.onerror = () => {
      reject(reader.error ?? new Error('Failed to read image file'))
    }

    reader.readAsDataURL(file)
  })
}

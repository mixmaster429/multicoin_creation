import moment from 'moment';
const fs = require('fs');

const products = () => {
  const date = moment().format('YYYY/MM/DD')
  const dir = `./uploads/products/photos/${date}`;
  mkdir(dir)
  return dir
}

const orders = () => {
  const date = moment().format('YYYY/MM/DD')
  const dir = `./uploads/orders/photos/${date}`;
  mkdir(dir)
  return dir
}

const avatars = () => {
  const date = moment().format('YYYY/MM/DD')
  const dir = `./uploads/users/avatars/${date}`;
  mkdir(dir)
  return dir
}

const mkdir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

const fileName = (originalName) => {
  const ext = originalName.substring(originalName.lastIndexOf('.'), originalName.length);
  return Date.now() + ext
}

const deletePhotos = (photos) => {
  photos.forEach(photoPath => {
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath)
    }
  })
}
const clonePhotos = (photos) => {
  const newPaths = []
  photos.forEach(photoPath => {
    const path = photoPath
    if (fs.existsSync(path)) {
      const originalName = path.substring(path.lastIndexOf('/'), path.length);
      const newFileName = fileName(originalName)
      const newPath = path.split(originalName)[0]
      fs.copyFileSync(path, `${newPath}/${newFileName}`)
      newPaths.push(`${photoPath.split(originalName)[0]}/${newFileName}`)
    }
  })
  return newPaths
}

const getFullPhotoPaths = (photos) => {
  return photos ? photos.map(p => `${process.env.SITE_URL}/${p.replace(/\\/g, "/")}`) : []
}

const getAvatarPath = (avatar) => {
  return avatar ? (avatar.includes('http') ? avatar : `${process.env.SITE_URL}/${avatar.replace(/\\/g, "/")}`) : null
}
export default {
  products,
  orders,
  fileName,
  deletePhotos,
  clonePhotos,
  getFullPhotoPaths,
  avatars,
  getAvatarPath,
}
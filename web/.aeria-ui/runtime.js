import { createInstance } from './instance.js'
import { getStorage } from './storage.js'
import { uploader } from './upload.js'
export const instanceConfig = {"publicUrl":{"development":"http://localhost:3000/api","production":"https://yourdomainhere.local/api"},"storage":{"strategy":"localStorage","namespace":"aeria"},"mirrorPaths":[".aeria","../web/.aeria-ui"]}
export const url = 'https://yourdomainhere.local/api'
export const aeria = createInstance(instanceConfig)
export const storage = getStorage(instanceConfig)
export const upload = uploader(instanceConfig)
export default aeria


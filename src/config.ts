import path from "path"
// define address / path of root folder
const ROOT_DIRECTORY = `${path.join(__dirname,`../`)}`

// __ dirname :mendapatkan posisi dari folder pada file ini (config.ts). ->pada folder "src" "../  "-> mundur saat folder ke belakang

export {ROOT_DIRECTORY}
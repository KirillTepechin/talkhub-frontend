import axios from 'axios'

class FileService{
    //GET
    getFiles(path){
        const FILE_API_BASE_URL='http://localhost:9000/get-files'

        let URL = FILE_API_BASE_URL+"?path="+path
        return axios.get(URL)
    }

    getFile(path){
        const FILE_API_BASE_URL='http://localhost:9000/get-file'


        let URL = FILE_API_BASE_URL+"?path="+path
        return axios.get(URL)
    }
}
export default new FileService()
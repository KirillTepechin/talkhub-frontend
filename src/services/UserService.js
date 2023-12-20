import axios from 'axios'

const USER_API_BASE_URL='http://localhost:9000/'
class UserService{
    //PUT
    editPhoto(file){
        let URL = USER_API_BASE_URL+'edit-photo'
        return axios.putForm(URL, {file: file})
    }
    editCredentials(credentials){
        let URL = USER_API_BASE_URL+'edit-credentials'
        return axios.put(URL, credentials)
    }
    
    //POST
    login(user){
        let URL = USER_API_BASE_URL+'auth'
        return axios.post(URL, user)
    }
    register(user){
        let URL = USER_API_BASE_URL+'register'
        return axios.post(URL, user)
    }

    //GET
    me(){
        let URL = USER_API_BASE_URL+'me'
        return axios.get(URL)

        
    }    
    
    exist(login){
        let URL = USER_API_BASE_URL+'exist?login='+login
        return axios.get(URL)
    }
    
}
export default new UserService()
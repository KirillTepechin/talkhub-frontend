import axios from 'axios'

const USER_API_BASE_URL='http://localhost:9000/comment'
class TopicService{
    //GET
    findTopic(id){
        let URL = USER_API_BASE_URL+"/"+id
        return axios.get(URL)
    }
    //POST
    createComment(comment){
        let URL = USER_API_BASE_URL
        return axios.post(URL, comment)
    }

    //DELETE
    deleteComment(id){
        let URL = USER_API_BASE_URL+"/"+id
        return axios.delete(URL)
    }

    //PUT
    editTopic(topic){
        let URL = USER_API_BASE_URL+"/"+topic.id
        return axios.put(URL, topic)
    }
    
}
export default new TopicService()
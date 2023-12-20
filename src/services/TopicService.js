import axios from 'axios'

const USER_API_BASE_URL='http://localhost:9000/topic'
class TopicService{
    //GET
    findTopic(id){
        let URL = USER_API_BASE_URL+"/"+id
        return axios.get(URL)
    }

    findAllByNew(categories, allCategoriesIn){
        let params = ''
        categories.forEach(element => {
            params+="categories="+element+"&"
        });
        params+="allCategoriesIn="+allCategoriesIn

        let URL = USER_API_BASE_URL+"/by/date?"+params
        return axios.get(URL)

    }

    findAllByPopular(categories, allCategoriesIn){
        let params = ''
        categories.forEach(element => {
            params+="categories="+element+"&"
        });
        params+="allCategoriesIn="+allCategoriesIn
        
        let URL = USER_API_BASE_URL+"/by/comments?"+params
        return axios.get(URL)

    }

    findAllByQuery(query){
        let URL = USER_API_BASE_URL+"/search?query="+query
        return axios.get(URL)

    }
    //POST
    createTopic(topic){
        let URL = USER_API_BASE_URL
        return axios.post(URL, topic)
    }

    //DELETE
    deleteTopic(id){
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
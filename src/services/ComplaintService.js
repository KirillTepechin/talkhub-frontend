import axios from 'axios'

const USER_API_BASE_URL='http://localhost:9000/complaint'
class ComplaintService{
    //GET
    getComplaints(){
        let URL = USER_API_BASE_URL
        return axios.get(URL)
    }
    //POST
    createComplaint(complaint){
        let URL = USER_API_BASE_URL
        return axios.post(URL, complaint)
    }

    //DELETE
    dismissComplaint(complaint){
        let URL = USER_API_BASE_URL+"/dismiss"
        console.log(complaint)
        return axios.delete(URL, { data: complaint })
    }

    approveComplaint(complaint){
        let URL = USER_API_BASE_URL+"/approve"
        return axios.delete(URL, { data: complaint })
    }
    
}
export default new ComplaintService()
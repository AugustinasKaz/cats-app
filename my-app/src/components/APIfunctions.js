import axios from 'axios'

export async function PostComment(name, comment) {
    const promise = await axios.post("http://127.0.0.1:5000/api/post_comment", { user: name, comment: comment });
    const status = promise.status
    if(status === 200){
        let res = promise.data;
        return res;
    }
    else{
        return "connection failed";
    }
}

export async function GetComments() {
    const promise = await axios.get("http://127.0.0.1:5000/api/getComments");
    const status = promise.status
    if(status === 200){
        let res = promise.data;
        return res;
    }
    else{
        return "connection failed";
    }
}
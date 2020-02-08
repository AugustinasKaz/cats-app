import axios from 'axios'

export async function PostComment(name, comment) {
    const promise = await axios.post("/api/post_comment", { user: name, comment: comment });
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
    const promise = await axios.get("/api/getComments");
    const status = promise.status
    if(status === 200){
        let res = promise.data;
        return res;
    }
    else{
        return "connection failed";
    }
}

export async function GetCatsPictures() {
    const promise = await axios.get("/api/getCatsPics");
    const status = promise.status
    if(status === 200){
        let res = promise.data;
        return res;
    }
    else{
        return "connection failed";
    }
}

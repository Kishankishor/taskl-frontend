import axios from 'axios'

const base_url = "https://task-backend-ec46.onrender.com"

const addUser = async(fn , ln, em , ph, add1, add2 , con, st) =>{
   await  axios.post(`${base_url}/user/save`, {
        FirstName: fn,
        LastName : ln , 
        Email : em,
        Mobile : ph,
        Adress1 : add1,
        Adress2 : add2,
        country : con,
        State : st


    }).then((data)=>{
        console.log("updated")
    })

}
const getall = async (setData) =>{
   await axios.get(`${base_url}/user/all`).then((data)=>{
        
        setData(data.data)
    }).catch((err)=>{
        console.log(err)
    })
}

const update = async (id,fn,ln,em,ph,add1,add2,con,st)=>{
    await axios.put(`${base_url}/user/update/${id}` ,{
    FirstName: fn,
        LastName : ln , 
        Email : em,
        Mobile : ph,
        Adress1 : add1,
        Adress2 : add2,
        country : con,
        State : st
} ).then((data)=>{
        console.log(data)
    })
}
const drop = async (id)=>{
    await axios.delete(`${base_url}/user/delete/${id}`).then((data)=>{
        console.log(data)
    })
}






export { getall, addUser ,update,drop};
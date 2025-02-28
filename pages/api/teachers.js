import data from "@/data.json";

export default function handler(req,res){
    if(req.method === "GET"){
        return res.status(200).json(data.teachers);
    }
    else if(req.method === "POST"){
        const {id , name , subject , email} = req.body ;

        const newTeacher = {
            id,name,subject,email,
        }

        data.teachers.push(newTeacher) ;

        req.status(201).json(data.teachers);
    }
    else {
        res.status(400).json({message : "Invalid method"}) 
    }
}


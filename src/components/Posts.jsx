import { useEffect, useState } from "react";
import { getPost, deletePost } from "../api/PostApi";
import Form from "./Form";
import './Posts.css';

const Posts = () => {

    const [data, setData] = useState([])
    const [updateData, setUpdateData] = useState({})


    // View 

    const getPostData = async () => {
        const res = await getPost()
        console.log(res.data)
        setData(res.data)
    }

    useEffect(() => {
        getPostData()

    }, []);

    // Update

    const handleUpdatePost = (curr) => {
        setUpdateData(curr)
    }

    // delete 

    const handleDeletePost = async (id) => {
        
        const res = await deletePost(id)
        console.log(res)
        try {
            if (res.status === 200) {
                const newUpdated = data.filter((currPost) => {
                    return currPost.id !== id
                })
                setData(newUpdated)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <section>
            <Form data={data} setData={setData} updateData={updateData} setUpdateData={setUpdateData} />

            <ul>
                {
                    data.map((curr, index) => {

                        const { id, body, title } = curr
                        return (
                            <li key={id}>
                                <p><b>Title:</b>{title}</p>
                                <p><b>Body:</b>{body}</p>
                                <button onClick={() => handleUpdatePost(curr)}>Edit</button>
                                <button onClick={() => handleDeletePost(id)}>Delete</button>
                            </li>
                        )

                    }

                    )
                }
            </ul>
        </section>
    )
}

export default Posts
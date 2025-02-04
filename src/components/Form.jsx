import React, { useEffect, useState } from 'react'
import { postData, changeData } from '../api/PostApi'
import './Form.css';


const Form = ({ data, setData, updateData, setUpdateData }) => {

    const [addData, setAddData] = useState({
        title: "",
        body: ''
    })


    // Update 

    let empty = Object.keys(updateData).length === 0;
    useEffect(() => {
        updateData && setAddData({
            title: updateData.title || '',
            body: updateData.body || ''
        })
    }, [updateData])

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value;

        setAddData((prev) => {
            return {
                ...prev, [name]: value
            }

        })

    }

    // Add 

    const handlePostData = async () => {
        const res = await postData(addData)
        console.log(res)
        if (res.status == 201) {
            setData([...data, res.data])
            setAddData({ title: '', body: '' })
        }
    }

    const updatePostData = async () => {

        try {
            const res = await changeData(updateData.id, addData)
            console.log(res)

            if (res.status === 200) {
                setData((prev) => {
                    console.log("previoue Data:", prev)
                    return prev.map((curr) => {
                        return curr.id === updateData.id ? res.data : curr
                        // return curr.id === res.data.id ? res.data : curr
                    })

                })
            }
            setAddData({ title: '', body: '' })
            setUpdateData({})


        } catch (error) {
            console.log(error)
        }

    }


    const handleFormSubmit = (e) => {
        e.preventDefault()
        const action = e.nativeEvent.submitter.value;
        console.log(action)

        if (action === 'Add') {
            handlePostData()
        } else if (action === 'Update') {
            updatePostData()
        }

    }
    return (
        <div>


            <form action="" onSubmit={handleFormSubmit}>

                <input type="text" placeholder="Enter Title" name='title'
                    value={addData.title} onChange={handleInputChange} />

                <input type="text" placeholder="Enter Post" name='body'
                    value={addData.body} onChange={handleInputChange} />

                { }
                <button type='submit' value={empty ? 'Add' : 'Update'}>
                    {empty ? 'Add' : 'Update'}

                </button>
            </form>

        </div>
    )
}

export default Form
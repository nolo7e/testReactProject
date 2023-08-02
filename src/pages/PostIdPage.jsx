import React, { useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetch";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [fetchPostById, isLoading, error ] = useFetching(async (id) => {
        console.log(id);
        const response = await PostService.getById(id);
        setPost(response.data);
    });
    useEffect(() => {
        fetchPostById(params.id);
    }, []);
    return(
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isLoading 
            ?   <Loader/> 
            : <div>{post.id}. {post.title}</div>
            }
            
        </div>
    );
}

export default PostIdPage;
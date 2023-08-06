import React, { useEffect, useMemo, useRef, useState } from "react";
import Counter from "../components/Counter";
import '../styles/App.css';
import PostItem from "../components/PostItem";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import PostForm from "../components/PostForm";
import MySelect from "../components/UI/select/MySelect";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetch";
import { getPageCount, getPagesArray } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();


  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts,...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, ()=>{
    setPage(page + 1);
  });

  const changePage = (page) => {
    setPage(page);
   }

  useEffect(()=>{
    fetchPosts();
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts,newPost]);
    setModal(false);
  }


  const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id));
  }

   

  return (
    <div className="App">
      <MyButton style={{marginTop:30}} onClick = {() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm 
          create={createPost}
        />
      </MyModal>
      <hr style={{margin:"15px 0"}}/>
      <PostFilter 
          filter={filter} 
          setFilter={setFilter} 
      />
      <MySelect 
      value={limit}
      onChange={value => setLimit(value)}
      defaultValue="Кол-во элементов на странице"
      options={[
        {value:5,name:'5'},
        {value:10,name:'10'},
        {value:25,name:'25'},
        {value:-1,name:'Показать все'},

      ]}
      />
      { postError &&
          <h1>Произошла ошибка! {postError}</h1>
      }
      {isPostsLoading &&
        <div style={{display:'flex', justifyContent:'center ', marginTop:50}}><Loader/></div>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов про JavaScript"/>
      <div ref={lastElement} style={{height:20, background:'red'}}></div>
      <Pagination 
        page={page} 
        changePage={changePage} 
        totalPages={totalPages}
        />

    </div>
  );
}

export default Posts;

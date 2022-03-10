import { useEffect } from 'react';
import { jsonPH } from '~src/api/axios';
import { useAxiosFunction } from '~src/hooks';

interface IPost {
  id: string;
  title: string;
  body: string;
}

interface IPosts {
  length: number;
  data: {
    userId: string;
    title: string;
    body: string;
  };
}

const Posts = () => {
  const [posts, error, loading, axiosFetch] = useAxiosFunction<IPosts>();

  const getData = () => {
    axiosFetch({
      axiosInstance: jsonPH,
      method: 'get',
      url: '/posts',
    });
  };

  const handleSubmit = () => {
    axiosFetch({
      axiosInstance: jsonPH,
      method: 'post',
      url: '/posts',
      requestConfig: {
        data: {
          userId: 10,
          title: 'Axios Stuff',
          body: 'Axios hook stuff',
        },
      },
    });
  };

  console.log('POSTS', posts);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article>
      <h2>Posts</h2>

      <div className="row">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={getData}>Refetch</button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && error && <p className="errMsg">{error}</p>}

      {!loading && !error && posts?.length && (
        <ul>
          {(posts as unknown as IPost[]).map((post) => (
            <li key={post.id}>{`${post.id}. ${post.title}`}</li>
          ))}
        </ul>
      )}

      {!loading && !error && !posts?.length && posts?.data && (
        <p>{`userId: ${posts.data?.userId}, title: ${posts.data?.title}, body: ${posts.data?.body}`}</p>
      )}

      {!loading && !error && !posts && <p>No posts to display</p>}
    </article>
  );
};

export { Posts };

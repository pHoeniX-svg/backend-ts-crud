import { jokesAxios } from '~src/api/axios';
import { useAxios } from '~src/hooks';

interface IJoke {
  joke: {
    joke: string;
  };
}

const Jokes = () => {
  const [joke, error, loading, refetch] = useAxios<IJoke>({
    axiosInstance: jokesAxios,
    method: 'GET',
    url: '/',
    requestConfig: {
      headers: {
        'Content-Language': 'en-US',
      },
    },
  });

  return (
    <article>
      <h2>Random Dad Joke</h2>

      {loading && <p>Loading...</p>}
      {!loading && error && <p className="errMsg">{error}</p>}
      {!loading && !error && joke && <p>{joke?.joke}</p>}
      {!loading && !error && !joke && <p>No dad joke to display.</p>}

      <button onClick={() => refetch()}>Get Joke</button>
    </article>
  );
};

export { Jokes };

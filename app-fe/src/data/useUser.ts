import useSWR from "swr";

const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: { Authorization: "Basic " + token },
    mode: "no-cors",
  }).then((res) => res.json());

export default function useUser(token: string) {
  console.log("fetching");
  const { data, mutate, error } = useSWR(
    ["http://localhost:3000/users/user", token],
    fetcher,
    { refreshInterval: 0 }
  );

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}

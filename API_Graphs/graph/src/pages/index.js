export async function getStaticProps() {
  const dat= await fetch('http://localhost:3000/api/data')
  const filteredData= await dat.json()
  return {
    props: {
      data: filteredData,
    },
  };
}

export default function Home({ data }) {
  return (
    <>
      <h1>Hello</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
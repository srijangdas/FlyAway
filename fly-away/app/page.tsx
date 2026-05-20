import { createClient } from "@/lib/supabase/client";

export default async function Home() {

  const supabase = await createClient()

  const {data, error} = await supabase
    .from('flights')
    .select('*')
  return (
    <>
      <h1>Supabase Connected</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {error && <p>{error.message}</p>}
    </>
  );
}

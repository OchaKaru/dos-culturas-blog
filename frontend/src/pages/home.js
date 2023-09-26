import * as React from "react";
import Header from '../components/navigation/header';

const HomePage = () => {
  return (
    <main>
      <Header />
    </main>
  );
}

export default HomePage;

export const Head = () => <title>Home Page</title>;

/*
<div>
    <Image>
        <Filter />
    </Image>
    <div>
        <Title />
        <Subtitle />
        <Button />
    </div>
</div>
*/
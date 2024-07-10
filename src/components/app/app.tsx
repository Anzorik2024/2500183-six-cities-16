import Main from '../../pages/main';

type AppProps = {
  offersCount: number;
}

function App({offersCount}: AppProps): JSX.Element {
  return (
    <Main offersCount={offersCount} />
  );
}

export default App;

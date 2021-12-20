import React, { useState, useEffect, useContext } from 'react';
import Item from './Components/Item';
import Crypto from './Components/Crypto';
import Weather from './Components/Weather';
import Location from './Components/Unsplash';
import CurrentDate from './Components/MyDate';
import Info from './Components/Info';
import Background from './Components/UnsplashBackground';
import { Context } from './Components/Context';
import { useWindowDimensions } from './Hooks/useWindowDimensions';

function App() {
  const [itemList, setItemList] = useState([
    { id: 'crypto', el: <Crypto /> },
    { id: 'weather', el: <Weather /> },
    { id: 'date', el: <CurrentDate /> },
    { id: 'location', el: <Location /> },
    { id: 'info', el: <Info /> },
  ]);

  const {
    state: unsplash,
    theme,
    awkwardLoading,
    infoStatus,
  } = useContext(Context);

  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setItemList(state => {
        let result = [];
        items.forEach(a => result.push(state.find(b => b.id === a)));
        return result;
      });
    }
  }, []);

  return (
    <div
      id='main'
      style={mainStyle(theme, awkwardLoading, unsplash, windowDimensions)}
    >
      {itemList.map((el, i) => {
        const pos = getPosition(i);
        return (
          <Item
            el={el.el}
            id={el.id}
            key={el.id}
            responsiveIndex={itemList
              .filter(a => a.id !== 'location' && a.id !== 'info' && a.id)
              .map(a => a.id)
              .findIndex(a => a === el.id)}
            setList={setItemList}
            x={pos.x}
            y={pos.y}
            infoExpanded={infoStatus === 'expanded'}
            windowDimensions={windowDimensions}
            children={el.el}
          />
        );
      })}
      <Background />
    </div>
  );
}

const mainStyle = (theme, awkwardLoading, unsplash, window) =>
  Object.assign(
    {
      background: awkwardLoading ? '#fff' : unsplash.error && '#fafafa',
      color: theme.color,
      textShadow: theme.textShadow,
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr',
    },
    window.width < 700 && {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    window.height < 720 && {
      display: 'flex',
      flexDirection: 'row',
    }
  );

const getPosition = i => {
  switch (i) {
    case 0:
      return { x: 'left', y: 'top' };
    case 1:
      return { x: 'right', y: 'top' };
    case 2:
      return { x: 'center', y: 'center' };
    case 3:
      return { x: 'left', y: 'bottom' };
    case 4:
      return { x: 'right', y: 'bottom' };
    default:
      return { x: 'initial', y: 'initial' };
  }
};

export default App;

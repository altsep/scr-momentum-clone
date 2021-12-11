export const Details = ({
  state,
  hovered,
  x,
  currencyName,
  windowSmall,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr',
        gap: 20,
      }}
    >
      <div
        className={`crypto details ${x}`}
        style={{
          gridColumn: x === 'right' ? '2 / 3' : '1 / 2',
          gridRow: '1 / 2',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p>
          {state.data.market_data.current_price.usd
            ? state.data.market_data.current_price.usd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: currencyName === 'bitcoin' ? 0 : 8,
              })
            : ''}
        </p>
        <p>
          {state.data.market_data.high_24h.usd
            ? state.data.market_data.high_24h.usd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: currencyName === 'bitcoin' ? 0 : 8,
              })
            : ''}
        </p>
        <p>
          {state.data.market_data.low_24h.usd
            ? state.data.market_data.low_24h.usd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: currencyName === 'bitcoin' ? 0 : 8,
              })
            : ''}
        </p>
      </div>
      <div
        className={`crypto details ${x}`}
        style={{
          gridColumn: x === 'right' ? '1 / 2' : '2 / 3',
          gridRow: '1 / 2',
          display: 'flex',
          flexDirection: 'column',
          opacity: hovered.details || windowSmall ? 0.8 : 0,
        }}
      >
        <p>Current</p>
        <p>High</p>
        <p>Low</p>
      </div>
    </div>
  );
};

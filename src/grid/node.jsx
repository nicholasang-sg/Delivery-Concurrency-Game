const Node = ({ row, col, handleClick, logicGridRef, pathFound }) => {
  const isRoad = logicGridRef.current?.isRoad?.(row, col);
  const backgroundColor = pathFound
    ? 'green'
    : isRoad
    ? 'grey'
    : 'white';
  return (
    <div
      style={{
        width: '3.5rem',
        height: '3.5rem',
        backgroundColor: backgroundColor,
        color: 'black',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={()=>{handleClick({row, col})}}
    >
      {row}, {col}
    </div>
  );
};

export default Node;
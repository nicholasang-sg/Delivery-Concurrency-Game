const Node = ({ row, col, handleClick, logicGridRef }) => {
  return (
    <div
      style={{
        width: '3.5rem',
        height: '3.5rem',
        backgroundColor: logicGridRef.current.isRoad(row, col) ? 'grey' : 'white',
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
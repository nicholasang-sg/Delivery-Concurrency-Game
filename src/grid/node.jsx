const Node = ({ row, col }) => {
  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {row}, {col}
    </div>
  );
};

export default Node;
import PropTypes from 'prop-types';

function Board({ squares, gridSize, onClick }) {
  return (
    <div 
      className="board"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '4px',
      }}
    >
      {squares.map((square, i) => (
        <button
          key={i}
          className="square"
          onClick={() => onClick(i)}
        >
          {square || '\u00A0'} {/* Use non-breaking space for empty cells */}
        </button>
      ))}
    </div>
  );
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string),
  gridSize: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Board;
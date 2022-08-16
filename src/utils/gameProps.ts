
const gameProps = {
    sizes: {
        CellWidth: 64,
        boardWidth: 64 * 8,
        boardSize: 8 * 8,
        cellsArray:  Array.from(Array(64).keys()),
        startBoardMatrix: [
            ["bR", "bK", "bB", "bQ", "bKi", "bB", "bK", "bR"],
            ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
            ["e", "e", "e", "e", "e", "e", "e", "e"],
            ["e", "e", "e", "e", "e", "e", "e", "e"],
            ["e", "e", "e", "e", "e", "e", "e", "e"],
            ["e", "e", "e", "e", "e", "e", "e", "e"],
            ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
            ["wR", "wK", "wB", "wQ", "wKi", "wB", "wK", "wR"],
          ],
    },
    colors: {
        whiteCell: '#E1BB80',
        blackCell: '#604014',
        oldBlackCell: "#806443",
        brownFont: '#352208',
    }
}

export default gameProps
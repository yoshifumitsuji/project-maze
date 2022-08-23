class Maze {
  constructor(size) {
    this.ALGO = { STICK: 1 }
    this.size = size % 2 === 0 ? size + 1 : size
    this.box = []
    this.$maze = document.querySelector('#maze')
  }

  //   set ALGO(algorithm) {
  //     this.ALGO = algorithm
  //   }

  static get ALGO() {
    return { STICK: 1 }
  }

  shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o
  }

  show() {
    let snipet = ''
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.box[j][i] === 0) {
          snipet += '<div class="w"></div>'
        } else {
          snipet += '<div class="p"></div>'
        }
      }
    }
    this.$maze.innerHTML = snipet
    this.$maze.style.height = this.size * 10 + 'px'
    this.$maze.style.width = this.size * 10 + 'px'
  }

  create(options) {
    options = options || {}
    if (options.algorithm === Maze.ALGO.STICK) {
      this._createByStick()
    }
    this.show()
  }

  _createByStick() {
    this.box = []
    for (let i = 0; i < this.size; i++) {
      let row = []
      this.box.push(row)
      for (var j = 0; j < this.size; j++) {
        if (i === 0 || i + 1 === this.size) {
          row.push(0)
        } else if (j === 0 || j + 1 === this.size) {
          row.push(0)
        } else if (i % 2 === 1) {
          row.push(1)
        } else {
          row.push(j % 2)
        }
      }
    }

    for (let r = 0; r < this.box.length; r++) {
      if (r === 0 || r + 1 === this.box.length) {
        continue
      }

      if (r % 2 === 1) {
        continue
      }

      let row = this.box[r]

      let direction = ['top', 'bottom', 'left', 'right']

      if (r >= 4) {
        direction = direction.slice(1)
      }

      for (let i = 0; i < row.length; i++) {
        if (i === 0 || i + 1 === row.length) {
          continue
        }
        if (i % 2 === 0) {
          direction = this.shuffle(direction)
          for (let j = 0; j < direction.length; j++) {
            if (direction[j] === 'top') {
              if (this.box[r - 1][i] === 1) {
                this.box[r - 1][i] = 0
                break
              }
            }
            if (direction[j] === 'left') {
              if (this.box[r][i - 1] === 1) {
                this.box[r][i - 1] = 0
                break
              }
            }
            if (direction[j] === 'right') {
              if (this.box[r][i + 1] === 1) {
                this.box[r][i + 1] = 0
                break
              }
            }
            if (direction[j] === 'bottom') {
              if (this.box[r + 1][i] === 1) {
                this.box[r + 1][i] = 0
                break
              }
            }
          }
        }
      }
    }
  }
}

# Chroma Cells

A game where you try to make all the tiles the same color.

## FAQ

### What is this.

This is just a toy app to play with/learn React and Redux and a bit of CSS as
well.

### How do I run it?

`npm start`

Though this really doesn't need a backend, it's all frontend code.

### Now what?

It's a game, kinda. Clicking a cell cycles the color/state of the cell through
the number of cycles the game is configured with. It will also cycle all cells
that are in-line with the clicked cell, in any dimension. The goal is to cycle
all the cells to a single color. I can guarantee that this is possible for
white, but I haven't done the math on other colors.

### How do you know it's possible for white?

The cells start all white and are shuffled by making lots of random plays
(actually, reverse plays, but that really doesn't matter). Since they all start
white, you can always get them all back to white by cycling them enough times to
put them all at the initial cycle value. That is, if there are three colors,
clicking any cell three times is a no-op, independent of any other clicks that
happened between the three clicks on that cell. Once again, since they start all
white, they can be returned to all white.

### How do you make it harder?

Adding dimensions and increasing the size of dimensions with only two colors is
a good way to produce a challenging game.

Reducing the depth to 1 (running a 2D game) with 3 cycles is also fairly
challenging.

I have found a 3D game with 3 cycles to be an exercise in frustration.

### How do you make it easier?

See above - reduce number/size of dimensions (marginal difficulty change), or
reduce number of cycles (significant difficulty change).

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Lots of help was obtained from the [React Express tutorial/guide](http://www.react.express/).

Roughly followed [David Walsh's guide](https://davidwalsh.name/css-flip) for
making cells "flippable" via CSS:


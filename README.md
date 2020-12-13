# Simple Drag and Drop app with pure Js

This is a simple drag and drop application. It has the following features

- **Populate** : It generates predefined number of boxes which are randomly sized, colored and positioned on the screen.
- **Drag** : Boxes can be dragged to any location of the screen
- **Drop** : When a box is dropped into another box, it removes the original two boxes and creates a new box of the cumulative size and mixed color at the location of the target box.
- **Shake**: Boxes on the screen are randomly positioned on the screen
- **Apply Gravity**: Boxes are dropped to the bottom of the screen.

## Structure of the code

A store is maintained to keep the state of the boxes in the UI. This store is an array of 'Node' data structure,which contains information of a box.

```
class Node {
    constructor(id, sideLength, color, x, y, area, children, visible) {
      this.id = id;
      this.sideLength = sideLength;
      this.color = color;
      this.x = x;
      this.y = y;
      this.area = area;
      this.children = children;
      this.visible = visible;
    }
  }
```

Whenever a change in the UI must occur, it first happens in the store, then it is applied to the UI, to maintain the consistency.

## Usage

In order to serve the app without the need of an Web server like NGINX, a simple express server is used.

To install the necessary packages:

```
npm install
```

To run the server

```
npm run start
```

Server will be hosted on port 9500 by default.

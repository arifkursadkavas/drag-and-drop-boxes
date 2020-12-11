"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const numberOfBoxes = 5;
  let boxes = [];

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

  function generateBox(id) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const sideLength = generateRandomInteger(75, 150);
    const color = generateRandomColor();
    const x = generateRandomInteger(0, w - sideLength);
    const y = generateRandomInteger(0, h - sideLength);
    const area = sideLength * sideLength;
    const children = [];
    const visible = true;

    const node = new Node(id, sideLength, color, x, y, area, children, visible);

    return node;
  }

  function generateBoxes() {
    for (var i = 0; i < numberOfBoxes; i++) {
      var box = generateBox(i);
      boxes.push(box);
    }
    console.log(boxes);
    return boxes;
  }

  function applyBoxToHtml(box) {
    let nodeText = document.createElement("div");
    nodeText.innerHTML = box.area + " px²";
    nodeText.style.textAlign = "center";
    nodeText.style.marginTop = "5px";

    let node = document.createElement("div");
    node.appendChild(nodeText);

    node.className = "boxClass";

    node.style.position = "absolute";
    node.style.top = box.y;
    node.style.left = box.x;
    node.style.width = box.sideLength;
    node.style.height = box.sideLength;
    node.style.backgroundColor = "#" + box.color;
    node.style.cursor = "move";
    node.setAttribute("draggable", true);

    document.getElementById("boxContainer").appendChild(node);
  }

  function applyBoxesToHtml() {
    removeAllBoxesFromHTML();
    boxes.forEach(function (box) {
      applyBoxToHtml(box);
    });
  }

  /**
   * This function removes top style attribute and puts bottom : 0px
   * to bring the boxes to the bottom of the window
   *
   * @param {string} n - A string param
   * @return {string} A good string
   *
   * @example
   *
   *     foo('hello')
   */
  function applyGravity() {
    let htmlBoxes = document.getElementsByClassName("boxClass");
    //console.log(htmlBoxes);
    for (let box of htmlBoxes) {
      box.style.removeProperty("top");
      box.style.bottom = 0;
    }
  }

  function applyShake() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let box of boxes) {
      box.x = generateRandomInteger(0, w - box.sideLength);
      box.y = generateRandomInteger(0, h - box.sideLength);
    }

    applyBoxesToHtml();
  }

  //Utility functions
  function removeAllBoxesFromHTML() {
    let currentBoxes = document.getElementsByClassName("boxClass");

    while (currentBoxes.length > 0) {
      currentBoxes[0].remove();
    }
  }

  function isOverLapping(boxes, x, y, sideLength) {}

  //generates a random integer in the min-max range
  function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function generateRandomColor() {
    var numbers = "0123456789ABCDEF";
    var color = "";
    for (var i = 0; i < 6; i++)
      color += numbers[Math.floor(Math.random() * numbers.length)];

    return color;
  }

  const populateButton = document.getElementById("populate");

  populateButton.addEventListener("click", function () {
    //console.log("Button clicked");
    boxes = generateBoxes();
    applyBoxesToHtml(boxes);
  });

  const dropNodesButton = document.getElementById("dropNodes");
  dropNodesButton.addEventListener("click", function () {
    applyGravity();
  });

  const shakeButton = document.getElementById("shake");
  shakeButton.addEventListener("click", function () {
    applyShake();
  });
});

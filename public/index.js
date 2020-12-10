"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const numberOfBoxes = 20;

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
    const sideLength = generateRandomInteger(50, 100);
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
    let boxes = [];
    for (var i = 0; i < numberOfBoxes; i++) {
      var box = generateBox(i);
      boxes.push(box);
    }
    console.log(boxes);
    return boxes;
  }

  function applyBoxToHtml(box) {
    let node = document.createElement("div");
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

  function applyBoxesToHtml(boxes) {
    boxes.forEach(function (box) {
      applyBoxToHtml(box);
    });
  }

  //Utility functions
  function isOverLapping(boxes, x, y, sideLength) {}

  // to generate random position in window
  function getRandomCoordinate(width, height) {
    let x = generateRandomInteger(0, width);
    let y = generateRandomInteger(0, height);
  }

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

  const button = document.getElementById("populate");

  button.addEventListener("click", function () {
    //console.log("Button clicked");
    let boxes = generateBoxes();
    applyBoxesToHtml(boxes);
  });
});

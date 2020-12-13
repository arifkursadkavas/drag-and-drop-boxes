"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const numberOfBoxes = 5;
  let boxes = [];

  let boxContainer = document.getElementById("boxContainer");

  boxContainer.addEventListener("dragstart", handleContainerDragStart, false);
  //boxContainer.addEventListener("dragover", handleDragOver, false);
  //boxContainer.addEventListener("dragenter", handleDragEnter, false);
  //boxContainer.addEventListener("dragleave", handleDragLeave, false);
  boxContainer.addEventListener("dragend", handleContainerDragEnd, false);
  boxContainer.addEventListener("drop", handleContainerDrop, false);

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
    //console.log(boxes);
    return boxes;
  }

  function applyBoxToHtml(box) {
    //Set box text
    let nodeText = document.createElement("div");
    nodeText.innerHTML = box.area + " px²";
    nodeText.style.textAlign = "center";
    nodeText.style.marginTop = "5px";

    let node = document.createElement("div");
    node.appendChild(nodeText);
    node.setAttribute("id", box.id);
    node.className = "boxClass";
    node.style.position = "absolute";
    node.style.top = box.y;
    node.style.left = box.x;
    node.style.width = box.sideLength;
    node.style.height = box.sideLength;
    node.style.backgroundColor = "#" + box.color;
    node.style.cursor = "move";
    node.style.border = "solid 4px white";
    node.style.borderRadius = "9px";

    //double click action
    node.addEventListener("dblclick", handleBoxDoubleClick);

    //dragging properties & listeners
    node.setAttribute("draggable", true);
    node.addEventListener("dragstart", handleDragStart, false);
    node.addEventListener("dragover", handleDragOver, false);
    node.addEventListener("dragenter", handleDragEnter, false);
    node.addEventListener("dragleave", handleDragLeave, false);
    node.addEventListener("dragend", handleDragEnd, false);
    node.addEventListener("drop", handleDrop, false);

    document.getElementById("boxContainer").appendChild(node);
  }

  //DOUBLE CLICK
  function handleBoxDoubleClick(e) {
    console.log(e);
    const boxId = e.target.getAttribute("id");

    const clickedNode = findBoxById(+boxId);

    console.log(clickedNode);
    if (clickedNode.children.length > 0) {
      console.log("Has children", clickedNode.children.length);
      clickedNode.children.forEach(function (node) {
        node.visible = true;
        node.x =
          clickedNode.x - generateRandomInteger(0, clickedNode.sideLength / 4);
        node.y =
          clickedNode.y - generateRandomInteger(0, clickedNode.sideLength / 4);
      });
      clickedNode.visible = false;
    }

    applyBoxesToHtml();
  }

  //DRAG AND DROP UTILITIES
  function handleDragStart(e) {
    //console.log("handleDragStart", e, this);
    this.style.opacity = "0.3";
    this.style.borderStyle = "dashed";

    e.dataTransfer.setData("boxId", this.getAttribute("id"));
  }

  function handleDragEnd(e) {
    //console.log("handleDragEnd", e, this);
    this.style.opacity = "1";
    this.style.borderStyle = "solid";
  }

  function handleDragOver(e) {
    //console.log("handleDragOver", e, this);
    if (e.preventDefault) {
      e.preventDefault();
    }

    return false;
  }

  function handleDragEnter(e) {
    //console.log("handleDragEnter", e, this);
    this.classList.add("over");
  }

  function handleDragLeave(e) {
    //console.log("handleDragLeave", e, this);
    this.classList.remove("over");
  }

  function handleDrop(e) {
    //console.log("handleDrop", e, this);
    e.stopPropagation();
    //console.log("Drop data", e.dataTransfer.getData("boxId"));
    const droppedBoxId = e.dataTransfer.getData("boxId");
    const targetBoxId = this.getAttribute("id");

    if (droppedBoxId === targetBoxId) return;

    mergeBoxes(droppedBoxId, targetBoxId);

    if (this.classList.contains("boxClass")) {
      //console.log("Into the box");
    } else {
      //console.log("Out of the box");
    }
    return false;
  }

  function handleContainerDragStart(e) {
    //console.log("handleContainerDragStart", this, e);
    //e.dataTransfer.setData("boxId", this.getAttribute("id"));
  }
  function handleContainerDragEnd(e) {
    if (e.target.className === "boxClass") {
      const boxId = e.target.getAttribute("id");
      //update store
      const box = findBoxById(+boxId);

      if (box) {
        box.x = e.clientX - box.sideLength / 2 + 4;
        box.y = e.clientY - box.sideLength / 2 + 4;
        applyBoxesToHtml();
      }
    }
    //console.log("Into the Container", e, this);
  }
  function handleContainerDrop(e) {
    //console.log("handleContainerDrop", e, this);
    e.stopPropagation();
    //console.log("Drop data", e.dataTransfer.getData("boxId"));

    return false;
  }

  function applyBoxesToHtml() {
    console.log(boxes);
    removeAllBoxesFromHTML();
    boxes.forEach(function (box) {
      if (box.visible) {
        applyBoxToHtml(box);
      }
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

  function mergeBoxes(droppedBoxId, targetBoxId) {
    const droppedBox = findBoxById(droppedBoxId);
    const targetBox = findBoxById(targetBoxId);

    droppedBox.visible = false;
    targetBox.visible = false;

    const newSideLength = droppedBox.sideLength + targetBox.sideLength;

    const newNode = new Node(
      boxes.length,
      newSideLength,
      getColor(droppedBox.color, targetBox.color),
      targetBox.x,
      targetBox.y,
      newSideLength * newSideLength,
      [droppedBox, targetBox],
      true
    );

    boxes.push(newNode);

    applyBoxesToHtml();
  }

  function getColor(color1, color2) {
    const chunk1 = color1.match(/.{1,2}/g);
    const chunk2 = color2.match(/.{1,2}/g);

    let newColor = "";
    for (var i = 0; i < chunk1.length; i++) {
      const c1 = parseInt(chunk1[i], 16);
      const c2 = parseInt(chunk2[i], 16);

      const nc = Math.floor((c1 + c2) / 2);

      newColor = newColor + nc.toString(16);
    }

    return newColor;
  }

  function findBoxById(id) {
    return boxes.find(function (b) {
      return b.id === +id;
    });
  }

  //Utility functions
  function removeAllBoxesFromHTML() {
    let currentBoxes = document.getElementsByClassName("boxClass");

    while (currentBoxes.length > 0) {
      currentBoxes[0].remove();
    }
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

  const populateButton = document.getElementById("populate");

  //Button handlers registered
  populateButton.addEventListener("click", function () {
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

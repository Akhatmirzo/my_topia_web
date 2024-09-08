function backNav(paths, sliceIndex = 1) {
  const nav = paths.split("/");

  for (let i = 0; i < sliceIndex; i++) {
    nav.pop(); // remove the last element (the food id)
  }

  return nav.join("/");
}

// CheckPrice of cart
function checkTotalPriceFn(price, qty, additionalItems, option) {
  let totalItemPrice;

  if (price) {
    totalItemPrice = Number(price) * Number(qty);
  }

  if (option) {
    totalItemPrice = Number(option?.price) * Number(qty);
  }

  if (additionalItems.length > 0) {
    const additionPrice = additionalItems.reduce((acc, curr) => {
      return acc + Number(curr.price * qty);
    }, 0);

    totalItemPrice += additionPrice;
  }

  return totalItemPrice;
}

function getTimeOrder(time) {
  if (time) {
    let newTimeArr = time.split("T");
    let oclock = newTimeArr[1].split(".")[0];

    return [newTimeArr[0], oclock];
  }else {
    return null
  }
}

export { backNav, checkTotalPriceFn, getTimeOrder };

function backNav(paths, sliceIndex = 1) {
  const nav = paths.split("/");

  for (let i = 0; i < sliceIndex; i++) {
    nav.pop(); // remove the last element (the food id)
  }

  return nav.join("/");
}

export { backNav };
